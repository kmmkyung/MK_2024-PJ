import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getLinkSearchData, getSearchProgram, getProgramCredits, getProgramSimilar, getProgramCollection } from "../api/api";
import { ICollection, ICredits, IDetailMovieData, IDetailTvData, IMovie, ISimilar } from "../type";
import Loader from "../components/Loader";
import DetailContentTv from "../components/DetailContentTv";
import DetailContentMovie from "../components/DetailContentMovie";
import { makeImagePath } from "../utils";
import { useRef } from "react";
import { useScrollBgOpacity } from "../hooks/useScrollBgColor";

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
  const programId = useParams().programId as string; // Route Path :
  const location = useLocation();  
  const locationData: IDetailMovieData | IDetailTvData = location.state?.data;

  const searchProgram = useQuery<IDetailMovieData | IDetailTvData>({
    queryKey: ["program", programId],
    queryFn: () => (!locationData ? getLinkSearchData(programId) : getSearchProgram(locationData, programId)),
  });
  const linkSearchProgram = searchProgram.data as unknown as IDetailMovieData | IDetailTvData;

  const credits = useQuery<ICredits>({
    queryKey: ["credits", programId],
    queryFn: () => getProgramCredits(locationData, programId, linkSearchProgram),
    enabled: !!programId && !!linkSearchProgram
  })
  const similar = useQuery<ISimilar, Error, IMovie[]>({
    queryKey: ["similar", programId],
    queryFn: () => getProgramSimilar(locationData, programId, linkSearchProgram),
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null),
    enabled: !!programId &&  !!linkSearchProgram
  })
  const collection = useQuery<ICollection, Error, IMovie[]>({
    queryKey: ["collection", programId],
    queryFn: () => getProgramCollection(linkSearchProgram as IDetailMovieData),
    select: (data) => data.parts.filter(ele=> ele.backdrop_path !== null),
    enabled: !!programId &&  !!linkSearchProgram
  })
  return {searchProgram, credits, similar, collection};
} 
function Detail(){
  const location = useLocation();  
  const locationData: IDetailMovieData | IDetailTvData = location.state?.data;
  const detailBg = useRef<HTMLDivElement>(null)

  const { searchProgram, credits, similar, collection } = useQueries();
  const searchProgramData = searchProgram.data;
  const searchProgramLoading = searchProgram.isLoading;
  const creditsData = credits.data;
  const creditsLoading = credits.isLoading;
  const similarData = similar.data;
  const similarLoading = similar.isLoading;
  const collectionData = collection.data;
  const collectionLoading = collection.isLoading;
    
console.log(creditsData);


  // function
    useScrollBgOpacity(detailBg.current);

  return (
    <DetailContainer>
      {searchProgramLoading && creditsLoading && similarLoading && collectionLoading ? <Loader/> :
        <>
        {searchProgramData? 
        <>
          <DetailBg ref={detailBg} $bgPhoto={makeImagePath(searchProgramData.backdrop_path)}/>
          <DetailWrap>
            <DetailContent>
              <DetailTitle> {"title" in searchProgramData ? searchProgramData.title : searchProgramData.name }</DetailTitle>
              { searchProgramData?.media_type === 'movie'|| locationData?.media_type === 'movie'?
              <DetailContentMovie searchProgramData={searchProgramData as IDetailMovieData}/> :
              <DetailContentTv searchProgramData={searchProgramData as IDetailTvData}/> }
            </DetailContent>
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