import axiosInstance from '../api/axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useOutletContext } from'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import '../css/SearchPage.css';

function SearchPage(){
  // state
  const navigate = useNavigate();
  const { searchResults, setSearchResults, setIsSearchActive } = useOutletContext();

  // use effect
  let query = new URLSearchParams(useLocation().search); // ?movieTitle=검색어
  const searchTerm = query.get('movieTitle'); // 검색어
  const deBouncedSearchTerm = useDebounce(searchTerm, 1000);
  useEffect(()=>{
    if(deBouncedSearchTerm){
      fetchSearchMovie(deBouncedSearchTerm)
    }
  },[deBouncedSearchTerm])

  // function
  async function fetchSearchMovie(searchTerm){
    try {
      const response = await axiosInstance.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      setSearchResults(response.data.results);
    }
    catch (error) {
      console.error(error);
    }
  }

  function handleMovieClick(ele) {
    navigate(`/detail/${ele.id}`, { state: { data: ele } });
    setIsSearchActive(false);
  }

  if(searchResults.filter((ele)=>ele.backdrop_path && ele.backdrop_path !== null).length > 0){
    return (
      <section className='search__container'>
        <div className='movie__container'>
        {searchResults.map(function(ele){
          if(ele.backdrop_path && ele.backdrop_path !== null){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500/" + ele.backdrop_path;
            return(
                <div className='movie' key={ele.id}>
                  <div className='movie__column-poster' onClick={()=>{handleMovieClick(ele)}}>
                    <img src={movieImageUrl} alt='movie' className='movie__poster'/>
                    <p className='movie__title'>{ ele.title || ele.name }</p>
                  </div>
                </div>
            )
          }
          return null;
        })}
        </div>
      </section>
    )
  }
  else {
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>"{searchTerm}" 에 대한 검색 결과 없음</p>
        </div>
      </section>
    )
  }
}

export default SearchPage;