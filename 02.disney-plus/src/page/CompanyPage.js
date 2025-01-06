import axiosInstance from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from'react-router-dom';
import '../css/CompanyPage.css';


function CompanyPage() {
  const { companyName } = useParams();
  const location = useLocation();
  const company = location.state.company
  
  // state
  let [ program, setProgram ] = useState();

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

  return (
    <section className='company__section'>
      <div className='company__container'>
        <div className='company__info'>
          <div className='info__wrap--bg' >
            <video className='info__video' autoPlay muted loop>
              <source src={company.video} type='video/mp4'/>
            </video>
            <div className='info__bgImg' style={{'backgroundImage':`url(${company.backgroundImg})`}}></div>
          </div>
          <div className='info__wrap--logo'>
            <img className='info__logo' src={company.logo} alt=''/>
          </div>
        </div>
        <div className='company__content'>
        </div>
      </div>
      <div className='company__bg'></div>
    </section>
  )
}

export default CompanyPage;