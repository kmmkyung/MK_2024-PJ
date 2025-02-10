import styled from "styled-components";
import { IMovie } from "../type";
import { makeImagePath } from "../utils";
import { useRef, useState } from "react";
import MovieModal from "./MovieModal";

const RowMovieWrap = styled.div`
  padding: 0 3.5vw;
  margin: min(5vw,80px) 0;
  
  &:last-child{
    margin: 0;
  }
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSize.l};
  color: #fff;
`;

const SliderContainerEl = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const ArrowWrap = styled.div`
  background-clip: content-box;
  cursor: pointer;
  width: 80px;
  height: calc(100% - 40px);
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  transition: all 0.4s ease-in-out;

  &:hover {
    background: rgba(20, 20, 20, 0.5);

    .arrow {
      transform: scale(1.4);
    }
  }

  &.arrow-left {
    top: 20px;
    left: 0;
  }

  &.arrow-right {
    top: 20px;
    right: 0;
  }

  .arrow {
    padding: 15px;
    transition: all 0.4s ease-in-out;
    color: #fff;
    font-size: ${props => props.theme.fontSize.m};
  }
`;

const Slider = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  gap: min(2.5vw, 25px);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SliderWrap = styled.div`
  display: grid;
`;

const SliderPosterWrap = styled.div`
  aspect-ratio: 1 / 0.57;
  width: min(40vw,350px);
  box-sizing: border-box;
  border: 3px solid rgba(249, 249, 249, 0);
  border-radius: 10px;
  transition: all 0.6s;
  cursor: pointer;
  overflow: hidden;

  &:hover{
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Poster = styled.div<{$bgPhoto:string}>`
  background-image: url(${props => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const SliderTitleWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 14px;
  color: #fff;

  h6 {
    font-size: ${props => props.theme.fontSize.m};
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const SliderContainer = styled(SliderContainerEl)`
  &:hover ${ArrowWrap} {
    visibility: visible;
  }
`;

interface RowMovieProps {
  title:string;
  movieData : IMovie[];
  id: string;
  mediaType?: string;
}

function RowMovie({movieData, title, id, mediaType}:RowMovieProps){
  let sliderRef = useRef<HTMLDivElement>(null);
  let touchStartX = useRef(0); // 터치 시작 위치
  let [ modalOpen, setModalOpen ] = useState(false); // 모달
  let [ movieSelected, setMovieSelected ] = useState<IMovie>(); // 선택된 영화

  // function
  // 클릭 이벤트 슬라이드 이동
  function slideClickMove(direction: string) {
    const slider = sliderRef.current;
    if (slider && direction === "right" && slider.scrollWidth - slider.scrollLeft > slider.clientWidth) {
      const sliderMove = slider.offsetWidth / 1.5;
      slider.scrollBy({ left: sliderMove, behavior: "smooth" });
    } else if (slider && direction === "left" && slider.scrollLeft > 0) {
      const sliderMove = -slider.offsetWidth / 1.5;
      slider.scrollBy({ left: sliderMove, behavior: "smooth" });
    }
  }
  // 터치 이벤트
  function slideTouchStart(event:React.TouchEvent<HTMLDivElement>){
    touchStartX.current = event.targetTouches[0].clientX
  };
  function slideTouchEnd(event:React.TouchEvent<HTMLDivElement>){
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    const slider = sliderRef.current;
    if (slider && diffX > 100  && slider.scrollWidth - slider.scrollLeft > slider.clientWidth ) {
      slider.scrollBy({ left: slider.offsetWidth/1.5, behavior: "smooth" });
    } else if (slider && diffX < -100  && slider.scrollLeft > 0 ) {
      slider.scrollBy({ left: -slider.offsetWidth/1.5, behavior: "smooth" });
    }
  };

  function movieModalOpen(movie:IMovie){
    const bodyEl = document.querySelector('body') as HTMLHeadElement
    if(bodyEl){
      bodyEl.style.overflow = 'hidden'
    }
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <RowMovieWrap id={id}>
      <Title>{title}</Title>
      <SliderContainer>
        <ArrowWrap className='arrow-left'>
          <span onClick={()=>slideClickMove('left')} className='arrow' >{'<'}</span>
        </ArrowWrap>
        <Slider ref={sliderRef} onTouchStart={slideTouchStart} onTouchEnd={slideTouchEnd} >
          { movieData?.map( ele => { return (
            <SliderWrap key={ele.id}>
              <SliderPosterWrap>
                <Poster $bgPhoto={makeImagePath(ele.backdrop_path)} onClick={()=>movieModalOpen(ele)} />
              </SliderPosterWrap>
              <SliderTitleWrap>
                <h6>{ ele.title || ele.name }</h6>
              </SliderTitleWrap>
            </SliderWrap>
          )})}
        </Slider>
        <ArrowWrap className='arrow-right'>
          <span onClick={()=>slideClickMove('right')} className='arrow' >{'>'}</span>
        </ArrowWrap>
      </SliderContainer>
      {modalOpen && movieSelected ? <MovieModal setModalOpen={setModalOpen} mediaType={mediaType} movieSelected={movieSelected}></MovieModal> : null}
    </RowMovieWrap>
  )
}

export default RowMovie;