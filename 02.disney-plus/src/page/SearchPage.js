import axiosInstance from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from'react-router-dom';

function SearchPage(){
  // state
  let [ searchResults, setSearchResults ] = useState([]);

  // use effect
  function useQuery(){
    return new URLSearchParams(useLocation().search); // ?q=검색어
  }
  let query = useQuery();
  const searchTerm = query.get('movieTitle'); // 검색어
  useEffect(()=>{
    if(searchTerm){
      fetchSearchMovie(searchTerm)
    }
  },[searchTerm])

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
        {searchResults.map(function(ele,idx){
          if(ele.backdrop_path && ele.media_type !== 'person'){
            console.log(ele);
          }

        })}
      </section>
    )
  }
  else {
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>검색어 "{searchTerm}" 에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }
}

export default SearchPage;

// 기분이 안좋다. 왜 나였는지 왜 알고있어야하는게 나였는지
