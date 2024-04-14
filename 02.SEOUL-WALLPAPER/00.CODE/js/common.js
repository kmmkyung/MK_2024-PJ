import svgData from '../assets/data/data-svgData.js';
import gnbData from '../assets/data/data-gnbData.js';
import {footerData1,footerData2} from '../assets/data/data-footerData.js'

window.addEventListener('DOMContentLoaded',function(){
  // [ header ]
  //// logo
  const headerLogo = document.querySelector('.pc-header .logo');
  headerLogo.innerHTML = svgData.logoSvg_b;

  //// main-gnb
  const gnb = document.querySelector('.gnb-all .gnb');
  let gnbDataCode = '';  

  for(let title in gnbData){
    gnbDataCode += /* html */`
      <li class="gnb-menu">${title}
        <div class="gnb-menu__area">
        <ol>
          <li class="gnb-menu__title">
            <span class="title-ko">${title}</span>
            <img src="./assets/svg/gnb-dropdown-icon.svg" alt="dropdown-icon">
            <div class="title-content">
              <img src="./assets/svg/talk-icon.svg" alt="talk-icon">
    `
    for(let enTitle in gnbData[title]){
      gnbDataCode += /* html */`
              <span class="title-en">${enTitle}</span>
              </div>
          </li>
        `
      for(let subTitle in gnbData[title][enTitle]){
      gnbDataCode += /* html */`
          <li class="gnb-menu__item">${subTitle}
      `
        for(let menu of gnbData[title][enTitle][subTitle]){
        gnbDataCode += /* html */`
            <span><a href="#">${menu}</a></span>
      `
        }
      gnbDataCode += /*html*/`
          </li>
        `;
      }
    gnbDataCode += /*html*/`
    `;
    }
    gnbDataCode += /*html*/`
        </ol>
      </div>
    </li>
    `;
  }
  gnb.innerHTML = gnbDataCode;

  //// gnd hover
  const pcHeader = document.querySelector('.pc-header');
  const gnbMenu = document.querySelectorAll('.gnb-menu');
  const pcGnbBg = document.querySelector('.pc-header__bg');

  gnbMenu.forEach((ele)=>{
    ele.addEventListener('mouseenter',function(){
      pcHeader.style.backgroundColor = 'white'
      pcGnbBg.classList.remove('-hidden')
    })
  })
  
  gnbMenu.forEach((ele)=>{
    ele.addEventListener('mouseleave',function(){
      pcHeader.style.backgroundColor = 'transparent'
      pcGnbBg.classList.add('-hidden')
    })
  })

  //// etc-gnb
  const langBox = document.querySelector('.lang-box');
  const wishBox = document.querySelector('.wish-box');
  const searchBox = document.querySelector('.search-box');
  const mobileBox = document.querySelector('.mobile-menu');
  const mobileHeader = document.querySelector('.mobile-header');
  const mobileGnbBg = document.querySelector('.mobile-header__bg');
  langBox.addEventListener('mouseenter',function(){
    langBox.classList.add('hover')
  })
  langBox.addEventListener('mouseleave',function(){
    langBox.classList.remove('hover')
  })
  mobileBox.addEventListener('click',function(){
    mobileBox.classList.toggle('on')
    if(mobileBox.classList.contains('on')){
      document.querySelector('.search-box__input').focus();
      langBox.classList.add('on')
      wishBox.classList.add('on')
      searchBox.classList.add('on')
      mobileHeader.classList.add('on')
      mobileGnbBg.classList.remove('-hidden')
      document.querySelector('.gnb').classList.add('mobileOn')
      document.querySelector('.logo').classList.add('mobileOn')
    }
    else{
      langBox.classList.remove('on')
      wishBox.classList.remove('on')
      searchBox.classList.remove('on')
      mobileHeader.classList.remove('on')
      mobileGnbBg.classList.add('-hidden')
      document.querySelector('.gnb').classList.remove('mobileOn')
      document.querySelector('.logo').classList.remove('mobileOn')
    }
  })
  document.querySelector('.mobile-header__bg').addEventListener('click',function(){
    mobileBox.classList.remove('on')
    langBox.classList.remove('on')
    wishBox.classList.remove('on')
    searchBox.classList.remove('on')
    mobileHeader.classList.remove('on')
    mobileGnbBg.classList.add('-hidden')
    document.querySelector('.gnb').classList.remove('mobileOn')
    document.querySelector('.logo').classList.remove('mobileOn')
  })

  //// mobile gnb
  const mobileGnb = document.querySelector('.mobile-gnb');
  let mobileGnbDataCode = '';
  for(let title in gnbData){
    mobileGnbDataCode += /* html */`
      <li class="mobileGnb-menu">
      <span class="mobileGnb-menu__title">${title}</span>
        <ol>
    `
    for(let enTitle in gnbData[title]){
      for(let subTitle in gnbData[title][enTitle]){
        mobileGnbDataCode += /* html */`
        <li class="mobileGnb-menu__item">
          <a href="#">${subTitle}</a>
        </li>
        `
      }
    }
    mobileGnbDataCode += /* html */`
      </ol>
    </li>
  `
  }
  mobileGnb.innerHTML = mobileGnbDataCode;

  //// mobile gnb effect
  const mobileGnbMenu = document.querySelectorAll('.mobileGnb-menu');
  const mobileGnbMenuTitle = document.querySelectorAll('.mobileGnb-menu__title');
  const mobileGnbMenuList = document.querySelectorAll('.mobileGnb-menu ol');

  let menuClick = 0;
  mobileGnbMenu.forEach((ele,idx)=>{
    let menuKo = mobileGnbMenuTitle[idx].innerText
    // pc
    ele.addEventListener('mouseenter',()=>{
      mobileGnbMenuList[idx].style.height = mobileGnbMenuList[idx].scrollHeight+'px'
      mobileGnbMenuTitle[idx].innerText = Object.keys(gnbData[menuKo]);
    })
    ele.addEventListener('mouseleave',()=>{
      mobileGnbMenuTitle[idx].innerText = menuKo
      mobileGnbMenuList[idx].style.height = 0
    })
  
    ele.addEventListener('click',function(){
      menuClick++;
      if(menuClick%2 == 1){
        mobileGnbMenuList[idx].style.height = mobileGnbMenuList[idx].scrollHeight+'px'
        mobileGnbMenuTitle[idx].innerText = Object.keys(gnbData[menuKo]);
      }
      else{
        mobileGnbMenuList[idx].style.height = 0
        mobileGnbMenuTitle[idx].innerText = menuKo
      }
    })
  })

  let lastScroll = 0;
  window.addEventListener('scroll',function(){
    let currentScroll = window.scrollY
    if(currentScroll < lastScroll){
      pcHeader.classList.add('nav-up')
      pcHeader.classList.remove('nav-down') 
    }
    else{
      pcHeader.classList.remove('nav-up')
      pcHeader.classList.add('nav-down') 
    }
    lastScroll = currentScroll;
  })

  // [ footer ]
  //// footer menu
  const footerMenuItem = document.querySelectorAll('.footer-menu__item');
  function createDiv(){
    let footerCircle = document.createElement('div');
    footerCircle.classList.add('footer-circle');
    footerCircle.innerHTML = svgData.footerCircleSvg;
    return footerCircle
  }
  footerMenuItem.forEach((ele)=>{
    ele.appendChild(createDiv())
  })

  //// logo
  const footerLogo = document.querySelector('.footer-info .logo');
  footerLogo.innerHTML = svgData.logoSvg_w;

  //// footerData1 / footerData2
  const footerContentAddress = document.querySelector('.footer-content__address')
  let footerContentAddressCode = ``;
  for(let title in footerData1){
    footerContentAddressCode += /* html */`
    <ul class="address-list">
      <li class="address-title">${title}</li>
    `
    for(let subTitle in footerData1[title]){
      footerContentAddressCode += /* html */`
      <li class="address-item">
        <span class="item-title">${subTitle}</span>
        <span>${footerData1[title][subTitle]}</span>
      </li>
        `
    }
    footerContentAddressCode += /* html */`
    </ul>
    `
  }
  footerContentAddress.innerHTML = footerContentAddressCode

  const footerContentMenu = document.querySelector('.footer-content__menu');
  let footerContentMenuCode = ``;
  for(let title in footerData2){
    footerContentMenuCode += /* html */`
      <li class="menu-title">${title}
        <ol class="menu-list">
    `
    for(let menu of footerData2[title]){
      footerContentMenuCode += /* html */`
      <li class="menu-item">
        <a href="#">${menu}</a>
      </li>
      `
    }
    footerContentMenuCode += /* html */`
      </ol>
    </li>
    `
  }
  footerContentMenu.innerHTML = footerContentMenuCode;

  //// footer top button
  const footerTopButton = document.querySelector('.footer-info .top-button');
  footerTopButton.addEventListener('click',function(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  })
})