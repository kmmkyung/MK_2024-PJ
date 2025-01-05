import axiosInstance from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import '../css/SearchPage.css';

function SearchPage(){
  // state
  let [ searchResults, setSearchResults ] = useState([]);
  const navigate = useNavigate();
  
  // use effect
  let query = new URLSearchParams(useLocation().search); // ?movieTitle=검색어
  const searchTerm = query.get('movieTitle'); // 검색어
  const deBouncedSearchTerm = useDebounce(searchTerm, 800);
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

  if(searchResults.length > 0){
    return (
      <section className='search__container'>
        <div className='movie__container'>
        {searchResults.map(function(ele){
          if(ele.backdrop_path && ele.media_type !== 'person'){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500/" + ele.backdrop_path;
            return(
                <div className='movie' key={ele.id}>
                  <div className='movie__column-poster' onClick={()=>{navigate(`/${ele.id}`,{state:{data:ele}})} }>
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