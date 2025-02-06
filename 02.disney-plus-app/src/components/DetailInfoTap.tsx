import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ICredits, IDetailMovieData, IDetailTvData, IMovie } from '../type';
import { makeImagePath } from '../utils';

const CollectionContainer = styled.div`
`;

const CollectionContent = styled.div`
`;

const CollectionImgWrap = styled.div`
`;

const CollectionImg = styled.img`
`;

const CollectionTitleWrap = styled.div`
`;

const CollectionTitle = styled.h6`
`;

const SimilarContainer = styled.div`
`;

const SimilarContent = styled.div`
`;

const SimilarImgWrap = styled.div`
`;

const SimilarImg = styled.img`
`;

const SimilarTitleWrap = styled.div`
`;

const SimilarTitle = styled.h6`
`;

const InfoContainer = styled.div`
`;

const InfoWrap = styled.div`
`;

const InfoLeft = styled.div`
`;

const InfoTitle = styled.h2`
`;

const InfoDescription = styled.p`
`;

const InfoRight = styled.div`
`;

const InfoContent = styled.div`
`;

const InfoRelease = styled.p`
`;

const InfoRuntime = styled.p`
`;

const InfoGenres = styled.p`
`;

const InfoCredits = styled.div`
`;

const InfoDirector = styled.p`
`;

const InfoCast = styled.p`
`;


interface detailInfoTapDataProps{
  searchProgramData: IDetailMovieData | IDetailTvData,
  locationData: IDetailMovieData | IDetailTvData,
  creditsData: ICredits,
  similarData: IMovie[],
  collectionData: IMovie[],
}

function DetailInfoTap({searchProgramData, locationData, creditsData, similarData, collectionData}:detailInfoTapDataProps){
  const navigate = useNavigate();

  function collectionDetailPageMove(movie:IMovie){
    navigate(`/detail/${movie.id}`, { state: {data: movie} })
  }

  function similarDetailPageMove(movie:IMovie){
    navigate(`/detail/${movie.id}`,{ state: {data: { ...movie, media_type: searchProgramData.media_type || locationData.media_type}}})
  }

  function typeMovieOrTv() {
    if (searchProgramData.media_type === 'movie' || locationData.media_type === 'movie') {
      return searchProgramData as IDetailMovieData;
    } else {
      return searchProgramData as IDetailTvData;
    }
  }
  const programData = typeMovieOrTv();

  return [
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
          { programData.media_type === 'movie' ?
          <InfoWrap>
            <InfoLeft>
              <InfoTitle>{programData.title}</InfoTitle>
              <InfoDescription></InfoDescription>
            </InfoLeft>
            <InfoRight>
              <InfoContent>
                <InfoRelease>
                  <span>공개일: </span>
                </InfoRelease>
                <InfoRuntime>
                  <span>러닝타임: </span>
                </InfoRuntime>
                { searchProgramData.genres.length > 0 ?
                <InfoGenres><span>장르: </span>
                </InfoGenres>
                : null}
                <InfoCredits>
                  { creditsData.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                  <InfoDirector>
                    <span>감독: </span>
                    {creditsData.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                  </InfoDirector>
                  : null}
                  <InfoCast>
                    { creditsData ? <>
                    <span>배우: </span>
                    { creditsData.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                    </>
                    : null}
                  </InfoCast>
                </InfoCredits>
              </InfoContent>
            </InfoRight>
          </InfoWrap>
          :
          <InfoWrap>
            <InfoLeft>
              <InfoTitle></InfoTitle>
              <InfoDescription></InfoDescription>
            </InfoLeft>
            <InfoRight>
              <InfoContent>
                <InfoRelease>
                  <span>공개일: </span>
                </InfoRelease>
                <InfoRuntime>
                  <span>총 시즌: </span>
                </InfoRuntime>
                { searchProgramData.genres.length > 0 ?
                <InfoGenres><span>장르: </span>
                </InfoGenres>
                : null}
                <InfoCredits>
                  { creditsData.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                  <InfoDirector>
                    <span>감독: </span>
                    {creditsData.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                  </InfoDirector>
                  : null}
                  <InfoCast>
                    { creditsData ? <>
                    <span>배우: </span>
                    { creditsData.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                    </>
                    : null}
                  </InfoCast>
                </InfoCredits>
              </InfoContent>
            </InfoRight>
          </InfoWrap>
          }
        </InfoContainer>
      )
    }
  ].filter(Boolean);
}

export default DetailInfoTap;