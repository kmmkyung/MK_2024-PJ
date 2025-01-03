import React from 'react'
import styled from'styled-components';

function Category() {
  return (
    <Container>
      <Wrap>
        <img src='/images/viewers-disney.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/disney.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-pixar.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/pixar.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-marvel.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/marvel.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-starwars.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/starWars.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-national.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/national-geographic.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap>
        <img src='/images/viewers-star.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/star.mp4' type='video/mp4'/>
        </video>
      </Wrap>
    </Container>
  )
}

export default Category;

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(6, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69% ) 0px 26px 30px -10px,
              rgb(0 0 0 / 73% ) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  img {
    inset: 0;
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 0.5s ease-in-out;
    z-index: 1;
  }

  video {
  width: 105%;
  height: 105%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80% ) 0px 40px 58px -16px,
                rgb(0 0 0 / 72% ) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`