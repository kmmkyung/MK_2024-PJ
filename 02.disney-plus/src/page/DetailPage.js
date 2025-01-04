import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';
import '../css/DetailPage.css';

function DetailPage(){
  // state
  const navigate = useNavigate();
  const location = useLocation();
  const mediaType = location.state.data.media_type;

  let programId = useParams().programId;
  let [ program, setProgram ] = useState();
  let [ collection, setCollection ] = useState();
  let [ similar, setSimilar ] = useState();
  
  // effect
  useEffect(()=>{
    async function fetchData(){
      try{
        const media = mediaType === 'movie' ? `/movie/${programId}` : `/tv/${programId}`;
        const response = await axiosInstance.get(media);
        setProgram(response.data);
        console.log(response.data);
        

        const mediaSimilar = mediaType === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
        const responseSimilar = await axiosInstance.get(mediaSimilar);
        setSimilar(responseSimilar.data);  

        if(response.data.belongs_to_collection){
          const collectionId = response.data.belongs_to_collection.id;
          const responseCollection = await axiosInstance.get(`/collection/${collectionId}`);
          setCollection(responseCollection.data);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData()
  },[programId, mediaType])

  useEffect(()=>{
    function listOn(){
      const tapList = document.querySelectorAll('.tap__list .list__item');
      tapList.forEach(item => item.classList.remove('on')); 
      tapList[0]?.classList.add('on')
    }
    listOn()
  },[collection, similar])

if( !program ) return null;

  // function
  function listOnClick(event){
    const tapList = document.querySelectorAll('.tap__list .list__item');
    tapList.forEach(item => item.classList.remove('on')); 
    event.target.classList.add('on');
  }


  return (
    <section className='detail__container' style={{backgroundImage:`url('https://image.tmdb.org/t/p/original/${program.backdrop_path}')`}}>
      <div className='detail__wrap'>
        <div className='main__container'>
          <h1 className='main__title'>{program.title || program.name}</h1>
            {mediaType === 'movie' ?
              <div className='main__content'>
                <p>{(program.release_date).slice(0,4)}</p>
                <span>•</span>
                <p>{Math.floor(program.runtime/60)}시간 {Math.floor(program.runtime%60).toString().padStart(2, '0')}분</p>
                <span>•</span>
                <p>{program.genres.map(function(ele){return ele.name}).join(', ')}</p>
              </div>
            : null}
            {mediaType === 'tv' ?
              <div className='main__content'>
                <p>{(program.first_air_date).slice(0,4)}</p>
                <span>•</span>
                <p>총 시즌 {program.number_of_seasons}</p>
                <span>•</span>
                <p>{program.genres.map(function(ele){return ele.name}).join(', ')}</p>
              </div>
            : null}
          <p className='main__description'>{program.overview}</p>
        </div>
        <div className='detail__tap'>
          <ul className='tap__list'>
            {collection ? <li className='list__item' onClick={listOnClick}>컬렉션</li> : null}
            {similar ? <li className='list__item' onClick={listOnClick}>비슷한 장르</li> : null}
            <li className='list__item' onClick={listOnClick}>상세 정보</li>
          </ul>
          {/* 시리즈가 있는 경우 */}
          {collection?
          <div className='tap__content--collection'>
            {collection.parts.map(function(ele){
              if(ele.backdrop_path){
              return <div className='collection__item' key={ele.id} onClick={()=>{navigate(`/${ele.id}`,{state:{data:ele}})} }>
                <img className='collection__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name}/>
                <h6 className='collection__title'>{ele.title}</h6>
              </div>
              }
              return null;
            })}
          </div> : null
          }
          {/* 비슷한 장르 */}
          {similar? 
            <div className='tap__content--Similar'>
            {similar.results.map(function(ele){
              if(ele.backdrop_path){
              return <div className='similar__item' key={ele.id} onClick={()=>{navigate(`/${ele.id}`,{state:{data:{...ele,media_type: mediaType}}})} }>
                <img className='similar__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name}/>
                <h6 className='similar__title'>{ele.title}</h6>
              </div>
              }
              return null;
            })}
          </div> : null
          }
          {/* 상세정보 */}
          <div className='tap__content--detail'></div>
        </div>
      </div>
    </section>
  )
}

export default DetailPage;