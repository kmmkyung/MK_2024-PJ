import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isSearchIngState, searchKeywordState, searchKeyWordResultsState } from "../atoms";
import { auth } from "../firebase";

type navType = {
  $navColor: boolean;
}

const HeaderEl = styled.header<navType>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${props =>  props.$navColor ? props.theme.color.headerColor : "transparent"};
  z-index: 5;
  transition: background-color 0.3s;
`;

const HeaderWrap = styled.div`
  margin: 0 20px;
  position: relative;
  height: 100%;
`;

const Menu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const MenuLogo = styled.div`
  width: 80px;
  height: 70px;
  background-image: url('/svg/disney-color.svg');
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.2s 0.2s;
  cursor: pointer;
`;

const MenuRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuSearch = styled.div`
  width: 10px;
  height: 10px;
  padding: 20px;
  background-image: url('/svg/search.svg');
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.2s;
  cursor: pointer;
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 10px;
`

const DropDown = styled.div`
  position: absolute;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0;
  letter-spacing: 2px;
  top: 50px;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%);
  box-sizing: border-box;
  text-align: center;
  background-color: #000;
  width: min(10vw, 100px);
  opacity: 0;
  transition: all 0.4s 0.2s;
  visibility: hidden;
  font-size: 1.0rem;
  
  @media (max-width: 480px){
    width: 100%;
  }
`

const UserWarp = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${DropDown} {
    opacity: 1;
    visibility: visible;
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
`;

const SearchShadow = styled.div`
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
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
`;

const SearchIcon  = styled.div`
  width: 10px;
  height: 10px;
  padding: 20px;
  transition: all 0.6s;
  transform: translate(10vw, 0);
  background-image: url('/svg/search.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

const SearchInput  = styled.input`
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
  font-size: ${props => props.theme.fontSize.m};
`;

const CloseIcon = styled.div`
  width: 10px;
  height: 10px;
  padding: 20px;
  cursor: pointer;
  margin-right: 60px;
  background-image: url('/svg/close.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

const HeaderElClass = styled(HeaderEl)`
  &.searchOn {
    background-color: #090b13;
    
    ${Search}{
      transition-delay: 0.4s;
      opacity: 1;
      visibility: visible;
    }
    
    ${MenuLogo} {
    opacity: 0;
    }

    ${MenuSearch} {
      opacity: 0;
    }

    ${SearchIcon},
    ${SearchInput} {
      transition-delay: 0.2s;
      transform: translate(0, 0);
    }
  }
`;

function Header(){
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const searchInput = useRef<HTMLInputElement>(null);
  const searchShadow = useRef<HTMLDivElement>(null);
  const [ isSearching, setIsSearching ] = useRecoilState(isSearchIngState);
  const [ searchKeyword, setSearchKeyword ] = useRecoilState(searchKeywordState);
  const searchKeyWordResults  = useRecoilValue(searchKeyWordResultsState);
  const [ isNavVisible, setIsNavVisible] = useState(false);

  // 스크롤시 nav 배경색 바꿈
  useEffect(()=>{
    function handleScroll(){
      if(window.scrollY > 200){ setIsNavVisible(true); }
      else{ setIsNavVisible(false); }
    }
    window.addEventListener('scroll', handleScroll)

    return () =>{ // 컴포넌트 언마운트 시 이벤트 제거
      window.removeEventListener('scroll', handleScroll);
    }
  },[]);

  // function
  const bodyEl = document.querySelector('body') as HTMLHeadElement

  function searchIconClick(){
    setIsSearching(true);
    setSearchKeyword('');
    if(bodyEl){
      bodyEl.style.overflow = 'hidden'
    }
    setTimeout(() => {
      if (searchInput.current) {
        searchInput.current.focus();
      }
    }, 1000);
  }

  function noSearching(){
    setIsSearching(false);
    setSearchKeyword('');
    if(bodyEl){
      bodyEl.style.overflow = 'auto'
    }
  }

  function programSearching(event:React.ChangeEvent<HTMLInputElement>){
    if(event.currentTarget.value){
      searchShadow.current?.classList.remove('searchEnd')
      setSearchKeyword(event.currentTarget.value);
      navigate(`/search?searchKeyWord=${event.currentTarget.value}`);
    }
    else{
      setSearchKeyword('');
      navigate(`/search`);
    }
  }

  // userLogout
  function userLogout(){
    auth.signOut();
    navigate('/login');
  }

  // 검색어 갱신되면 검색화면, 검색창 상태 초기화
  useEffect(()=>{
    searchShadow.current?.classList.add('searchEnd')
    if(bodyEl){ bodyEl.style.overflow = 'auto'}
    window.scrollTo(0, 0);
  },[searchKeyWordResults, bodyEl])

  // 검색창 닫힘 + 검색어 없음 + search 페이지일 경우 main으로 이동 
  useEffect(()=>{
    if(!isSearching && !searchKeyword && pathName === '/search'){
      navigate(`/`);
    }
  },[isSearching, pathName, navigate, searchKeyword])

  return (
    <HeaderElClass $navColor={isNavVisible} className={isSearching ? "searchOn" : ""} >
      <HeaderWrap>
        <Menu>
          <MenuLogo onClick={()=>navigate('/')}></MenuLogo>
          <MenuRight>
            <MenuSearch onClick={searchIconClick}></MenuSearch>
            <UserWarp>
              <UserImg/>
              <DropDown>Sign Out</DropDown>
            </UserWarp>
          </MenuRight>
        </Menu>

        <Search>
          <SearchShadow ref={searchShadow} onClick={noSearching} className={isSearching ? "" : "searchEnd"} />
          <SearchWrap>
            <SearchIcon/>
            <SearchInput ref={searchInput} type='text' placeholder='프로그램을 검색해 주세요' value={searchKeyword} onChange={programSearching}></SearchInput>
            <CloseIcon onClick={noSearching}/>
          </SearchWrap>
        </Search>
      </HeaderWrap>
    </HeaderElClass>
  )
}

export default Header;