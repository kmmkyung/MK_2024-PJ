import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "motion/react"
import { browserLocalPersistence, browserSessionPersistence, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { useRecoilState } from "recoil";
import { userDataState } from "../atoms";

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
  box-sizing: border-box;

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
  box-sizing: border-box;

  h2 {
    font-size: ${props => props.theme.fontSize.l};
  }

  >p {
    font-size: ${props => props.theme.fontSize.m};
  }
`;

const InputBox = styled.div`
  form{
    width: 100%;
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

const ErrorMessage = styled.p`
  text-align: center;
  color: tomato;
  font-size: ${props => props.theme.fontSize.m};
  margin-top: 10px;
`;

const accountVariants = {
  leftHidden: { opacity: 0, x: 100},
  rightHidden: { opacity: 0, x: -100},
  visible: { opacity: 1, x: 0, transition:{duration:1}}
}

function Login(){
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ isError, setIsError ] = useState('');
  const [ userData, setUserData ] = useRecoilState(userDataState)
  const errors: { [key: string]: string }[] = [
    {"auth/invalid-credential" : '이메일 / 비밀번호를 확인해주세요'},
    {"auth/account-exists-with-different-credential" : '이미 다른 방식으로 가입된 계정입니다. 해당 로그인 방법을 사용하세요.'}
  ]

  function onChange(event: React.ChangeEvent<HTMLInputElement>){
    const {target:{name,value}} = event;
      if(name === 'email'){
      setEmail(value);
    }
    else if(name === 'password'){
      setPassword(value);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setIsError('');
    if(isLoading ||  email === '' || password === '') return;
    try {
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUserData({
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || ''
      })
      navigate('/')
    }
    catch(error:any) {
      if(error instanceof FirebaseError){
        const findError = errors.find(err => Object.keys(err)[0] === error.code);
        if (findError) {
          setIsError(Object.values(findError)[0]);
        }
        setIsLoading(false)
      }
    }
    finally{
      setIsLoading(false)
    }
  }

  async function githubLogin(){
    const githubProvider = new GithubAuthProvider();
    try{
      const result = await signInWithPopup(auth,githubProvider)
      setUserData({
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || ''
      })
      navigate('/');
    }
    catch (error: any) {
      if (error instanceof FirebaseError){
      const errorMessage = errors.find((err)=> Object.keys(err)[0] === error.code )!
      errorMessage ? setIsError(Object.values(errorMessage)[0]) : setIsError("GitHub 로그인 중 오류가 발생했습니다.");
      }
    }
  }

  // async function googleLogin() {
  //   const googleProvider = new GoogleAuthProvider();
  //   try {
  //       const result = await signInWithPopup(auth, googleProvider);
  //       setUserData({
  //         displayName: result.user.displayName || '',
  //         photoURL: result.user.photoURL || '',
  //       });
  //       navigate('/');
  //   } catch (error: any) {
  //     if (error instanceof FirebaseError) {
  //       const errorMessage = errors.find((err) => Object.keys(err)[0] === error.code);
  //       errorMessage
  //         ? setIsError(Object.values(errorMessage)[0])
  //         : setIsError("Google 로그인 중 오류가 발생했습니다.");
  //     }
  //   }
  // }
  

  return (
    <Section>
      <Logo initial='leftHidden' animate='visible' variants={accountVariants}  src="/svg/disney-white.svg"/>
      <LoginBox layoutId="loginBox" initial='rightHidden' animate='visible' variants={accountVariants} transition={{ease:'linear', layout:{duration: 0.5}}}  >
        <h2>이메일을 입력하세요</h2>
        <p>Disney 계정으로 디즈니+에 로그인하세요.</p>
        <InputBox>
          <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="이메일" value={email} required onChange={onChange}/>
            <input name='password' type="password" placeholder="비밀번호" value={password} required onChange={onChange}/>
            <input type="submit" value={isLoading ? 'Loading' : 'Log In'}/>
          </form>
          {isError !== '' ? <ErrorMessage>{isError}</ErrorMessage> : null }
          <span>아직 Disney 계정이 없으신가요?</span>
          <Link to={'/createAccount'}>Create Disney &rarr;</Link>
        </InputBox>
        <OtherLogin>
          {/* <button className="googleBtn" onClick={googleLogin}>
            <img src="/svg/google-logo.svg" alt="google" />
            <span>Google 계정으로 로그인</span>
          </button> */}
          <button className="githubBtn" onClick={githubLogin}>
            <img src="/svg/github-logo.svg" alt="github" />
            <span>Github 계정으로 로그인</span>
          </button>
        </OtherLogin>
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
      </LoginBox>
    </Section>
  )
}

export default Login;