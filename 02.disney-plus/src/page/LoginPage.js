import React from "react";
import styled from'styled-components';

function LoginPage(){
  return (
    <Container>
      <Content>
        <Center>
          <LogoOne src="/svg/login-logo1.svg" alt="logo" />
          <Description>
          Welcome to Disney Plus<br/>
          Sign in to access your favorite shows and movies.
          </Description>
          <LogoTwo src="/images/login-logo2.png"  alt="logo"/>
        </Center>
      </Content>
    </Container>
  )
}

export default LoginPage;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  background: url('/images/login-background.jpg') center no-repeat;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  text-align: center;
`;

const LogoOne = styled.img`
  display: inline-block;
  width: 100%;
  vertical-align: middle; 
`;

const Description = styled.p`
  margin: 20px 0;
  letter-spacing: 1.5px;
  width: 100%;
  font-size: clamp(1.2rem, 1vw, 1.4rem);
`;

const LogoTwo = styled.img`
  display: inline-block;
  width: 100%;
  vertical-align: middle;
`