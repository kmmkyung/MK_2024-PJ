import React, { useContext, useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from '../context/LoadingContext';
import axiosInstance from '../api/axios';
import { useScrollBgOpacity } from '../hooks/useScrollBgColor';
import style from '../css/DetailPage.module.css';

function DetailPage(){
  // context
  const { setIsLoading } = useContext(LoadingContext);

  // state
  let programId = useParams().programId;
  const navigate = useNavigate();
  const location = useLocation();

  const locationData = location.state?.data;
  let [ program, setProgram ] = useState();
  let [ collection, setCollection ] = useState();
  let [ similar, setSimilar ] = useState();
  let [ credits, setCredits ] = useState();
  let [ activeTab, setActiveTab ] = useState(0);
  let [ sectionMovieId, setSectionMovieId ] = useState(true);
  
  // function
  async function noSearchFetchMediaData(id) {
    try {
      const programMediaMovie = await axiosInstance.get(`/movie/${id}`);
      programMediaMovie.data.media_type = 'movie'
      return programMediaMovie
    } catch (movieError) {
      console.error('영화 데이터 요청 없음:', movieError.message);
    }
    try {
      const programMediaTv = await axiosInstance.get(`/tv/${id}`);
      programMediaTv.data.media_type = 'tv'
      return programMediaTv
    } catch (tvError) {
      console.error('TV 데이터 요청 없음:', tvError.message);
    }
  }

  // effect
  useEffect(()=>{
    async function fetchData(){
      let responseMedia, programMedia
      try{
        setIsLoading(true); // 로딩시작
        if(!locationData){ // 주소창에 쳐서 들어온 경우
          responseMedia = await noSearchFetchMediaData(programId)
        }
        else{
          programMedia = locationData.media_type === 'movie' ? `/movie/${programId}` : `/tv/${programId}`;
          responseMedia = await axiosInstance.get(programMedia);
        }
        
        console.log(responseMedia.data);
        if(responseMedia){
          setProgram(responseMedia.data)
        
          const creditsMedia = (responseMedia.data.media_type || locationData.media_type) === 'movie' ? `/movie/${programId}/credits` : `/tv/${programId}/credits`;
          const responseCredits = await axiosInstance.get(creditsMedia);
          if(responseCredits.data.cast.length > 0){ setCredits(responseCredits.data);}
          else setCredits(null);

          const mediaSimilar = (responseMedia.data.media_type || locationData.media_type) === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
          const responseSimilar = await axiosInstance.get(mediaSimilar);
          if(responseSimilar.data.results.length > 0){ setSimilar(responseSimilar.data);}
          else setSimilar(null);
          
          if(responseMedia.data.belongs_to_collection !== null && responseMedia.data.belongs_to_collection){
            const collectionId = responseMedia.data.belongs_to_collection.id;
            const responseCollection = await axiosInstance.get(`/collection/${collectionId}`);            
            const responseCollectionFiler = responseCollection.data.parts.filter((ele)=>{ return ele.backdrop_path !== null})
            setCollection(responseCollectionFiler);
          }
          else setCollection(null);
        }
        else { setSectionMovieId(false); setProgram(null);}
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
  },[locationData, programId, setIsLoading])
  
  useEffect(()=>{
    function listOn(){
      const tapList = document.querySelectorAll(`.${style.list__item}`);
      
      const tapContent = document.querySelectorAll(`.${style.tap__content}`);
      tapList.forEach(function(ele,idx){
        ele.classList.remove('on')
        tapContent[idx]?.classList.remove('on')
      }); 
      tapList[activeTab]?.classList.add('on')
      tapContent[activeTab]?.classList.add('on')
    }
    listOn()
  },[programId, collection, similar, activeTab])

  // tap data
  const taps = [
    collection &&
    { name: 'collection',
      content: 
        <div className={`${style['tap__content-collection']} ${style.tap__content}`}>
          {collection.map(function (ele) {
              return (
                <div className={style.movie__wrap} key={ele.id}>
                  <div className={style.poster__wrap}>
                    <img className={style.poster__img} src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} onClick={() => { navigate(`/detail/${ele.id}`, { state: { data: ele } }); }}/>
                  </div>
                  <div className={style.title__wrap}>
                    <h6 className={style.movie__title}>{ele.title}</h6>
                  </div>
                </div>
              );
          })}
        </div>
    },  
    similar &&  {
      name: 'similar',
      content: 
        <div className={`${style['tap__content-similar']} ${style.tap__content}`}>
          {similar.results.map(function (ele) {
            if (ele.backdrop_path) {
              return (
                <div className={style.movie__wrap} key={ele.id}>
                  <div className={style.poster__wrap}>
                    <img className={style.poster__img} src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} onClick={() => { navigate(`/detail/${ele.id}`, { state: { data: { ...ele, media_type: program.media_type || locationData.media_type } } }); }}/>
                  </div>
                  <div className={style.title__wrap}>
                    <h6 className={style.movie__title}>{ele.title || ele.name}</h6>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
    },
    program && {
      name: 'info',
      content: 
      <div className={`${style['tap__content-info']} ${style.tap__content}`}>
        { program?.media_type === 'movie' || locationData?.media_type === 'movie' ? 
          (<div className={style.info__container}>
            <div className={style.info__left}>
              <h2 className={style.info__title}>{program.title || program.name}</h2>
              <p className={style.info__description}>{program.overview}</p>
            </div>
            <div className={style.info__right}>
              <div className={style.info__content}>
                <p><span>공개일: </span><span>{(program.release_date).slice(0,4)}</span></p>
                <p><span>러닝타임: </span><span>{Math.floor(program.runtime/60)}시간 {Math.floor(program.runtime%60).toString().padStart(2, '0')}분</span></p>
                { program.genres.length > 0 ? <p><span>장르: </span><span>{program.genres.map(function(ele){return ele.name}).join(', ')}</span></p> : null }
              </div>
              <div className={style.info__credits}>
              {credits && credits.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                <p className={style.info__director}>
                  <span>감독: </span>
                  {credits.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </p>
                : null }
                <p className={style.info__cast}>
                  {credits ? <>
                  <span>배우: </span>
                  {credits && credits.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                  </>
                  : null}
                  </p>
              </div>`
            </div>
          </div>)
          :
          (<div className={style.info__container}>
            <div className={style.info__left}>
              <h2 className={style.info__title}>{program.title || program.name}</h2>
              <p className={style.info__description}>{program.overview}</p>
            </div>
            <div className={style.info__right}>
              <div className={style.info__content}>
                <p><span>공개일: </span><span>{(program.first_air_date).slice(0,4)}</span></p>
                <p><span>총 시즌: </span><span>{program.number_of_seasons}의 시즌</span></p>
                { program.genres.length > 0 ? <p><span>장르: </span><span>{program.genres.map(function(ele){return ele.name}).join(', ')}</span></p> : null }
              </div>
              <div className={`style.info__credits`}>
                {credits && credits.crew.filter(ele=>ele.job==="Director").length > 0 ? 
                <p className={style.info__director}>
                  <span>감독: </span>
                  {credits.crew.filter(ele=>ele.job==="Director").map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                </p>
                : null }
                <p className={style.info__cast}>
                  {credits ? <>
                    <span>배우: </span>{credits.cast.slice(0,6).map(function(ele){return <span key={ele.id}>{ele.name}</span>})}
                  </>
                  : null}
                  </p>
              </div>
            </div>
          </div>)
        }
      </div>
    }
  ].filter(Boolean);

  // function
  const backgroundImg = document.querySelector(`.${style.detail__bg}`)
  useScrollBgOpacity(backgroundImg)

  // component
  function MainContentMovie(){
    return (
      <div className={style.main__content}>
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
      <div className={style.main__content}>
        <p>{(program.first_air_date).slice(0,4)}</p>
        <span>•</span>
        <p>총 시즌 {program.number_of_seasons}</p>
        {program.genres.length > 0 ? <span>•</span> : null}
        <p>{program.genres.map(function(ele){return ele.name}).join(', ')}</p>
      </div>
    )
  }

  return (
    <section className={style.detail__container}>
    { program ? 
      <>
        <div className={style.detail__bg} style={{backgroundImage:`url('https://image.tmdb.org/t/p/original/${program.backdrop_path}')`}}></div>
        <div className={style.detail__wrap}>
          <div className={style.main__container}>
            <h1 className={style.main__title}>{program.title || program.name}</h1>
              { program?.media_type === 'movie' || locationData?.media_type === 'movie' ? <MainContentMovie/> : <MainContentTv/> }
          </div>
          <div className={style.detail__tap}>
            <ul className={style.tap__list}>
              { taps.map(function(ele,idx){
                return <li className={`${style.list__item} ${activeTab === idx ? style.on : ''}`} key={idx} onClick={()=>setActiveTab(idx)}>{ele.name}</li>})
              }
            </ul>
            <div className={style.tap__contents}>
              {/* 내용 */}
              { taps[activeTab].content}
              </div>
          </div>
        </div>
      </>
    : null }
    { !sectionMovieId ? 
      <div className={style.no__program}>
        <p>존재하지 않는 프로그램입니다.</p>
      </div>
    : null }
    </section>
  )
}


export default DetailPage;