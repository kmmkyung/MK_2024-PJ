import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios';

function DetailPage(){
  // state
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data
  console.log(data, 'data');
  
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

        const mediaSimilar = mediaType === 'movie' ? `/movie/${programId}/similar` : `/tv/${programId}/similar`;
        const responseSimilar = await axiosInstance.get(mediaSimilar);
        setSimilar(responseSimilar.data);  

        if(response.data.belongs_to_collection !== null){
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
if( !program ) return null;

  // function
  

  return (
    <section className='detail__container' style={{background:`url('https://image.tmdb.org/t/p/original/${program.backdrop_path}') center no-repeat fixed`}}>
      <div className='detail__contents--main'>
        <h1 className='detail__title'>{program.title || program.name}</h1>
        <div>
          <p>{(program.release_date).slice(0,4)}</p>
          <p>{Math.floor(program.runtime/60)}시간 {Math.floor(program.runtime%60).toString().padStart(2, '0')}분</p>
          <p>{program.genres.map(function(ele){return <span key={ele.id}>{ele.name}</span>})}</p>
        </div>
        <p className='detail__description'>{program.overview}</p>
      </div>
      <div className='detail__contents--tap'>
        <ul className='tap__list'>
          {collection ? <li className='list__item'>추천작</li> : null}
          {similar? <li className='list__item'>비슷한 장르</li> : null}
          <li className='list__item'>상세정보</li>
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
    </section>
  )
}

export default DetailPage;