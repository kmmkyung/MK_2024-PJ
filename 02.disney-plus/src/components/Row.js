import React, { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '../api/axios';
import style from '../css/Row.module.css';
import MovieModal from './MovieModal';

function Row(props) {
  // state
  let [ movies, setMovies ] = useState([]); // 영화 정보
  let sliderRef = useRef(0); // row__posters 요소 참조
  let touchStartX = useRef(0); // 터치 시작 위치
  let [ modalOpen, setModalOpen ] = useState(false); // 모달
  let [ movieSelected, setMovieSelected ] = useState({}); // 선택된 영화
  
  // useCallback
  const fetchMovieData = useCallback( async () => {
    const response = await axiosInstance.get(props.fetchUrl);    
    setMovies(response.data.results);    
  },[props.fetchUrl]); // props.fetchUrl이 바뀔때 다시 실행

  // effect
  useEffect(()=>{
    fetchMovieData()
  },[fetchMovieData]) // props.fetchUrl가 바껴 fetchMovieData()가 재생성되면 재실행

  // function
  // 클릭 이벤트 슬라이드 이동
  function handleSlide(direction){
    if(sliderRef.current){
      const slider = sliderRef.current;
      const sliderMove = direction === 'left' ? -slider.offsetWidth/1.5 : slider.offsetWidth/1.5;
      slider.scrollBy({ left: sliderMove, behavior: "smooth" });
    }
  }

  // 터치 이벤트
  function handleTouchStart(event){
    touchStartX.current = event.targetTouches[0].clientX
  };

  function handleTouchEnd(event){
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (diffX > 100) { // 왼쪽으로 이동
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth/1.5, behavior: "smooth" });
    } else if (diffX < -100) { // 오른쪽으로 이동
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth/1.5, behavior: "smooth" });
    }
  };
  
  function movieModalOpen(movie){
    setModalOpen(true);
    setMovieSelected(movie);
  }

  // render
  return (
    <div className={style.row}>
      <h2 className={style.slider__title}>{props.title}</h2>
      <div className={style.slider}>
        <div className={`${style['slider__arrow-left']} ${style.arrow__wrap}`} onClick={()=>handleSlide('left')}>
          <span className={style.arrow} >{'<'}</span>
        </div>
        <div className={style.row__posters} id={props.id} ref={sliderRef}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} 
        >
        {movies.map(function(ele){
          return <div className={style.movie__wrap} key={ele.id}>
                  <div className={style.poster__wrap} >
                    <img className={style.poster__img} src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name}
                    onClick={()=>movieModalOpen(ele)}/>
                  </div>
                  <div className={style.title__wrap}>
                    <h6 className={style.movie__title}>{ele.name || ele.title}</h6>
                  </div>
                </div>
              })}
        </div>
        <div className={`${style['slider__arrow-right']} ${style.arrow__wrap}`} onClick={()=>handleSlide('right')}>
          <span className={style.arrow} >{'>'}</span>
        </div>
      </div>
      {modalOpen ? <MovieModal setModalOpen={setModalOpen} movieSelected={movieSelected} mediaType={props.mediaType}></MovieModal> : null}
    </div>
  )
}

export default Row;