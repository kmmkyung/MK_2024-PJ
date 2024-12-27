import React, { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../api/axios';
import '../css/Row.css';

function Row(props) {
  // state
  let [ movies, setMovies ] = useState([]);

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


  // render
  return (
    <div>
      <h2>{props.title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left arrow__wrap'>
          <span className='arrow'>{'<'}</span>
        </div>
        <div className='row__posters' id={props.id}>
          {movies.map(function(ele){
            console.log(ele);
            
            return <div className='poster__wrap' key={ele.id}>
              <img className='row__poster' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name}/>
              </div>
            })}
        </div>
        <div className='slider__arrow-right arrow__wrap'>
          <span className='arrow'>{'>'}</span>
        </div>
      </div>
    </div>
  )
}

export default Row;