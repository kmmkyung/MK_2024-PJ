import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getLinkSearchData, getSearchProgram, getProgramCredits, getProgramSimilar, getProgramCollection } from "../api/api";
import { ICollection, ICredits, IDetailMovieData, IDetailTvData, IMovie, ISimilar } from "../type";
import Loader from "../components/Loader";
import DetailContentTv from "../components/DetailContentTv";
import DetailContentMovie from "../components/DetailContentMovie";
import { makeImagePath } from "../utils";
import { JSX, useEffect, useState } from "react";
import { useScrollBgOpacity } from "../hooks/useScrollBgColor";
import DetailInfoTap from "../components/DetailInfoTap";

const DetailContainer = styled.section`
  min-height: 100vh;
  background-color: ${props => props.theme.color.bgColor};
`;

const DetailBg = styled.div<{$bgPhoto:string}>`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: radial-gradient(farthest-side at 65% 25%, transparent, #1A1D29), url(${props => props.$bgPhoto});
`;

const DetailWrap = styled.div `
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  padding: 80px 3.5vw;
`;

const DetailContent = styled.div `
  margin-top: 120px;
`;

const DetailTitle = styled.h1 `
  font-size: ${props => props.theme.fontSize.xl};
  color: #fff;
`;

const DetailTap = styled.div`
margin-top: 190px;
`;

const TapList = styled.ul`
  display: flex;
  gap: 6vw;
  font-size: ${props => props.theme.fontSize.m};
  align-items: center;
  justify-content: start;
  padding-bottom: 5px;
  border-bottom: 2px solid #F9F9F933;
`;

const TapItem = styled.li`
  color: #CACACA;
  letter-spacing: 2px;
  cursor: pointer;

  &.on{
    color: #fff;
    position: relative;

    &::after{
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      border-bottom: 2px solid #fff;
    }
  }
`;

const TapContent = styled.div`
  margin-top: 60px;
`;

const NoProgram  = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.bgColor};

  p{
    font-size: ${props => props.theme.fontSize.m};
    color: #fff;
  }
`;


function useQueries(){
  const programId = useParams().programId as string; // Route Path : /detail/:programId
  const location = useLocation();  
  const locationData: IDetailMovieData | IDetailTvData = location.state?.data;

  const searchProgram = useQuery<IDetailMovieData | IDetailTvData>({
    queryKey: ["program", programId],
    queryFn: () => (!locationData ? getLinkSearchData(programId) : getSearchProgram(locationData, programId)),
    enabled: !!programId,
  });

  const credits = useQuery<ICredits | null>({
    queryKey: ["credits", programId],
    queryFn: () => getProgramCredits(locationData, programId, searchProgram.data as IDetailMovieData | IDetailTvData),
    enabled: !!programId,
  });

  const similar = useQuery<ISimilar, Error, IMovie[] | null>({
    queryKey: ["similar", programId],
    queryFn: () => getProgramSimilar(locationData, programId, searchProgram.data as IDetailMovieData | IDetailTvData),
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null &&  ele.backdrop_path),
    enabled: !!programId,
  });

  const collection = useQuery<ICollection, Error, IMovie[] | null>({
    queryKey: ["collection", programId],
    queryFn: () => getProgramCollection(searchProgram.data as IDetailMovieData),
    select: (data) => {
      if(data){ return data.parts?.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path)}
      else return null;
    },
    enabled: !!searchProgram.data,
  });

  return {searchProgram, credits, similar, collection};
} 

function Detail(){
  const location = useLocation();  
  const locationData: IDetailMovieData | IDetailTvData = location.state?.data;
  const detailBgRef = useScrollBgOpacity();
  const [ activeTab, setActiveTab ] = useState(0);
  const [tapsLoading, setTapsLoading] = useState(true);
  
  const { searchProgram, credits, similar, collection}  = useQueries()
  const searchProgramLoading = searchProgram.isLoading;
  const creditsLoading = credits.isLoading;
  const similarLoading = similar.isLoading;
  const collectionLoading = collection.isLoading;
  const taps:{name:string, content:JSX.Element}[] = DetailInfoTap({
    searchProgramData: searchProgram.data!,
    locationData,
    creditsData: credits.data!,
    similarData: similar.data || null,
    collectionData: collection.data || null,
  });  

  useEffect(() => {
    taps? setTapsLoading(false) : setTapsLoading(true);
    setActiveTab(0);
  }, [searchProgram.data]);


  return (
    <DetailContainer>
      {tapsLoading || searchProgramLoading || creditsLoading || similarLoading || collectionLoading ? <Loader/> :
        <>
        {searchProgram.data || locationData ? 
        <>
          <DetailBg ref={detailBgRef} $bgPhoto={makeImagePath(searchProgram.data?.backdrop_path ?? '')}/>
          <DetailWrap>
            <DetailContent>
              <DetailTitle>
                {searchProgram.data?.media_type === 'movie' || locationData?.media_type === 'movie'?
                (searchProgram.data as IDetailMovieData)?.title :
                (searchProgram.data as IDetailTvData)?.name }
              </DetailTitle>
              { searchProgram.data?.media_type === 'movie'|| locationData?.media_type === 'movie'?
              <DetailContentMovie searchProgramData={searchProgram.data as IDetailMovieData}/> :
              <DetailContentTv searchProgramData={searchProgram.data as IDetailTvData}/> }
            </DetailContent>
            <DetailTap>
              <TapList>
                {taps.map((ele, idx)=>{
                  if (ele) {
                    return <TapItem key={idx} className={activeTab === idx ? 'on' : ''} onClick={()=>setActiveTab(idx)}>{ele.name}</TapItem>;
                  }
                  return null;
                })}
              </TapList>
              <TapContent>
                {taps && taps[activeTab].content}
              </TapContent>
            </DetailTap>
          </DetailWrap>
        </>
        :<NoProgram><p>존재하지 않는 프로그램입니다.</p></NoProgram>
        }
        </>
      } 
    </DetailContainer>
  )
}

export default Detail;