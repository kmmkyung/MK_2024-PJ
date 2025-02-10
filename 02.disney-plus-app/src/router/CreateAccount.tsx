import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "motion/react"
import { useState } from "react";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

const Section = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 60px 3.5vw;
  background: linear-gradient(45deg, #056877,#051828 );
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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
      box-sizing: border-box;
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

const ErrorMessage = styled.p`
  text-align: center;
  color: tomato;
  font-size: ${props => props.theme.fontSize.m};
  margin-top: 10px;
`;

const accountVariants = {
  hidden: { opacity: 0},
  visible: { opacity: 1},
}

function CreateAccount(){
  const navigate = useNavigate();
  const [ isLogin, setIsLogin ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ isError, setIsError ] = useState('');
  const errors = [
    {"Firebase: Error (auth/email-already-in-use)." : '이미 존재하는 이메일입니다'},
    {"Firebase: Password should be at least 6 characters (auth/weak-password)." : '비밀번호를 6자리 이상 입력해주세요'},
    {"Firebase: Error (auth/invalid-email)." : '정확한 이메일을 입력해 주세요'},
  ];

  function onChange(event:React.ChangeEvent<HTMLInputElement>){
    const { target:{name, value} } = event;
    if(name === 'name'){
      setName(value);
    }
    else if(name === 'password'){
      setPassword(value)
    }
    else if(name === 'email'){
      setEmail(value)
    }
  }

  async function createAccount(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    setIsError('')
    if(isLogin || name === '' || email === '' || password === '') return;
    try {
      setIsLogin(true)
      const credentials = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credentials.user, {
        displayName: name
      })
      navigate('/')
    }
    catch(error:any) {
      if(error instanceof FirebaseError){
        const findError = errors.find(err => Object.keys(err)[0] === error.message);
        if (findError) {
          setIsError(Object.values(findError)[0]);
        }
        setIsLogin(false)
      }
    }
    finally{
      setIsLogin(false)
    }
  }

  return (
    <Section>
      <LoginBox layoutId="loginBox" transition={{layout:{duration: 0.5}}} initial='hidden' animate='visible' variants={accountVariants}>
        <h2>계정을 생성해주세요</h2>
        <p>Disney 계정에 대한 내용을 입력해주세요.</p>
        <InputBox>
          <form onSubmit={createAccount}>
            <input name="email" type="email" placeholder="이메일" value={email} onChange={onChange} required/>
            <input name='password' type="password" placeholder="비밀번호" value={password} onChange={onChange} required/>
            <input name="name" type="text" placeholder="닉네임" value={name} onChange={onChange} required/>
            <input type="submit" value={isLogin ? 'Loading' : '계정 생성하기'}/>
          </form>
          {isError !== '' ? <ErrorMessage>{isError}</ErrorMessage> : null }
          <span>Disney 계정이 있으신가요?</span>
          <Link to ="/login">Disney Login &rarr;</Link>
        </InputBox>
      </LoginBox>
    </Section>
  )
}

export default CreateAccount;