import styled from "styled-components";
import { IGetMovie } from "../type";
import { makeImagePath } from "../utils";

const RowMovieWrap = styled.div`
  padding: 0 3.5vw;
  margin: min(5vw,80px) 0;
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSize.m};
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
  title:string,
  movieData : IGetMovie,
}

function RowMovie({movieData, title}:RowMovieProps){
  const results = movieData.results;

  return (
    <RowMovieWrap>
      <Title>{title}</Title>
      <SliderContainer>
        <ArrowWrap className='arrow-left'>
          <span className='arrow' >{'<'}</span>
        </ArrowWrap>
        <Slider>
          { results.map( ele => { return (
            <SliderWrap key={ele.id}>
              <SliderPosterWrap>
                <Poster $bgPhoto={makeImagePath(ele.backdrop_path)} />
              </SliderPosterWrap>
              <SliderTitleWrap>
                <h6>{ ele.title }</h6>
              </SliderTitleWrap>
            </SliderWrap>
          )})}
        </Slider>
        <ArrowWrap className='arrow-right'>
          <span className='arrow' >{'>'}</span>
        </ArrowWrap>
      </SliderContainer>
    </RowMovieWrap>
  )
}

export default RowMovie;