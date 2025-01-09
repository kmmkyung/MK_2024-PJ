import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios'; // api axios instance
import requests from '../api/request'; // api request
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/Banner.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Banner() {
  const navigate = useNavigate();

  // state
  let [ movie, setMovie ] = useState([]);

  // function
  const fetchDate = useCallback(
    async() =>{
      // 현재 상영중인 여러영화 정보 가져오기
      const response = await axiosInstance.get(requests.fetchNowPlaying)

      // 가져온 여러 영화 중 랜덤한 영화 5개 ID를 가져오기
      let newArr = [...response.data.results]
      for(let i = 0; i < newArr.length; i++ ){
        const randomNumber = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[randomNumber]] = [newArr[randomNumber],newArr[i]];
      }
      const movieID = newArr.slice(0, 8).map(item => item.id)
  
      // 영화의 상세 정보 가져오기
      
      const movieDetailArr = await Promise.all(
        movieID.map(async function(ele){
          const movieDetailResponse = await axiosInstance.get(`movie/${ele}`,{params:{ append_to_response: 'videos' }});
          return movieDetailResponse.data
        })
      )      
      setMovie(movieDetailArr)
    },[])

    function handleNavigate(ele){
      navigate(`/detail/${ele.id}`,{state: {data:{...ele, media_type:'movie'}}});
    }

  // use effect
  useEffect(()=>{
    fetchDate()
  },[fetchDate])

  // css
  function cssBanner(ele) {
    return {
      backgroundImage: `url('https://image.tmdb.org/t/p/original/${ele.backdrop_path}')`,
    };
  }

  // render 
  if(movie.length > 0){
    return (
        <div className='banner'>
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 50
          }
        }}
        >
        {movie.map(function(ele){ 
          return <SwiperSlide key={ele.id} style={cssBanner(ele)} onClick={()=>handleNavigate(ele)}>
          <div className='banner__contents'>
            <div className='banner__wrap'>
              <h1 className='banner__title'>{ ele.title || ele.name || ele.original_name}</h1>
              <p className='banner__description'>{ele.overview}</p>
            </div>
          </div>
          </SwiperSlide>
        })}
        </Swiper>
        </div>
      )
    }
  }


export default Banner;
