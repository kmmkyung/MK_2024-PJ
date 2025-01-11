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
  const [isFetched, setIsFetched] = useState(false);

  // function
  const fetchDate = useCallback(
    async() =>{
      if (isFetched) return;
      setIsFetched(true);

      // 현재 상영중인 여러영화 정보 가져오기
      const response = await axiosInstance.get(requests.fetchNowPlaying)
      const movieID = response.data.results.slice(0, 6).map(item => item.id)
  
      // 영화의 상세 정보 가져오기
      const movieDetailArr = await Promise.all(
        movieID.map(async function(ele){
          const movieDetailResponse = await axiosInstance.get(`movie/${ele}`,{params:{ append_to_response: 'videos' }});
          return movieDetailResponse.data
        })
      )      
      setMovie(movieDetailArr)
    },[isFetched])

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
  return (
    <div className='banner'>
      { movie.length > 0 ? 
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
        }}>
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
        : null}
      </div>
    )
  }


export default Banner;
