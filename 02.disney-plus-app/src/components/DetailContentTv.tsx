import styled from "styled-components";
import { IDetailTvData } from "../type";

const TvMain = styled.div`
  font-size: ${props => props.theme.fontSize.s};
  color: #fff;
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: min(1vw, 10px);
`;
const TvRelease = styled.p``;
const TvSeasons = styled.p``;
const TvGenres = styled.p``;


interface DetailContentTvProps {
  searchProgramData: IDetailTvData;
}

function DetailContentTv ({searchProgramData}:DetailContentTvProps){
  return (
    <TvMain>
      <TvRelease>{(searchProgramData.first_air_date).slice(0,4)}</TvRelease>
      <span>•</span>
      <TvSeasons>총 시즌 {searchProgramData.number_of_seasons}</TvSeasons>
      {searchProgramData.genres.length > 0 ? <span>•</span> : null}
      <TvGenres>{searchProgramData.genres.map(function(ele){return ele.name}).join(', ')}</TvGenres>
    </TvMain>
  )
}

export default DetailContentTv;