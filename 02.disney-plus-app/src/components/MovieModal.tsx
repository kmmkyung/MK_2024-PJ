import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import { makeImagePath } from '../utils';
import { IMovie } from '../type';

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const ModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  padding: calc(100% - 15vw);
`;

const fadeInKeyFrames = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeOutKeyFrames = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 15vw);
  max-width: 600px;
  height: 100%;
  max-height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 5px 8px 0px rgba(0,0,0,0.14),
              0px 1px 14px 0px rgba(0,0,0,0.12);
  background: #1A1D29;
  border-radius: 40px;
  overflow: hidden;

  &.fadeIn {
    animation: ${fadeInKeyFrames} 0.4s ease-in-out forwards;
  }

  &.fadeOut {
    animation: ${fadeOutKeyFrames} 0.4s ease-in-out forwards;
  }
`;

const ModalImgWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/0.6;

  &::after {
    content: '';
    position: absolute;
    bottom: -15%;
    left: 0;
    right: 0;
    background: linear-gradient(180deg,
    rgba(26, 29, 41, 1) 0%,
    rgba(26, 29, 41, 1) 50%,
    rgba(26, 29, 41, 0) 75%,
    rgba(26, 29, 41, 0) 100%);
    width: 100%;
    height: 15%;
  }
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: ${props => props.theme.fontSize.m};
  border-radius: 50%;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 5px 8px 0px rgba(0,0,0,0.14),
              0px 1px 14px 0px rgba(0,0,0,0.12);
  transition: all 0.4s;

  &:hover{
    background-color: rgba(255, 255, 255, 0.6);
    color: #fff;
  }
`;

const ModalPoster = styled.div<{$bgPhoto:string}>`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => props.$bgPhoto});
`;

const ModalDetailBtn = styled.button`
  position: absolute;
  border: none;
  cursor: pointer;
  bottom: 20px;
  left: 20px;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: #000;
  font-size: ${props => props.theme.fontSize.s};
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 5px 8px 0px rgba(0,0,0,0.14),
              0px 1px 14px 0px rgba(0,0,0,0.12);
  transition: all 0.4s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
    color: #fff;
  }
`;

const ModalContentWrap = styled.div`
  height: 100%;
  padding: 40px;
  color: #fff;
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentRelease = styled.p`
  font-size: ${props => props.theme.fontSize.s};
  color: #fff;
`;

const ContentTitle = styled.h2`
  margin: 16px 0;
  font-size: ${props => props.theme.fontSize.l};
  color: #fff;
`;

const ContentRating = styled.p`
  font-size: ${props => props.theme.fontSize.s};
  color: #fff;
`;

const ContentOverview = styled.p`
  font-size: ${props => props.theme.fontSize.m};
  color: #fff;
  line-height: 1.8;
  margin-top: 10px;
`;

interface MovieModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  movieSelected: IMovie;
  mediaType?: string;
}

function MovieModal({setModalOpen, movieSelected, mediaType}: MovieModalProps){
  const navigate = useNavigate()
  const refModalBg = useRef<HTMLDivElement>(null);
  const [ modalClosing, setModalClosing ] = useState(false);
  const bodyEl = document.querySelector('body') as HTMLHeadElement

  function modalClose(){
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      if(bodyEl){
        bodyEl.style.overflow = 'auto'
      }
    }, 450);
  }

  function movieDetailPage(){
    if(bodyEl){ bodyEl.style.overflow = 'auto' }
    if(mediaType){
      navigate(`/detail/${movieSelected.id}`,{ state: { data: {...movieSelected, media_type: mediaType} }})
    }
    else{
      navigate(`/detail/${movieSelected.id}`,{ state: { data: movieSelected }})
    }
  }

  return (
    <ModalContainer>
      <ModalBg ref={refModalBg} onClick={modalClose} onTouchStart={modalClose}></ModalBg>
      <Modal className={modalClosing? 'fadeOut':'fadeIn'}>
        <ModalImgWrap>
          <ModalCloseBtn onClick={modalClose}>X</ModalCloseBtn>
          <ModalPoster $bgPhoto={makeImagePath(movieSelected.backdrop_path)}></ModalPoster>
          <ModalDetailBtn onClick={movieDetailPage}>► 자세히 보기</ModalDetailBtn>
        </ModalImgWrap>
        <ModalContentWrap>
          <ContentRelease>
            {movieSelected.release_date? movieSelected.release_date : movieSelected.first_air_date}
          </ContentRelease>
          <ContentTitle>
            {movieSelected.title? movieSelected.title : movieSelected.name}
          </ContentTitle>
          <ContentRating>평점: {movieSelected.vote_average}</ContentRating>
          <ContentOverview>{movieSelected.overview}</ContentOverview>
        </ModalContentWrap>
      </Modal>
    </ModalContainer>
  )
}

export default MovieModal;