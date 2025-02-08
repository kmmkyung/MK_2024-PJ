import { IDetailMovieData } from "../type";
import styled from "styled-components";

const MovieMain = styled.div`
  font-size: ${props => props.theme.fontSize.s};
  color: #fff;
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: min(1vw, 10px);
`;
const MovieRelease = styled.p``;
const MovieRuntime = styled.p``;
const MovieGenres = styled.p``;

interface DetailContentMovieProps {
  searchProgramData: IDetailMovieData;
}

function DetailContentMovie ({searchProgramData}:DetailContentMovieProps){
  return (
    <MovieMain>
      <MovieRelease>{(searchProgramData?.release_date)?.slice(0,4)}</MovieRelease>
      <span className="dot">•</span>
      <MovieRuntime>{Math.floor(searchProgramData?.runtime/60)}시간 {Math.floor(searchProgramData?.runtime%60).toString().padStart(2, '0')}분</MovieRuntime>
      {searchProgramData?.genres.length > 0 ? <span className="dot">•</span> : null}
      <MovieGenres>{searchProgramData?.genres.map(function(ele){return ele.name}).join(', ')}</MovieGenres>
    </MovieMain>
  )
}

export default DetailContentMovie;