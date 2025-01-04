import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios'; // api axios instance
import requests from '../api/request'; // api request
import '../css/Banner.css';

function Banner() {
  // state
  let [ movie, setMovie ] = useState({});

  // use effect
  useEffect(()=>{
    fetchDate()
  },[])

  // function
  async function fetchDate(){
    // 현재 상영중인 여러영화 정보 가져오기
    const response = await axiosInstance.get(requests.fetchNowPlaying)
    
    // 가져온 여러 영화 중 랜덤한 영화 하나의 ID를 가져오기
    const movieID = response.data.results[Math.floor(Math.random() * response.data.results.length)].id;

    // 특정 영화의 상세 정보 가져오기
    const { data:movieDetail } = await axiosInstance.get(`movie/${movieID}`,{params:{ append_to_response: 'videos' }});
    setMovie(movieDetail)
  }

  // css
  const cssBanner = {
    backgroundImage : `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
    backgroundPosition : 'center',
    backgroundSize : 'cover',
  }

  // render 
    return (
      <div className='banner' style={cssBanner}>
        <div className='banner__contents'>
          <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
          <p className='banner__description'>{movie.overview}</p>
        </div>
      </div>
    )
  }


export default Banner;
