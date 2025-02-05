import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getLinkSearchData, getSearchProgram, getProgramCredits, getProgramSimilar, getProgramCollection } from "../api/api";
import { ICredits, IDetailMovie, IDetailMovieData, IDetailTvData } from "../type";

const DetailContainer = styled.section`

`;

function useQueries(){
  const programId = useParams().programId as string; // Route Path :
  const location = useLocation();  
  const locationData = location.state?.data;
  
  const searchProgram = useQuery<IDetailMovie>({
    queryKey: ["program", programId],
    queryFn: () => (!locationData ? getLinkSearchData(programId) : getSearchProgram(locationData, programId)),
  });
  const linkSearchProgram = searchProgram.data?.data as IDetailMovieData | IDetailTvData;  
  
  const credits = useQuery<ICredits>({
    queryKey: ["credits", programId],
    queryFn: () => getProgramCredits(locationData, programId, linkSearchProgram),
    enabled: !!programId && !!linkSearchProgram
  })
  const similar = useQuery<ICredits>({
    queryKey: ["similar", programId],
    queryFn: () => getProgramSimilar(locationData, programId, linkSearchProgram),
    enabled: !!programId &&  !!linkSearchProgram
  })
  const collection = useQuery<ICredits>({
    queryKey: ["collection", programId],
    queryFn: () => getProgramCollection(linkSearchProgram as IDetailMovieData),
    enabled: !!programId &&  !!linkSearchProgram
  })
  return [searchProgram, credits, similar, collection];
} 

function Detail(){
  const navigate = useNavigate();

  const [
    {data: searchProgramData, isLoading: searchProgramLoading},
    {data: creditsData, isLoading: creditsLoading},
    {data: similarData, isLoading: similarLoading},
    {data: collectionData, isLoading: collectionLoading},
  ] = useQueries();

  return (
    <DetailContainer>
      
    </DetailContainer>
  )
}

export default Detail;