import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from'react-router-dom';
import style from '../css/MovieModal.module.css';

function MovieModal(props){   
  let { backdrop_path,title,overview,name,release_date,first_air_date,vote_average } = props.movieSelected
  let navigate = useNavigate()
  const refModalBg = useRef();

  //state
  const [closing, setClosing] = useState(false);

  //function
  const modalClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      props.setModalOpen(false);
    }, 450);
  }, [props]);

  // useEffect
  useEffect(()=>{
    const refModalBgEl = refModalBg.current
    refModalBgEl.addEventListener('click',modalClose)
    refModalBgEl.addEventListener('touchstart',modalClose)
    
    return ()=>{
      refModalBgEl.removeEventListener('click',modalClose)
      refModalBgEl.removeEventListener('touchstart',modalClose)
    }
  },[modalClose])

  function handleMovieClick(){
    if(props.mediaType){
      navigate(`/detail/${props.movieSelected.id}`,{ state: { data: {...props.movieSelected, media_type:props.mediaType} }})
    }
    else{
      navigate(`/detail/${props.movieSelected.id}`,{ state: { data: props.movieSelected }})
    }
  }

  
  return (
    <div className={style.presentation} role="presentation" >
      <div className={style.modal__bg} ref={refModalBg}></div>
      <div className={`${style.modal} ${closing ? style.fadeOut : style.fadeIn}`} >
        <div className={style.modal__poster}>
          <span className={style['modal-close']} onClick={modalClose}>✕</span>
          <img className={style['modal__poster-img']} src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt="modal-img"/>
          <button className={style['modal__detail-button']} onClick={()=>{handleMovieClick()}}>► 자세히 보기</button>
        </div>
        <div className={style.modal__content}>
          <p className={style.modal__details}>
            {release_date ? release_date : first_air_date}
          </p>
          <h2 className={style.modal__title}>{title ? title:name}</h2>
          <p className={style.modal__rating}>평점: {vote_average}</p>
          <p className={style.modal__overview}>{overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieModal;