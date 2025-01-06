import React, { useContext, useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from '../context/LoadingContext';
import axiosInstance from '../api/axios';
import '../css/DetailPage.css';

function DetailPage(){
  // context
  const { setIsLoading } = useContext(LoadingContext);

  // state
  const navigate = useNavigate();
  const location = useLocation();
  const mediaType = location.state.data.media_type;

  let programId = useParams().programId;
  let [ program, setProgram ] = useState();
  let [ collection, setCollection ] = useState();
  let [ similar, setSimilar ] = useState();
  let [ credits, setCredits ] = useState();
  let [ activeTab, setActiveTab ] = useState(0);
  
  // effect
  useEffect(()=>{
    async function fetchData(){
      try{
        setIsLoading(true); // 로딩시작
        const programMedia = mediaType === 'movie' ? `/movie/${programId}` : `/tv/${programId}`;
        const response = await axiosInstance.get(programMedia);
        setProgram(response.data);
        console.log(response.data);

        const creditsMedia = mediaType === 'movie' ? `/movie/${programId}/credits` : `/tv/${programId}/credits`;
        const responseCredits = await axiosInstance.get(creditsMedia);
        setCredits(responseCredits.data);

        const mediaSimilar = mediaType === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
        const responseSimilar = await axiosInstance.get(mediaSimilar);
        if(responseSimilar.data.results.length > 0){
          setSimilar(responseSimilar.data);
        }        

        if(response.data.belongs_to_collection !== null && response.data.belongs_to_collection){
          const collectionId = response.data.belongs_to_collection.id;
          const responseCollection = await axiosInstance.get(`/collection/${collectionId}`);
          setCollection(responseCollection.data);
        }
        else{
          setCollection(null);
        }
      }
      catch(err){
        console.log(err);
      }
      finally{
        setIsLoading(false); // 로딩끝
      }
    }
    fetchData()
    setActiveTab(0);
  },[programId, mediaType, setIsLoading])

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

  // tap data
  const taps = [
    collection &&
    { name: 'collection',
      content: 
        <div className='tap__content--collection tap__content'>
          {collection.parts.map(function (ele) {
            if (ele.backdrop_path) {
              return (
                <div className='collection__item' key={ele.id} onClick={() => { navigate(`/detail/${ele.id}`, { state: { data: ele } }); }}>
                  <img className='collection__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} />
                  <h6 className='collection__title'>{ele.title}</h6>
                </div>
              );
            }
            return null;
          })}
        </div>
    },  
    similar &&  {
      name: 'similar',
      content: 
        <div className='tap__content--similar tap__content'>
          {similar.results.map(function (ele) {
            if (ele.backdrop_path) {
              return (
                <div className='similar__item' key={ele.id} onClick={() => { navigate(`/detail/${ele.id}`, { state: { data: { ...ele, media_type: mediaType } } }); }}>
                  <img className='similar__img' src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} />
                  <h6 className='similar__title'>{ele.title || ele.name}</h6>
                </div>
              );
            }
            return null;
          })}
        </div>
    },
    {
      name: 'info',
      content: 
      <div className='tap__content--info tap__content'>
        {mediaType === 'movie' ? 
          <div className='info__container'>
            <div className='info__left'>
              <h2 className='info__title'>{program.title || program.name}</h2>
              <p className='info__description'>{program.overview}</p>
            </div>
            <div className='info__right'>
              <div className='info__content'>
                <p><span>공개일: </span><span>{(program.release_date).slice(0,4)}</span></p>
                <p><span>러닝타임: </span><span>{Math.floor(program.runtime/60)}시간 {Math.floor(program.runtime%60).toString().padStart(2, '0')}분</span></p>
                { program.genres.length > 0 ? <p><span>장르: </span><span>{program.genres.map(function(ele){return ele.name}).join(', ')}</span></p> : null }
              </div>
              <div className='info__credits'>
              {credits && credits.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                <p className='info__director'>
                  <span>감독: </span>
                  {credits.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </p>
                : null }
                <p className='info__cast'>
                  <span>배우: </span>
                  {credits && credits.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </p>
              </div>`
            </div>
          </div>
          :
          <div className='info__container'>
            <div className='info__left'>
              <h2 className='info__title'>{program.title || program.name}</h2>
              <p className='info__description'>{program.overview}</p>
            </div>
            <div className='info__right'>
              <div className='info__content'>
                <p><span>공개일: </span><span>{(program.first_air_date).slice(0,4)}</span></p>
                <p><span>총 시즌: </span><span>{program.number_of_seasons}의 시즌</span></p>
                { program.genres.length > 0 ? <p><span>장르: </span><span>{program.genres.map(function(ele){return ele.name}).join(', ')}</span></p> : null }
              </div>
              <div className='info__credits'>
                {credits && credits.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                <p className='info__director'>
                  <span>감독: </span>
                  {credits.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </p>
                : null }
                <p className='info__cast'>
                  <span>배우: </span>
                  {credits && credits.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    }
  ].filter(Boolean);

  // function

  // component
  function MainContentMovie(){
    return (
      <div className='main__content'>
        <p>{(program.release_date).slice(0,4)}</p>
        <span>•</span>
        <p>{Math.floor(program.runtime/60)}시간 {Math.floor(program.runtime%60).toString().padStart(2, '0')}분</p>
        {program.genres.length > 0 ? <span>•</span> : null}
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
        {program.genres.length > 0 ? <span>•</span> : null}
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
        </div>
        <div className='detail__tap'>
          <ul className='tap__list'>
            { taps.map(function(ele,idx){
              return <li className={`list__item ${activeTab === idx ? 'on':''}`} key={idx} onClick={()=>setActiveTab(idx)}>{ele.name}</li>})
            }
          </ul>
          <div className='tap__contents'>
            {/* 내용 */}
            {taps[activeTab].content}
            </div>
        </div>
      </div>
    </section>
  )
}


export default DetailPage;