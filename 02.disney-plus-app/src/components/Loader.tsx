import styled, { keyframes }from "styled-components";

const LoadCircleFrames = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadCircle = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: conic-gradient(from 0deg, transparent 35%, #fff, ${props => props.theme.color.pointColor} 70%);
  mask: radial-gradient(transparent 55%, #fff 56%);
  animation: ${LoadCircleFrames} 1s linear infinite;
`;

function Loader(){
  return (
  <LoadWrapper>
    <LoadCircle/>
  </LoadWrapper>
  )
}

export default Loader;