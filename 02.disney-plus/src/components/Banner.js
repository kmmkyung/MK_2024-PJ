import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios'; // api axios instance
import requests from '../api/request'; // api request
import '../css/Banner.css';
import styled from'styled-components';

function Banner() {
  // state
  let [ movie, setMovie ] = useState({});
  let [ isClicked, setIsClicked ] = useState(false);

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
    backgroundPosition : 'top center center',
    backgroundSize : 'cover',
  }

  // render 
  // video play button click event
  if(isClicked){
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&mute=1&loop=1&playlist=${movie.videos.results[0].key}`}
            width='640' height='360' frameBorder='0' allow='autoplay fullscreen'
            ></Iframe>
            <button className='banner__button close' onClick={()=>{setIsClicked(false)}}>X</button>
          </HomeContainer>
        </Container>
      </>
    )
  }
  else{
    return (
      <header className='banner' style={cssBanner}>
        <div className='banner__contents'>
          <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
          <div className='banner__buttons'>
            {movie?.videos?.results[0]?.key && <button className='banner__button play' onClick={()=>{setIsClicked(true)}}>Play</button>}
          </div>
          <p className='banner__description'>{movie.overview}</p>
        </div>
        <div className='banner--fadeBottom'></div>
      </header>
    )
  }
}

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;


  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  opacity: 0.65;
  border: none;

`