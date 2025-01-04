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
  let [ activeTab, setActiveTab ] = useState(0);
  
  // effect
  useEffect(()=>{
    async function fetchData(){
      try{
        const media = mediaType === 'movie' ? `/movie/${programId}` : `/tv/${programId}`;
        const response = await axiosInstance.get(media);
        setProgram(response.data);

        const mediaSimilar = mediaType === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
        const responseSimilar = await axiosInstance.get(mediaSimilar);
        setSimilar(responseSimilar.data);  

        if(response.data.belongs_to_collection !== null){
          const collectionId = response.data.belongs_to_collection.id;
          const responseCollection = await axiosInstance.get(`/collection/${collectionId}`);
          setCollection(responseCollection.data);
        }
        else{
          setCollection(null);
        }

        window.scrollTo(0, 0);
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
      const tapContent = document.querySelectorAll('.tap__content');
      tapList.forEach(function(ele,idx){
        ele.classList.remove('on')
        tapContent[idx]?.classList.remove('on')
      }); 
      tapList[activeTab]?.classList.add('on')
      tapContent[activeTab]?.classList.add('on')
    }
    listOn()
  },[programId, collection, similar, activeTab])

if( !program ) return null;

  // function

  // tap data
  const taps = [
    { name: 'collection',
      content: collection && (
        <div className='tap__content--collection tap__content'>
          {collection.parts.map(function (ele) {
            if (ele.backdrop_path) {
              return (
                <div className='collection__item' key={ele.id} onClick={() => { navigate(`/${ele.id}`, { state: { data: ele } }); }}>
                  <img className='collection__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} />
                  <h6 className='collection__title'>{ele.title}</h6>
                </div>
              );
            }
            return null;
          })}
        </div>
      )
    },  
    {
      name: 'similar',
      content: similar && (
        <div className='tap__content--similar tap__content'>
          {similar.results.map(function (ele) {
            if (ele.backdrop_path) {
              return (
                <div className='similar__item' key={ele.id} onClick={() => { navigate(`/${ele.id}`, { state: { data: { ...ele, media_type: mediaType } } }); }}>
                  <img className='similar__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} />
                  <h6 className='similar__title'>{ele.title || ele.name}</h6>
                </div>
              );
            }
            return null;
          })}
        </div>
      )
    },
    {
      name: 'info',
      content: (
        <div className='tap__content--info tap__content'></div>
      )
    }
  ]

  function MainContentMovie(){
    return (
      <div className='main__content'>
        <p>{(program.release_date).slice(0,4)}</p>
        <span>•</span>
        <p>{Math.floor(program.runtime/60)}시간 {Math.floor(program.runtime%60).toString().padStart(2, '0')}분</p>
        <span>•</span>
        <p>{program.genres.map(function(ele){return ele.name}).join(', ')}</p>
      </div>
    )
  }

  function MainContentTv(){
    return (
      <div className='main__content'>
        <p>{(program.first_air_date).slice(0,4)}</p>
        <span>•</span>
        <p>총 시즌 {program.number_of_seasons}</p>
        <span>•</span>
        <p>{program.genres.map(function(ele){return ele.name}).join(', ')}</p>
      </div>
    )
  }

  return (
    <section className='detail__container'>
      <div className='detail__bg' style={{backgroundImage:`url('https://image.tmdb.org/t/p/original/${program.backdrop_path}')`}}></div>
      <div className='detail__wrap'>
        <div className='main__container'>
          <h1 className='main__title'>{program.title || program.name}</h1>
            { mediaType === 'movie' ? <MainContentMovie/> : <MainContentTv/> }
          <p className='main__description'>{program.overview}</p>
        </div>
        <div className='detail__tap'>
          <ul className='tap__list'>
            { taps.map(function(ele,idx){
              return <li className={`list__item ${activeTab === idx ? 'on':''}`} key={idx} onClick={()=>setActiveTab(idx)}>{ele.name}</li>
            })}
          </ul>
          <div className='tap__contents'>
            {/* 내용 */}
            { taps[activeTab].content }
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailPage;