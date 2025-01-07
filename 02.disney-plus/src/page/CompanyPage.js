import axiosInstance from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from'react-router-dom';
import style from '../css/CompanyPage.module.css';


function CompanyPage() {
  const { companyName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state.company
  
  // state
  let [ program, setProgram ] = useState([]);

  // effect
  useEffect(()=>{
    async function fetchData(){
      const { mediaType, standard, companyId } = company;
      let searchResult = [];

      if(companyId.length === 1) {
        const response = await axiosInstance.get(`/discover/${mediaType}?${standard}=${companyId[0]}&sort_by=release_date.desc`)
        const filterResponse = response.data.results.filter((ele)=>ele.backdrop_path && ele.backdrop_path !== null)
        searchResult = filterResponse;     
      }
      else{
        const responses = await Promise.all(
          companyId.map( async function(ele){
            const response = await axiosInstance.get(`/discover/${mediaType}?${standard}=${ele}&sort_by=release_date.desc`)
            return response.data.results;
          })
        )
        const filterResponse = responses.flat().filter((ele)=>ele.backdrop_path && ele.backdrop_path !== null)
        .sort((first, last) => new Date(last.release_date) - new Date(first.release_date))
        .slice(0,20)
        searchResult = filterResponse;      
      }
      setProgram(searchResult)
      console.log(searchResult);
    }
    fetchData()
  },[companyName, company])

  // function
  function handleNavigate(ele) {
    console.log(ele);
    navigate(`/detail/${ele.id}`, { state: { data: {...ele, media_type: company.mediaType}}}) 
  }

  return (
    <section className={style.company__section}>
      <div className={style.company__container}>
        <div className={style.company__info}>
          <div className={style['info__wrap-bg']}>
            <video className={style.info__video} autoPlay muted loop>
              <source src={company.video} type='video/mp4'/>
            </video>
            <div className={style.info__bgImg} style={{'backgroundImage':`url(${company.backgroundImg})`}}></div>
            <div className={style['company__bg-scroll']}></div>
          </div>
          <div className={style['info__wrap-logo']}>
            <img className={style.info__logo} src={company.logo} alt='company logo'/>
          </div>
        </div>
        <div className={style.company__content}>
          {program.map(function (ele) {
              return (
                <div className={style.movie__wrap} key={ele.id}>
                  <div className={style.content__item}>
                    <img className={style.item__img} src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} onClick={()=>{ handleNavigate(ele) }}/>
                  </div>
                    <h6 className={style.item__title}>{ele.title || ele.name}</h6>
                </div>
              );
          })}

        </div>
      </div>
    </section>
  )
}

export default CompanyPage;