import { useRecoilState, useRecoilValue } from "recoil";
import { isSearchIngState, searchKeywordState, searchKeyWordResultsState } from "../atoms";
import { useQuery } from "@tanstack/react-query";
import { getSearchKeyWordProgram } from "../api/api";
import { IMovie, ISearchKeyWord } from "../type";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 80px 3.5vw;
  margin-top: 20px;
  box-sizing: border-box;
  background: url("/images/home-background.png") center center / cover no-repeat fixed;
`;

const SearchWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: min(2.5vw, 25px);

  @media screen and (max-width: 768px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SearchItem = styled.div`
  display: grid;
`;

const ItemPosterWrap = styled.div`
  width: 100%;
  aspect-ratio: 1 / 0.57;
  box-sizing: border-box;
  border: 3px solid rgba(249, 249, 249, 0);
  border-radius: 10px;
  transition: all 0.6s;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const ItemPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const ItemTitleWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 8px;
`;

const ItemTitle = styled.h6`
  color: #fff;
  font-size: ${props => props.theme.fontSize.m};
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SearchNoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  p {
    color: #c5c5c5;
    font-size: ${props => props.theme.fontSize.m};
  }
`;


function Search(){
  const navigate = useNavigate();
  const [ isSearching, setIsSearching ] = useRecoilState(isSearchIngState);
  const searchKeyword = useRecoilValue(searchKeywordState);
  const [ searchKeyWordResults, setSearchKeyWordResults ] = useRecoilState(searchKeyWordResultsState);
  const [ data, setData ] = useState<IMovie[] | null>([]);


  const { data:searchResultsData, isLoading } = useQuery<ISearchKeyWord, Error, IMovie[]| null>({
    queryKey: [ 'searchKeyWordProgram', searchKeyWordResults],
    queryFn: () => 
    getSearchKeyWordProgram(searchKeyWordResults as string),
    select: (data) => data.results.filter(ele=> ele.backdrop_path !== null && ele.backdrop_path),
    enabled: !!searchKeyWordResults,
  })

  useEffect(()=>{
    const keyWordTimeOut = setTimeout(function(){
      setSearchKeyWordResults(searchKeyword)
    }, 1500)
    return ()=>{
      clearTimeout(keyWordTimeOut);
    }
  },[searchKeyword, setSearchKeyWordResults])

  useEffect(() => {
    if (isSearching && searchResultsData ) {
      setData(searchResultsData);
    }
    else if(!isSearching) {
      setData(null);
      setSearchKeyWordResults(null)
    }
  }, [isSearching, searchResultsData, setSearchKeyWordResults]);

  function movieDetailMove(program:IMovie) {
    navigate(`/detail/${program.id}`, { state: { data: program } });
    setIsSearching(false);
  }

  return (
    <SearchSection>
      {isLoading? <Loader/> :
      <>
        {data && data?.length > 0 ? 
          <SearchWrap>
            {data?.map(ele=>{
              return <SearchItem key={ele.id}>
                <ItemPosterWrap>
                  <ItemPoster src={makeImagePath(ele.backdrop_path)} alt={ele.title} onClick={()=>movieDetailMove(ele)}/>
                </ItemPosterWrap>
                <ItemTitleWrap>
                  <ItemTitle>{ele.title || ele.name}</ItemTitle>
                </ItemTitleWrap>
            </SearchItem>})}
          </SearchWrap>
          :
          <SearchNoResults>
            { searchKeyWordResults ?
            <p>"{searchKeyWordResults}" 에 대한 검색 결과 없음</p> : null
            }
          </SearchNoResults>
        }
      </>
      }
    </SearchSection>
  )
}

export default Search;