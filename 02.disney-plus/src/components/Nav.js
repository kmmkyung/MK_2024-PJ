import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from'styled-components'

function Nav({searchResults, isSearchActive, setIsSearchActive}) {
  // state
  const [ isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [ searchValue, setSearchValue ] = useState('');
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  // effect
  // 검색어 갱신되면 검색창 상태 초기화
  useEffect(() => {
      document.querySelector('.shadow')?.classList.add('searchEnd');
      document.querySelector('body').style.overflow = 'auto';
      window.scrollTo(0, 0);
      setIsHeaderVisible(false)
  }, [searchResults]);

  // 검색창 닫힘 + 검색내용 없음 + search 페이지일 경우 main으로 이동 
  useEffect(() => {
    if (!isSearchActive && !searchValue && window.location.pathname === '/search') {
      setIsHeaderVisible(false)
      navigate(`/main`);
    }
  }, [isSearchActive, searchValue, navigate]);

  // 스크롤시 nav 배경색 바꿈
  useEffect(()=>{
    function handleScroll(){
      if(window.scrollY > 200 && !isSearchActive ){ setIsHeaderVisible(true); }
      else{ setIsHeaderVisible(false); }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () =>{ // 컴포넌트 언마운트 시 이벤트 제거
      window.removeEventListener('scroll', handleScroll);
    }
  },[isSearchActive]);

  // function
  function handleSearchIconClick(){
    setIsSearchActive(true);
    setSearchValue('');
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.shadow').classList.remove('searchEnd');
    setTimeout(() => {
      document.querySelector('.search__input').focus();
    }, 1000);
  }

  function handleCloseIconClick(){
    setIsSearchActive(false);
    document.querySelector('body').style.overflow = 'auto'
    setSearchValue('')
  }

  function inputValue(event) {
    if (event.target.value) {
      setSearchValue(event.target.value);
      navigate(`/search?movieTitle=${event.target.value}`);
    } else {
      setSearchValue('');
      navigate(`/search`);
      document.querySelector('.shadow').classList.remove('searchEnd');
    }
  }

  if(pathName === "/" ){
  return (
    <Header $isHeaderVisible={isHeaderVisible}>
      <div className='header__wrap'>
        <Menu>
          <div className='menu__logo' onClick={()=>{navigate("/main")}}></div>
          <Login>Login</Login>
        </Menu>
      </div>
    </Header>
    )
  }
  else {
    return (
    <Header $isHeaderVisible={isHeaderVisible} $search={Search} className={isSearchActive ? "on" : ""}>
      <div className='header__wrap'>
      <Menu>
        <div className='menu__logo' onClick={()=>{navigate("/main")}}></div>
        <div className='menu__search--icon' onClick={()=>handleSearchIconClick()}>검색</div>
      </Menu>
      <Search>
        <div className='shadow' onClick={()=>handleCloseIconClick()}></div>
        <div className='search__wrap'>
          <div className='search__icon--search'></div>
          <input className='search__input' type='text' placeholder='영화를 검색해 주세요' value={searchValue} onChange={inputValue}></input>
          <div className="search__icon--close" onClick={()=>handleCloseIconClick()}></div>
        </div>
      </Search>
      </div>
    </Header>
    )
  }
}

export default Nav;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props =>  props.$isHeaderVisible ? "#090b13" : "transparent"};
  z-index: 5;
  transition: background-color 0.3s;

  .header__wrap{
    margin: 0 calc(3.5vw + 5px);
    position: relative;
    height: 100%;
  }

  .menu__left {
  
  }

  .menu__logo {
    width: 80px;
    height: 70px;
    background-image: url(/svg/logo.svg);
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.2s 0.2s;
    cursor: pointer;
  }

  &.on {
    background-color: #090b13;

    ${props => props.$search}{
        transition-delay: 0.4s;
        opacity: 1;
        visibility: visible;
      }
      
      .menu__logo {
      opacity: 0;
      }

      .menu__search--icon {
        opacity: 0;
      }

      .search__icon--search,
      .search__input {
        transition-delay: 0.2s;
        transform: translate(0, 0);
      }
  }
`;

const Menu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .menu__search--icon{
    width: 10px;
    height: 10px;
    padding: 20px;
    background-image: url(/svg/search.svg);
    background-repeat: no-repeat;
    background-position: center;
    text-indent: -9999px;
    transition: all 0.2s;
    cursor: pointer;
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

const Search = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition: all .4s;
  visibility: hidden;
  opacity: 0;

  .shadow {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.4s;

    &.searchEnd {
      opacity: 0;
      visibility: hidden;
    }
  }

  .search__wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: relative;
    }

    .search__icon--search{
      width: 10px;
      height: 10px;
      padding: 20px;
      background-image: url(/svg/search.svg);
      background-repeat: no-repeat;
      background-position: center;
      transition: all 0.6s;
      transform: translate(10vw, 0);
    }
  
    .search__input {
      padding: 0 20px;
      border: none;
      outline: none;
      box-sizing: border-box;
      background-color: transparent;
      color: #fff;
      width: 100%;
      height: 80%;
      transition: all 0.6s;
      transform: translate(10vw, 0);
      font-size: clamp(1.4rem, 2vw, 1.6rem);
    }
  
    .search__icon--close {
      width: 10px;
      height: 10px;
      padding: 20px;
      background-image: url(/svg/close.svg);
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
`
;
