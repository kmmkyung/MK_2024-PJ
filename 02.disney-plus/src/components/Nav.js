import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from'styled-components'

function Nav() {
  // state
  let [show, setShow]= useState(false);
  let [ searchValue, setSearchValue ] = useState('');
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  // effect
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return () =>{ // 컴포넌트 언마운트 시 이벤트 제거
      window.removeEventListener('scroll', handleScroll);
    }
  },[]);

  // function
  function handleScroll(){
    if(window.scrollY > 50){ setShow(true); }
    else{ setShow(false); }
  }

  function handleInputValue(event){
    if(event.target.value){
      setSearchValue(event.target.value);
      navigate(`/search?movieTitle=${event.target.value}`)
    }
    else{
      navigate(`/main`);
      setSearchValue('');
    }
  }

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img alt='Disney Plus Logo' src='/images/logo.svg' onClick={()=>{window.location.href="/"}}/>
      </Logo>
      { pathName === "/" ? <Login>Login</Login> :
                            <Input className='nav__input' type='text' placeholder='영화를 검색해 주세요' value={searchValue} onChange={handleInputValue}></Input> }
    </NavWrapper>
  )
}

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props =>  props.$show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img{  
    display: block;
    width: 100%;
  }
`

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease;

  &:hover{
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`

const Input = styled.input`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(0,0,0);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
  max-width: 300px;
  width: 100%;

  &:focus {
    outline: none;
  }
`
;