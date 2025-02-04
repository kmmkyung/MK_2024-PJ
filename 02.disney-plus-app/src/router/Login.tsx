import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "motion/react"

const Section = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 60px 3.5vw;
  background: linear-gradient(45deg, #056877,#051828 );
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  
  @media screen and (max-width: 768px){
    flex-direction: column;
  }
`;

const Logo = styled(motion.img)`
  flex-basis: 50%;
  height: clamp(80px, 10vw, 300px);
`;

const LoginBox = styled(motion.div)`
  background: #ffffff;
  padding: 40px 3.5vw;
  border-radius: 30px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: ${props => props.theme.fontSize.l};
  }

  >p {
    font-size: ${props => props.theme.fontSize.m};
  }
`;

const InputBox = styled.div`
  form{
    display: flex;
    flex-direction: column;
    gap: 20px;

    input {
      width: 100%;
      border: none;
      padding: 20px;
      font-size: ${props => props.theme.fontSize.m};
    }

    input:active{
      border: none;
    }

    input[type='email'],
    input[type='password'] {
      border-bottom: 1px solid #000;
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    input[type='submit'] {
      background-color: #000;
      color: #fff;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.4s;
    }

    input[type='submit']:hover{
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  span {
    display: inline-block;
    margin-top: 20px;
    margin-right: 5px;
    font-size: ${props => props.theme.fontSize.m};
  }

  a {
    font-size: ${props => props.theme.fontSize.m};
    text-decoration: underline;
    color: ${props => props.theme.color.pointColor};
  }
`;

const OtherLogin = styled.div`
  button {
    width: 100%;
    background-color: #fff;
    border: 1px solid #aaa;
    display: flex;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s;
    font-size: ${props => props.theme.fontSize.m};

    &:hover{
      border: 1px solid #000;
    }

    img {
      width: 20px;
    }
  }

  button:last-child {
      margin-top: 10px;
  }
`;

const CaptionBox = styled.div`
  font-size: ${props => props.theme.fontSize.s};
  
  p {
    margin-top: 10px;
  }
`;

const CaptionLogo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  img {
    height: 30px;
  }
`;

const accountVariants = {
  leftHidden: { opacity: 0, x: 100},
  rightHidden: { opacity: 0, x: -100},
  visible: { opacity: 1, x: 0, transition:{duration:1}}
}

function Login(){
  const [ isLogin, setIsLogin ] = useState(false);

  return (
    <Section>
      <Logo initial='leftHidden' animate='visible' variants={accountVariants}  src="/svg/disney-white.svg"/>
      <LoginBox layoutId="loginBox" initial='rightHidden' animate='visible' variants={accountVariants} transition={{ease:'linear', layout:{duration: 0.5}}}  >
        <h2>이메일을 입력하세요</h2>
        <p>Disney 계정으로 디즈니+에 로그인하세요.</p>
        <InputBox>
          <form>
            <input type="email" placeholder="이메일"/>
            <input type="password" placeholder="비밀번호"/>
            <input type="submit" value={isLogin ? 'Loading' : 'Log In'}/>
          </form>
          <span>아직 Disney 계정이 없으신가요?</span>
          <Link to={'/createAccount'}>Create Disney &rarr;</Link>
        </InputBox>
        <OtherLogin>
          <button className="googleBtn">
            <img src="/svg/google-logo.svg" alt="google" />
            <span>Google 계정으로 로그인</span>
          </button>
          <button className="githubBtn">
            <img src="/svg/github-logo.svg" alt="github" />
            <span>Github 계정으로 로그인</span>
          </button>
        </OtherLogin>
        <CaptionBox>
          <h6>디즈니+는 The Walt Disney Family of Companies의 계열사입니다</h6>
          <p>MyDisney 계정으로 디즈니+, ESPN, Walt Disney World, 기타 다른 서비스 등 The Walt Disney Family of Companies의 다양한 서비스에 간편하게 로그인해 보세요.</p>
          <CaptionLogo>
            <img src="/svg/login-disney.svg" alt="disney" />
            <img src="/svg/login-abc.svg" alt="abc" />
            <img src="/svg/login-espn.svg" alt="espn" />
            <img src="/svg/login-marvel.svg" alt="marvel" />
            <img src="/svg/login-starwars.svg" alt="starwars" />
            <img src="/svg/login-hulu.svg" alt="hulu" />
            <img src="/svg/login-netgeo.svg" alt="netgeo" />
            <img src="/svg/login-starplus.svg" alt="starplus" />
          </CaptionLogo>
        </CaptionBox>
      </LoginBox>
    </Section>
  )
}

export default Login;