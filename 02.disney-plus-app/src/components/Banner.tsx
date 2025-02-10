import styled from "styled-components";

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { makeImagePath } from "../utils";
import { IMovie } from "../type";
import { useNavigate } from "react-router-dom";


const BannerContainerEL = styled.div `
  width: 100%;
  aspect-ratio: 1/0.28;
  padding-bottom: 40px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    aspect-ratio: 1/0.5;
  }

  .swiper{
    width: 100%;
    height: 100%;
    overflow: visible !important;
  }

  .swiper-slide {
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px, rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;
  border-radius: 20px;
  overflow: hidden; 
  background-position: center;
  transition: all 0.6s;
  position: relative;
  }

  .swiper-slide::after {
  content: '';
  position: absolute;
  border-radius: 20px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  box-sizing: border-box;
  transition: all 0.4s;
  }

  .swiper-slide:hover::after{
    border: 3px solid rgba(255, 255, 255, 0.8);
  } 

  .swiper-pagination {
    bottom: -28px !important;
  }

  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5);
  }

  .swiper-pagination-bullet.swiper-pagination-bullet-active{
    background: #fff;
  }

  .swiper-button-prev {
    color: transparent !important;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0));
    height: 100%;
    top: 0;
    margin: 0;
    left: 0;
    width: 8vw;
    transition: all 0.4s;
  }

  .swiper-button-next {
    color: transparent !important;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    height: 100%;
    top: 0;
    right: 0;
    margin: 0;
    width: 8vw;
    transition: all 0.4s;
  }

  .swiper-button-prev:hover, .swiper-button-next:hover {
    color: #fff !important;
  }

  .swiper-button-prev:after, .swiper-button-next:after {
    font-size: ${props=> props.theme.fontSize.l} !important;
  }
`;

const SlideItem= styled.div<{$bgPhoto: string;}>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
  padding: min(5vw,80px);
  box-sizing: border-box;
  background-image: radial-gradient(farthest-side at 65% 25%, transparent, rgba(26, 29, 41, 0.3)),url(${props => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  background-size: 124%;
  transition: all 0.6s;
`;

const BannerContainer = styled(BannerContainerEL)`
  .swiper-slide.swiper-slide-active{
    ${SlideItem}{
      background-size: 110%;
    }
  }
`;


const BannerWrap  = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px){
    justify-content: end;
  }
`;

const BannerTitle  = styled.h2`
  font-size: ${props=> props.theme.fontSize.xl};
  color: #fff;
`;

const BannerOverview  = styled.p`
  width: 600px;
  color: #fff;
  line-height: 1.3;
  font-size: ${props=> props.theme.fontSize.m};
  max-width: 500px;
  margin-top: 1.4rem;

  word-break: keep-all;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 768px){
    display: none;
  }
`;

interface BannerProps {
  bannerMovieData : IMovie[];
}

function Banner({bannerMovieData}:BannerProps) {
  const navigate = useNavigate();

  function detailPageMove(ele:IMovie){
    navigate(`/detail/${ele.id}`,{state: {data:{...ele, media_type:'movie'}}});
  }

  
  return (
    (<BannerContainer>
      {bannerMovieData ?
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {slidesPerView:1.3, spaceBetween: 50, centeredSlides:true }
        }}>
        {bannerMovieData?.map(function(ele){ 
          return <SwiperSlide key={ele.id} onClick={()=>detailPageMove(ele)}>
            <SlideItem $bgPhoto={makeImagePath(ele.backdrop_path)}>
              <BannerWrap>
                <BannerTitle>{ele.title}</BannerTitle>
                <BannerOverview>{ele.overview}</BannerOverview>
              </BannerWrap>
            </SlideItem>
          </SwiperSlide>
        })}
      </Swiper>
    : null}
    </BannerContainer>)
  )
}

export default Banner;