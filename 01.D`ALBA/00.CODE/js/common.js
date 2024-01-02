import svgData from '../assets/data/svgData.js'
import {gndData,footerData} from '../assets/data/gndData.js';

window.addEventListener('DOMContentLoaded',function(){
  //// header
  // logo
  const headerLogo = document.querySelector('.header-logo');
  headerLogo.innerHTML = svgData.logo_W;
  
  // 메뉴 적용
  const headerMenuUl = document.querySelector('.header-menu ul')
  let headerMenuCode = '';

  for(let title in gndData){
    headerMenuCode += /* html */`
    <li class="menu-list">
    <a href="#">
    ${title}
    </a>
      <ol>
    `
    for(let menu of gndData[title]){
      headerMenuCode += /* html */` 
      <li class="menu-item">${menu}</li>
      `
    }
    headerMenuCode += /* html */`
      </ol>
    </li>
    `
  }
  headerMenuUl.innerHTML = headerMenuCode;

  // menu
  // 메뉴 버튼을 누르면 메뉴창 열림 / 메뉴 다른곳 누르면 메뉴창 닫힘
  const menuButton = document.querySelector('.header-left__img .menu');
  const closeButton = document.querySelector('.header-menu .close');
  const headerLeftMenu = document.querySelector('.header-left__menu');
  const headerMenu = document.querySelector('.header-menu');
  const headerMenuBg = document.querySelector('.header-menu__bg');
  const menuInner = document.querySelector('.menu-inner');
  menuButton.addEventListener('click',function(){
    menuButton.classList.add('-hidden')
    headerLeftMenu.classList.add('off')
    headerMenu.classList.add('on')
  });
  closeButton.addEventListener('click',function(){
    menuButton.classList.remove('-hidden')
    headerLeftMenu.classList.remove('off')
    headerMenu.classList.remove('on')
  });
  headerMenuBg.addEventListener('click',function(){
    menuButton.classList.remove('-hidden')
    headerLeftMenu.classList.remove('off')
    headerMenu.classList.remove('on')
  })


  // 메뉴 누르면 메뉴 닫힘
  let click = [0,0,0];
  const menuTitle = document.querySelectorAll('.header-menu .menu-list a')
  const menuItem = document.querySelectorAll('.header-menu .menu-list ol')
  
  menuTitle.forEach(function(ele,idx){
    menuItem[idx].style.height=menuItem[idx].scrollHeight+'px'
    ele.addEventListener('click',function(){
      click[idx]++;
      if(click[idx]%2==1){
        menuItem[idx].style.height = 0 
      }
      if(click[idx]%2==0){
        menuItem[idx].style.height=menuItem[idx].scrollHeight+'px'
      }
    })
  })

  // search 버튼
  const headerEtcSearchButton = document.querySelector('.header-etc__searchButton');
  const headerSearch = document.querySelector('.header-search');
  const searchContentCloseButton = document.querySelector('.search-content__closeButton');
  headerEtcSearchButton.addEventListener('click',function(){
    headerSearch.classList.add('on');
  })
  searchContentCloseButton.addEventListener('click',function(){
    headerSearch.classList.remove('on');
  })

  // search 버튼 다른곳 누르면 닫힘
  const main = document.querySelector('main');
  main.addEventListener('click',function(){
    headerSearch.classList.remove('on');
  })

  //// footer
  // 메뉴적용
  const footerMenu = document.querySelector('.footer-menu');
  let footerMenuCode = '';
  for(let title in footerData){
    footerMenuCode += /* html */ `
      <li class="footer-menu__title">${title}
        <ol>
    `
    for(let item of footerData[title]){
      footerMenuCode += /* html */ `
        <li class="footer-menu__item"><a href="#">${item}</a></li>
        `
    }
    footerMenuCode += /* html */ `
      </ol>
    </li>
    `
  }
  footerMenu.innerHTML = footerMenuCode;
})