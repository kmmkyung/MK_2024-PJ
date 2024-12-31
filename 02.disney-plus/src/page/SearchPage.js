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

  return (
    <div>search</div>
  )
}

export default SearchPage;