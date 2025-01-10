import axiosInstance from '../api/axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from'react-router-dom';
import { LoadingContext } from '../context/LoadingContext';
import { useScrollBgOpacity } from '../hooks/useScrollBgColor';
import style from '../css/CompanyPage.module.css';
import companiesData from '../data/companiesData';



function CompanyPage() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const company = companiesData.find((item) => item.companyName === companyName);  
  
  // context
  const { setIsLoading } = useContext(LoadingContext);

  // state
  let [ program, setProgram ] = useState([]);
  let [ moreButtonClick, setMoreButtonClick ] = useState(false);
  let [ filterResponse, setFilterResponse ] = useState([]);
  let [ videoEnded , setVideoEnded] = useState(false);
  
  // effect
  useEffect(()=>{
    const { mediaType, standard, companyId } = company;
    async function fetchData(){
      // 링크
      function buildUrl(companyId, pageNumber){
        return `/discover/${mediaType}?${standard}=${companyId}&sort_by=release_date.desc&page=${pageNumber}`
      }

      // response 데이터 필터링
      function splitResponses(responsePageAll) {
        const validResults = responsePageAll.filter((ele) => ele.backdrop_path);
        return [validResults.slice(0, 20), validResults.slice(20)];
      }

      let responsePageAll
      if(companyId.length === 1) {
        const responsePage1 = await axiosInstance.get(buildUrl(companyId[0],1))
        const responsePage2 = await axiosInstance.get(buildUrl(companyId[0],2))
        responsePageAll = [...responsePage1.data.results, ...responsePage2.data.results]
      }
      else{
        const responses = await Promise.all(
          companyId.map( async function(ele){
            const response = await axiosInstance.get(buildUrl(ele,1))
            return response.data.results;
          })
        )
        responsePageAll = responses.flat().filter((ele)=>ele.backdrop_path && ele.backdrop_path !== null)
      }
      const splitData = splitResponses(responsePageAll);
      setFilterResponse(splitData);
      setProgram(splitData[0]);
    }
    fetchData()
  },[company, companyName])

  useEffect(()=>{
    let setTimeId;
    if(moreButtonClick){
      setIsLoading(true);
      setTimeId = setTimeout(()=>{
        setProgram((prev)=> [...prev, ...filterResponse[1]])
        setIsLoading(false);
      },500)
    }
    return () => { clearTimeout(setTimeId) };
  },[moreButtonClick,filterResponse,setIsLoading])

  const backgroundImg = document.querySelector(`.${style['info__wrap-bg']}`)
  useScrollBgOpacity(backgroundImg)

  // function
  function handleNavigate(ele) {
    navigate(`/detail/${ele.id}`, { state: { data: {...ele, media_type: company.mediaType}}}) 
  }

  function videoEndedFn(){
    setVideoEnded(true);
  }

  return (
    <section className={style.company__section}>
      <div className={style.company__container}>
        <div className={`${style.company__info} ${videoEnded? style.end : ''}`}>
          <div className={style['info__wrap-bg']}>
            <video className={style.info__video} autoPlay muted onEnded={videoEndedFn} >
              <source src={company.video} type='video/mp4'/>
            </video>
            <div className={style.info__bgImg} style={{'backgroundImage':`url(${company.backgroundImg})`}} ></div>
          </div>
          <div className={style['info__wrap-logo']}>
            <img className={style.info__logo} src={company.logo} alt='company logo'/>
          </div>
        </div>
        <div className={style.company__content}>
          {program.map(function (ele) {
              return (
                <div className={style.movie__wrap} key={ele.id}>
                  <div className={style.poster__wrap}>
                    <img className={style.poster__img} src={`https://image.tmdb.org/t/p/original/${ele.backdrop_path}`} alt={ele.name} onClick={()=>{ handleNavigate(ele) }}/>
                  </div>
                  <div className={style.title__wrap}>
                    <h6 className={style.movie__title}>{ele.title || ele.name}</h6>
                  </div>
                </div>
              );
          })}
        </div>
        {!moreButtonClick ? <button className={style.button__more} onClick={()=>setMoreButtonClick(true)}>More</button> : null}
      </div>
    </section>
  )
}

export default CompanyPage;