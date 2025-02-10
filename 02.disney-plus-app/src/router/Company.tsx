import { useLocation, useNavigate, useParams } from "react-router-dom";
import companiesData from "../data/companiesData";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getCompanyData } from "../api/api";
import Loader from "../components/Loader";
import { companyData, IMovie, ISearchKeyWord } from "../type";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useScrollBgOpacity } from "../hooks/useScrollBgColor";

const CompanySection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 80px 3.5vw;
  box-sizing: border-box;
  background-color: ${props => props.theme.color.bgColor};
`;

const CompanyContainer = styled.div`
  margin-top: min(10vw,70px);
`;

const CompanyInfo = styled.div`
  position: relative;
`;

const CompanyInfoBgWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  

  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(26, 29, 41, 0) 0%, rgba(26, 29, 41, 0) 50%, rgba(26, 29, 41, 1) 75%, rgba(26, 29, 41, 1) 100%);
  }
`;

const CompanyInfoVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CompanyInfoBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  visibility: hidden;
  transition: all 2s;

  &.end{
    opacity: 1;
    visibility: visible;
  }
`;

const CompanyInfoLogoWrap = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: calc( 30vw - 7px);
  padding: 0 100px;
  opacity: 0;
  visibility: hidden;
  transition: all 2s 0.5s;

  &.end{
    opacity: 1;
    visibility: visible;
  }
`;

const CompanyInfoLogo = styled.img`
  width: 100%;
  max-width: 500px;
`;

const CompanyContent = styled.div`
  padding: min(10vw,70px) 0;
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: min(2.5vw, 25px);
`;
const ContentItem = styled.div`
  display: grid;
`;

const ContentPosterWrap = styled.div`
  aspect-ratio: 1 / 0.57;
  width: 100%;
  box-sizing: border-box;
  border: 3px solid rgba(249, 249, 249, 0);
  border-radius: 10px;
  transition: all 0.6s;
  cursor: pointer;
  overflow: hidden;

  &:hover{
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const ContentPoster = styled.img`
  width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const ContentTitleWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 8px;
`;
const ContentTitle = styled.h6`
  color:#fff; 
  font-size: ${props => props.theme.fontSize.m};
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MoreButton = styled.button`
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  color: #fff;
  margin: 0 auto;
  display: block;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: #fff;
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 5px 8px 0px rgba(0,0,0,0.14),
              0px 1px 14px 0px rgba(0,0,0,0.12);
  transition: all 0.4s;

  &:hover{
    background-color: rgba(255, 255, 255, 0.6);
    color: #000;
  }
`;

function Company (){
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const companyId = useParams().companyId;
  const companyData = companiesData.find((item) => item.companyName === companyId);
  const [ videoEnd, setVideoEnd ] = useState(false)
  const companyBgRef = useScrollBgOpacity();

  const { mediaType, standard, tmdbCompanyId } = companyData as companyData;
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<ISearchKeyWord, Error, IMovie[]>({
    queryKey: ['companyId', companyId],
    queryFn: ({ pageParam = 1 }) => 
      getCompanyData(mediaType, standard, tmdbCompanyId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ISearchKeyWord) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    select: (data) => { return data.pages.flatMap((page) =>
      page.results.filter((ele) => ele.backdrop_path && ele.backdrop_path !== null)
      );
    },
  });

  useEffect(() => { // 페이지가 변경될 때마다 쿼리 리셋
      queryClient.resetQueries({ queryKey: ['companyId', companyId]});
  }, [location.pathname, queryClient, companyId])

  function detailPageNavigate(ele: IMovie) {
    navigate(`/detail/${ele.id}`, { state: { data: {...ele, media_type: companyData?.mediaType}}}) 
  }

  return (
    <CompanySection>{
      isLoading? <Loader/> : (
        <CompanyContainer>
          <CompanyInfo>
            <CompanyInfoBgWrap ref={companyBgRef}>
              <CompanyInfoVideo ref={videoElementRef} autoPlay muted preload="auto" onEnded={()=>setVideoEnd(true)} >
                <source src={companyData?.video} type='video/mp4'/>
              </CompanyInfoVideo>
              <CompanyInfoBg style={{'backgroundImage':`url(${companyData?.backgroundImg}`}} className={videoEnd? 'end' : ''}/>
            </CompanyInfoBgWrap>
            <CompanyInfoLogoWrap className={videoEnd? 'end' : ''}>
              <CompanyInfoLogo src={companyData?.logo} alt='company logo'/>
            </CompanyInfoLogoWrap>
          </CompanyInfo>
          <CompanyContent>
            {data?.map((ele)=>{
              return <ContentItem key={ele.id}>
                <ContentPosterWrap>
                  <ContentPoster src={makeImagePath(ele.backdrop_path)} alt={ele.title} onClick={()=>{ detailPageNavigate(ele)}}/>
                </ContentPosterWrap>
                <ContentTitleWrap>
                  <ContentTitle>{ele.title || ele.name}</ContentTitle>
                </ContentTitleWrap>
              </ContentItem>
            })}
          </CompanyContent>
          {hasNextPage && !isFetchingNextPage && ( <MoreButton onClick={() => fetchNextPage()}>More</MoreButton>)}
        </CompanyContainer>
      )
    }</CompanySection>
  )
}

export default Company;