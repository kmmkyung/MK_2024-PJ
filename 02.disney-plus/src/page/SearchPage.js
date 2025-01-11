import axiosInstance from '../api/axios';
import React, { useEffect, useCallback } from 'react'
import { useLocation, useNavigate, useOutletContext } from'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import style from '../css/SearchPage.module.css';

function SearchPage(){
  // state
  const navigate = useNavigate();
  const { searchResults, setSearchResults, setIsSearchActive } = useOutletContext();

  // function
  const fetchSearchMovie = useCallback(async (searchTerm) => {
    try {
      const response = await axiosInstance.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      const filterResponse = response.data.results.filter((ele)=>ele.backdrop_path && ele.backdrop_path !== null)
      setSearchResults(filterResponse);
    }
    catch (error) {
      console.error(error);
    }
  }, [setSearchResults]);

  function handleMovieClick(ele) {
    navigate(`/detail/${ele.id}`, { state: { data: ele } });
    setIsSearchActive(false);
  }

  // use effect
  let query = new URLSearchParams(useLocation().search); // ?movieTitle=검색어
  const searchTerm = query.get('movieTitle'); // 검색어
  const deBouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(()=>{
    if(deBouncedSearchTerm){
      fetchSearchMovie(deBouncedSearchTerm)
    }
  },[deBouncedSearchTerm, fetchSearchMovie])

  if(searchResults.length > 0){
    return (
      <section className={style.search__container}>
        <div className={style.search__wrap}>
        {searchResults.map(function(ele){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500/" + ele.backdrop_path;
            return(
                <div className={style.movie__wrap} key={ele.id}>
                  <div className={style.poster__wrap}>
                    <img src={movieImageUrl} alt='movie' className={style.poster__img} onClick={()=>{handleMovieClick(ele)}}/>
                  </div>
                  <div className={style.title__wrap}>
                    <p className={style.movie__title}>{ ele.title || ele.name }</p>
                  </div>
                </div>
            )})}
        </div>
      </section>
    )
  }
  else {
    return (
      <section className={style['no-results']}>
        <div className={style['no-results__text']}>
          <p>"{searchTerm}" 에 대한 검색 결과 없음</p>
        </div>
      </section>
    )
  }
}

export default SearchPage;