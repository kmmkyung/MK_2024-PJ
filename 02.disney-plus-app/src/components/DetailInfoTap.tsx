import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ICredits, IDetailMovieData, IDetailTvData, IMovie } from '../type';
import { makeImagePath } from '../utils';
import { JSX, useEffect, useMemo } from 'react';

const CollectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: min(2.5vw, 25px);

  @media screen and (max-width: 768px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CollectionContent = styled.div`
  display: grid;
`;

const CollectionImgWrap = styled.div`
  width: 100%;
  aspect-ratio: 1 / 0.57;
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

const CollectionImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const CollectionTitleWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 10px; 
`;

const CollectionTitle = styled.h6`
  font-size: ${props => props.theme.fontSize.m};
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SimilarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: min(2.5vw, 25px);

  @media screen and (max-width: 768px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SimilarContent = styled.div`
  display: grid;
`;

const SimilarImgWrap = styled.div`
  width: 100%;
  aspect-ratio: 1 / 0.57;
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

const SimilarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const SimilarTitleWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
`;

const SimilarTitle = styled.h6`
  font-size: ${props => props.theme.fontSize.m};
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoContainer = styled.div``;

const InfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  color: #fff;

  @media screen and (max-width: 768px){
    flex-direction: column;
  }
`;

const InfoLeft = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.l};
`;

const InfoDescription = styled.p`
  font-size: ${props => props.theme.fontSize.m};
  margin-top: 20px;
  line-height: 1.5;
  word-break: keep-all;
`;

const InfoRight = styled.div`
  flex: 1;
  font-size: ${props => props.theme.fontSize.s};
  display: flex;
  gap: 20px;
  width: 100%;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoRelease = styled.p`
  span {
    display: block;
  }
`;

const InfoRuntime = styled.p`
  margin-top: 20px;
  span {
    display: block;
  }
`;

const InfoGenres = styled.p`
  margin-top: 20px;
  span {
    display: block;
  }
`;

const InfoCredits = styled.div`
  flex: 1;
`;

const InfoDirector = styled.p`
  span {
    display: block;
  }
`;

const InfoCast = styled.p`
  margin-top: 20px;
  span {
    display: block;
    line-height: 1.4;
  }
`;


interface detailInfoTapDataProps{
  searchProgramData: IDetailMovieData | IDetailTvData,
  locationData: IDetailMovieData | IDetailTvData,
  creditsData: ICredits,
  similarData: IMovie[] | null,
  collectionData: IMovie[] | null,
}

function DetailInfoTap({searchProgramData, locationData, creditsData, similarData, collectionData }:detailInfoTapDataProps){
  const navigate = useNavigate();

  const programMovieData = searchProgramData as IDetailMovieData;
  const programTvData = searchProgramData as IDetailTvData;


  function collectionDetailPageMove(movie:IMovie){
    navigate(`/detail/${movie.id}`, { state: {data: movie} })
  }

  function similarDetailPageMove(movie:IMovie){
    navigate(`/detail/${movie.id}`,{ state: {data: { ...movie, media_type: searchProgramData?.media_type || locationData?.media_type}}});
  }

  const taps = [
    collectionData && {
      name: 'collection',
      content: (
        <CollectionContainer>
          {collectionData.map((ele,idx) => {
            return <CollectionContent key={idx}>
              <CollectionImgWrap>
                <CollectionImg src={makeImagePath(ele.backdrop_path)} alt={ele.name} onClick={()=>collectionDetailPageMove(ele)}/>
              </CollectionImgWrap>
              <CollectionTitleWrap>
                <CollectionTitle>{ele.title}</CollectionTitle>
              </CollectionTitleWrap>
            </CollectionContent>
            })}
        </CollectionContainer>
      )
    },
    similarData && {
      name:'similar',
      content: (
        <SimilarContainer>
          {similarData.map((ele,idx)=>{
            return <SimilarContent key={idx}>
              <SimilarImgWrap>
                <SimilarImg src={makeImagePath(ele.backdrop_path)} alt={ele.name} onClick={()=>similarDetailPageMove(ele)}/>
              </SimilarImgWrap>
              <SimilarTitleWrap>
                <SimilarTitle>{ele.title || ele.name}</SimilarTitle>
              </SimilarTitleWrap>
            </SimilarContent>
          })}
        </SimilarContainer>
      )
    },
    searchProgramData && {
      name: 'info',
      content: (
        <InfoContainer>
          {searchProgramData.media_type === 'movie' || locationData.media_type === 'movie' ? 
          <InfoWrap>
            <InfoLeft>
              <InfoTitle>{programMovieData.title}</InfoTitle>
              <InfoDescription>{programMovieData.overview}</InfoDescription>
            </InfoLeft>
            <InfoRight>
              <InfoContent>
                <InfoRelease>
                  <span>공개일: </span>
                  <span>{programMovieData.release_date.slice(0,4)}</span>
                </InfoRelease>
                <InfoRuntime>
                  <span>러닝타임: </span>
                  <span>{Math.floor(programMovieData.runtime/60)}시간 {Math.floor(programMovieData.runtime%60).toString().padStart(2,'0')}분</span>
                </InfoRuntime>
                { searchProgramData.genres.length > 0 ?
                <InfoGenres>
                  <span>장르: </span>
                  <span>{searchProgramData.genres.map(function(ele){return ele.name}).join(', ')}</span>
                </InfoGenres>
                : null}
              </InfoContent>
              <InfoCredits>
                { creditsData?.crew?.filter(ele=>ele.job==="Director").length > 0 ? 
                <InfoDirector>
                  <span>감독: </span>
                  {creditsData?.crew.filter(ele=>ele.job==="Director").map(function(ele){return<span key={ele.id}>{ele.name}</span>})}
                </InfoDirector>
                : null}
                {creditsData?.cast ? 
                <InfoCast>
                  <span>배우: </span>
                  { creditsData?.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </InfoCast>
              : null }
              </InfoCredits>
            </InfoRight>
          </InfoWrap>
          :
          <InfoWrap>
            <InfoLeft>
              <InfoTitle>{programTvData.name}</InfoTitle>
              <InfoDescription>{programTvData.overview}</InfoDescription>
            </InfoLeft>
            <InfoRight>
              <InfoContent>
                <InfoRelease>
                  <span>공개일: </span>
                  <span>{programTvData.first_air_date?.slice(0,4)}</span>
                </InfoRelease>
                <InfoRuntime>
                  <span>총 시즌: </span>
                  <span>{programTvData.number_of_seasons}의 시즌</span>
                </InfoRuntime>
                { programTvData.genres.length > 0 ?
                <InfoGenres>
                  <span>장르: </span>
                  <span>{programTvData.genres.map(function(ele){return ele.name}).join(', ')}</span>
                </InfoGenres>
                : null}
              </InfoContent>
              <InfoCredits>
                { creditsData?.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                <InfoDirector>
                  <span>감독: </span>
                  {creditsData.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </InfoDirector>
                : null}
                {creditsData?.cast ? 
                <InfoCast>
                  <span>배우: </span>
                  { creditsData?.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </InfoCast>
              : null }
              </InfoCredits>
            </InfoRight>
          </InfoWrap>
          }
        </InfoContainer>
      )
    }
  ]

  return taps.filter(Boolean) as { name: string; content: JSX.Element }[]
}

export default DetailInfoTap;