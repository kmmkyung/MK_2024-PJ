import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type navType = {
  $navColor: boolean;
  $search: string;
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

const SearchIcon  = styled.img`
  width: 10px;
  height: 10px;
  padding: 20px;
  transition: all 0.4s;
  transform: translate(10vw, 0);
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
  transition: all 0.4s;
  transform: translate(10vw, 0);
  font-size: ${props => props.theme.fontSize.m};
`;

const CloseIcon = styled.img`
  width: 10px;
  height: 10px;
  padding: 20px;
  cursor: pointer;
  margin-right: 60px;
`;

function Header( ){
  const navigate = useNavigate();
  const [ isNavVisible, setIsNavVisible] = useState(false);
  const [ searchValue, setSearchValue ] = useState('');

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
  function searchIconClick(){

  }

  return (
    <HeaderEl $navColor={isNavVisible} $search={Search} // className={isSearchActive ? "on" : ""}
    >
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
        <SearchShadow
        // onClick={()=>handleCloseIconClick()}
        ></SearchShadow>
        <SearchWrap>
          <SearchIcon src='/svg/search.svg' alt='search-icon'></SearchIcon>
          <SearchInput type='text' placeholder='영화를 검색해 주세요'
          value={searchValue}
          // onChange={inputValue}
          ></SearchInput>
          <CloseIcon src='/svg/close.svg' alt='close-icon'
          //  onClick={()=>handleCloseIconClick()}
            ></CloseIcon>
        </SearchWrap>
      </Search>
    </HeaderWrap>
  </HeaderEl>
  )
}

export default Header;