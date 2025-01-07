import React, { useState } from "react";
import { useNavigate } from'react-router-dom';
import '../css/MovieModal.css';

function MovieModal(props){ 
  console.log(props.movieSelected);
  
  let { backdrop_path,title,overview,name,release_date,first_air_date,vote_average } = props.movieSelected
  let navigate = useNavigate()
  //state
  const [closing, setClosing] = useState(false);

  //function
  function modalClose(){
    setClosing(true);
    setTimeout(() => {
      props.setModalOpen(false);
    }, 450); 
  }

  function handleMovieClick(){
    if(props.mediaType){
      navigate(`/detail/${props.movieSelected.id}`,{ state: { data: {...props.movieSelected, media_type:props.mediaType} }})
    }
    else{
      navigate(`/detail/${props.movieSelected.id}`,{ state: { data: props.movieSelected }})
    }
  }

  
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className={`modal ${closing ? "fadeOut" : "fadeIn"}`} >
          <div className="modal__poster">
          <span className="modal-close" onClick={modalClose}>✕</span>
            <img className='modal__poster-img' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt="modal-img"/>
            <button className="modal__detail--button" onClick={()=>{handleMovieClick()}}>► 자세히 보기</button>
          </div>
          <div className="modal__content">
            <p className="modal__details">
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title:name}</h2>
            <p className="modal__rating">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal;