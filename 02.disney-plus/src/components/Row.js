import React, { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '../api/axios';
import '../css/Row.css';

function Row(props) {
  // state
  let [ movies, setMovies ] = useState([]); // 영화 정보
  let sliderRef = useRef(0); // row__posters 요소 참조
  let touchStartX = useRef(0); // 터치 시작 위치
  let dragStartX = useRef(0); // 드래그 시작 위치
  let isDragging = false; // 드래그 중
  
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
  const rowPosters = document.querySelectorAll('.row__posters')
  rowPosters.forEach(function(ele){
    ele.addEventListener('touchmove',function(e){
      e.preventDefault();
    })
  })

  function handleTouchStart(event){
    // touchStartX = event.targetTouches[0].clientX; // 터치 시작 좌표
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
  const rowPostersWrap = document.querySelectorAll('.poster__wrap')
  function handleDragStart(event){
    console.log('시작');
    isDragging = true;
    dragStartX.current = event.clientX; // 드래그 시작 위치
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.scrollBehavior = "auto";
  };

  function handleDragMove(event){
    console.log('하는중');
    
    rowPostersWrap.forEach(function(ele){
      ele.style.pointerEvent = "none";
    });
    const dragX = event.pageX - dragStartX.current; // 마우스 이동 거리
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - dragX;
  }

  function handleDragEnd(){
    isDragging = false;
    sliderRef.current.style.cursor = "grab";
    sliderRef.current.style.scrollBehavior = "smooth";
  }

  // render
  return (
    <div>
      <h2>{props.title}</h2>
      <div className='slider' >
        <div className='slider__arrow-left arrow__wrap' onClick={()=>handleSlide('left')}>
          <span className='arrow' >{'<'}</span>
        </div>
        <div className='row__posters' id={props.id} ref={sliderRef}
        onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDragMove}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {movies.map(function(ele){
            return <div key={ele.id}>
              <div className='poster__wrap' >
                <img className='row__poster' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name}/>
              </div>
              <h6 className='row__title'>{ele.name || ele.title}</h6>
              </div>
            })}
        </div>
        <div className='slider__arrow-right arrow__wrap' onClick={()=>handleSlide('right')}>
          <span className='arrow' >{'>'}</span>
        </div>
      </div>
    </div>
  )
}

export default Row;