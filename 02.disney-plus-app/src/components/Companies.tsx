import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px 3.5vw;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(6, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
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
function Companies(){
  const navigate = useNavigate();

  function handleNavigate(companyName:string){
    navigate(`/company/${companyName}`);
  }

  return (
    <Container>
      <Wrap onClick={()=> { handleNavigate('disney');}}>
        <img src='/images/viewers-disney.png' alt='disney'/>
        <video autoPlay muted loop>
          <source src='/videos/disney.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap onClick={()=> { handleNavigate('pixar');}}>
        <img src='/images/viewers-pixar.png' alt='pixar'/>
        <video autoPlay muted loop>
          <source src='/videos/pixar.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap onClick={()=> { handleNavigate('marvel');}}>
        <img src='/images/viewers-marvel.png' alt='marvel'/>
        <video autoPlay muted loop>
          <source src='/videos/marvel.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap onClick={()=> { handleNavigate('starWars');}}>
        <img src='/images/viewers-starWars.png' alt='starWars'/>
        <video autoPlay muted loop>
          <source src='/videos/starWars.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap onClick={()=> { handleNavigate('nationalGeographic');}}>
        <img src='/images/viewers-nationalGeographic.png' alt='nationalGeographic'/>
        <video autoPlay muted loop>
          <source src='/videos/nationalGeographic.mp4' type='video/mp4'/>
        </video>
      </Wrap>
      <Wrap onClick={()=> { handleNavigate('star');}}>
        <img src='/images/viewers-star.png' alt='star'/>
        <video autoPlay muted loop>
          <source src='/videos/star.mp4' type='video/mp4'/>
        </video>
      </Wrap>
    </Container>
  )
}

export default Companies;