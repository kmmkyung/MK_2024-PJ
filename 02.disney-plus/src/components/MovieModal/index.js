import React from "react";
import '../../css/MovieModal.css';

function MovieModal(props){  
  let { backdrop_path,title,overview,name,release_date,first_air_date,vote_average } = props.movieSelected
  
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span className="modal-close" onClick={()=>props.setModalOpen(false)}>X</span>
          <img className='modal__poster-img' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt="modal-img"/>
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