import React, { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '../api/axios';
import '../css/Row.css';
import MovieModal from './MovieModal';

function Row(props) {
  // state
  let [ movies, setMovies ] = useState([]); // 영화 정보
  let sliderRef = useRef(0); // row__posters 요소 참조
  let touchStartX = useRef(0); // 터치 시작 위치
  let dragStartX = useRef(0); // 드래그 시작 위치
  let scrollLeft = useRef(0); // 스크롤 위치
  let isDragging = false; // 드래그 중
  let [ modalOpen, setModalOpen ] = useState(false); // 모달
  let [ movieSelected, setMovieSelected ] = useState({}); // 선택된 영화
  
  // useCallback
  const fetchMovieData = useCallback( async () => {
    const response = await axiosInstance.get(props.fetchUrl);    
    setMovies(response.data.results);
    console.log(response.data);
    
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

  // 드래그 이벤트
  function noSelectDrag(){
    const rowId = document.querySelector('#'+sliderRef.current.getAttribute('id'));      
    const rowPoster = rowId.querySelectorAll('.row__poster')
    rowPoster.forEach(function(ele){
      if( isDragging ){
        ele.classList.add('noSelect')
      }
      else {
        ele.classList.remove('noSelect')
      }
    })
  }

  function handleMouseDown(event){
    isDragging = true;
    dragStartX.current = event.pageX - sliderRef.current.scrollLeft; // 드래그 시작 위치 (슬라이드 좌측 + / 슬라이드 우측 - 값)
    scrollLeft.current = sliderRef.current.scrollLeft; // 스크롤 위치    
    sliderRef.current.style.cursor = "grabbing"; // 드래그 중 커서
    sliderRef.current.style.scrollBehavior = "auto"; // 부드러운 스크롤 제거
  };
  
  function handleMouseMove(event){
    if(!isDragging){ return }
    noSelectDrag()
    event.preventDefault();
    const currentX = event.pageX; // 현재 마우스 위치
    const moveX = currentX - dragStartX.current; // 드래그한 거리

    sliderRef.current.scrollLeft = scrollLeft.current + (scrollLeft.current - moveX);
  }

  function handleMouseUp(){
    isDragging = false;
    sliderRef.current.style.cursor = "grab";
    sliderRef.current.style.scrollBehavior = "smooth";
    noSelectDrag()
    scrollLeft.current = sliderRef.current.scrollLeft;
  }

  function movieModalOpen(movie){
    setModalOpen(true);
    setMovieSelected(movie);
  }

  // render
  return (
    <div className='row'>
      <h2 className='slider__title'>{props.title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left arrow__wrap' onClick={()=>handleSlide('left')}>
          <span className='arrow' >{'<'}</span>
        </div>
        <div className='row__posters' id={props.id} ref={sliderRef}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        >
          {movies.map(function(ele){
            return <div className='row__poster' key={ele.id}>
              <div className='poster__wrap' >
                <img className='poster__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name}
                onClick={()=>movieModalOpen(ele)}/>
              </div>
              <h6 className='poster-title'>{ele.name || ele.title}</h6>
              </div>
            })}
        </div>
        <div className='slider__arrow-right arrow__wrap' onClick={()=>handleSlide('right')}>
          <span className='arrow' >{'>'}</span>
        </div>
      </div>
      {modalOpen ? <MovieModal setModalOpen={setModalOpen} movieSelected={movieSelected}></MovieModal> : null}
    </div>
  )
}

export default Row;