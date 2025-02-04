import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "motion/react"
import { useState } from "react";

const Section = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 60px 3.5vw;
  background: linear-gradient(45deg, #056877,#051828 );
  display: flex;
  align-items: center;
  justify-content: center;
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

  @media screen and (max-width: 768px){
    flex-basis: 80%;
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
    input[type='password'],
    input[type='text'] {
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

  a{
    font-size: ${props => props.theme.fontSize.m};
    text-decoration: underline;
    color: ${props => props.theme.color.pointColor};
  }
`;

const accountVariants = {
  hidden: { opacity: 0},
  visible: { opacity: 1},
}

function CreateAccount(){
  const [ isLogin, setIsLogin ] = useState(false);

  return (
    <Section>
      <LoginBox layoutId="loginBox" transition={{layout:{duration: 0.5}}} initial='hidden' animate='visible' variants={accountVariants}>
        <h2>계정을 생성해주세요</h2>
        <p>Disney 계정에 대한 내용을 입력해주세요.</p>
        <InputBox>
          <form>
            <input type="email" placeholder="이메일"/>
            <input type="password" placeholder="비밀번호"/>
            <input type="text" placeholder="닉네임"/>
            <input type="submit" value={isLogin ? 'Loading' : 'Log In'}/>
          </form>
          <span>Disney 계정이 있으신가요?</span>
          <Link to ="/login">Disney Login &rarr;</Link>
        </InputBox>
      </LoginBox>
    </Section>
  )
}

export default CreateAccount;