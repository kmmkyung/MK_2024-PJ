import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from '../api/axios';

function DetailPage(){
  // state
  const location = useLocation();
  const mediaType = location.state.data.media_type;

  let programId = useParams().programId;
  let [ program, setProgram ] = useState({});
  
  // effect
  useEffect(()=>{
    async function fetchData(){
      try{
        if(mediaType === 'movie'){
          const response = await axiosInstance.get(`/movie/${programId}`)
          setProgram(response.data)
          console.log(response.data);

        }
        if(mediaType === 'tv'){
          const response = await axiosInstance.get(`/tv/${programId}`)
          setProgram(response.data)
          console.log(response.data);
          
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData()
  },[programId, mediaType])
if( !program ) return null;

  // function

  return (
    <section className='detail__container' style={{background:`url('https://image.tmdb.org/t/p/original/${program.backdrop_path}') center no-repeat fixed`}}>
      <div className='detail__contents'>
        <h1 className='detail__title'>{program.title || program.name}</h1>
        <h1 className='detail__description'>{program.overview}</h1>
        <p>{program.release_date}</p>
        <p>{program.runtime}</p>
        {/* <p>{program.genres}</p> */}
      </div>
    </section>
  )
}

export default DetailPage;