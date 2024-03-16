import svgData from '../assets/data/svgData.js'
import {gnbData,footerData} from '../assets/data/gnbData.js';
import locationHrefData from '../assets/data/locationHrefData.js';

window.addEventListener('DOMContentLoaded',function(){
  //// header
  // logo
  const headerLogo = document.querySelector('.header-logo');
  headerLogo.innerHTML = svgData.logo_W;
  headerLogo.addEventListener('click',function(){
    location.href='index.html'
  })

  // icon
  let iconMenu = document.querySelector('.header-left__menuIcon')
  let iconWish = document.querySelector('.header-etc__wish')
  let iconMyPage = document.querySelector('.header-etc__myPage')
  let iconSearch = document.querySelector('.header-etc__search')
  let iconCart = document.querySelector('.header-etc__cart')
  let iconClose = document.querySelector('.header-menu__close')
  iconMenu.innerHTML = svgData.icon_menu;
  iconWish.innerHTML = svgData.icon_wish;
  iconMyPage.innerHTML = svgData.icon_myPage;
  iconSearch.innerHTML = svgData.icon_search;
  iconCart.innerHTML = svgData.icon_cart;
  iconClose.innerHTML = svgData.icon_close;


  // 메뉴 적용
  const headerMenuUl = document.querySelector('.header-menu ul')
  let headerMenuCode = '';

  for(let title in gnbData){
    headerMenuCode += /* html */`
    <li class="menu-list">
    <h5 class="menu-list__title">${title}</h5>
      <ol>
    `
    for(let menu of gnbData[title]){
      headerMenuCode += /* html */` 
      <li class="menu-item">
        <a class="gnbSubMenu" data-link='${locationHrefData[menu]}'>${menu}</a>
      </li>
      `
    }
    headerMenuCode += /* html */`
      </ol>
    </li>
    `
  }
  
  headerMenuUl.innerHTML = headerMenuCode;
  

  const gnbSubMenu = document.querySelectorAll('.gnbSubMenu')
  gnbSubMenu.forEach(function(ele){
    ele.addEventListener('click',function(){
      let dataLink = ele.dataset.link
      switch(dataLink){
        case "story" : location.href= 'story-'+dataLink+'.html'
          break;
        case "whiteTruffle": location.href= 'story-'+dataLink+'.html'
          break; 
        case "verification": location.href= 'story-'+dataLink+'.html'
          break;
        case "muse": location.href= 'story-'+dataLink+'.html'
          break;

        case "antioxidant": location.href="collection-theme.html?collection="+dataLink
          break;
        case "vegan" : location.href="collection-theme.html?collection="+dataLink
          break;
        case "moisture": location.href="collection-theme.html?collection="+dataLink
          break; 
        case "relax": location.href="collection-theme.html?collection="+dataLink
          break;
        case "clinic": location.href="collection-theme.html?collection="+dataLink
          break;

        case "all": location.href="product-product.html?product="+dataLink
          break;
        case "best" : location.href="product-product.html?product="+dataLink
          break;
        case "face" : location.href="product-product.html?product="+dataLink
          break;
        case "suncream": location.href="product-product.html?product="+dataLink
          break; 
        case "mask": location.href="product-product.html?product="+dataLink
          break;
        case "creams": location.href="product-product.html?product="+dataLink
          break;
        case "cleanser": location.href="product-product.html?product="+dataLink
          break;
        case "makeup": location.href="product-product.html?product="+dataLink
          break;
        case "man": location.href="product-product.html?product="+dataLink
          break;
        case "hairbody": location.href="product-product.html?product="+dataLink
          break;
        case "veganery": location.href="product-product.html?product="+dataLink
          break;
        case "fragrant": location.href="product-product.html?product="+dataLink
          break;

      }
    })
  })

  // 메뉴 누르면 메뉴 닫힘
  let click = [0,0,0];
  const menuTitle = document.querySelectorAll('.header-menu .menu-list__title')
  const menuItemBox = document.querySelectorAll('.header-menu .menu-list ol')
  
  menuItemBox.forEach(function(ele){
    let eleH = ele.scrollHeight
    ele.style.height = eleH+'px'
  })

  menuTitle.forEach(function(ele,idx){
    ele.addEventListener('click',function(){
      click[idx]++;
      if(click[idx]%2==1){
        menuItemBox[idx].style.height = 0
      }
      if(click[idx]%2==0){
        menuItemBox[idx].style.height=menuItemBox[idx].scrollHeight+'px'
      }
      if(idx==3){
        location.href="homeTry.html"
      }
    })
  })


  // menu
  // 메뉴 버튼을 누르면 메뉴창 열림 / 메뉴 다른곳 누르면 메뉴창 닫힘
  const menuButton = document.querySelector('.header-left__menuIcon');
  const closeButton = document.querySelector('.header-menu__close');
  const headerLeftMenu = document.querySelector('.header-left__menu');
  const headerMenu = document.querySelector('.header-menu');
  const headerMenuBg = document.querySelector('.header-menu__bg');
  
  menuButton.addEventListener('click',function(){
    menuButton.classList.add('-hidden')
    headerLeftMenu.classList.add('off')
    headerMenu.classList.add('active')
  });
  closeButton.addEventListener('click',function(){
    menuButton.classList.remove('-hidden')
    headerLeftMenu.classList.remove('off')
    headerMenu.classList.remove('active')
  });
  headerMenuBg.addEventListener('click',function(){
    menuButton.classList.remove('-hidden')
    headerLeftMenu.classList.remove('off')
    headerMenu.classList.remove('active')
  })

  // search 버튼
  const headerEtcSearchButton = document.querySelector('.header-etc__search');
  const headerSearch = document.querySelector('.header-search');
  const searchContentCloseButton = document.querySelector('.search-content__closeButton');
  headerEtcSearchButton.addEventListener('click',function(){
    headerSearch.classList.add('active');
  })

  searchContentCloseButton.addEventListener('click',function(){
  headerSearch.classList.remove('active');
  })

  // search 버튼 다른곳 누르면 닫힘
  const main = document.querySelector('main');
  main.addEventListener('click',function(){
    headerSearch.classList.remove('active');
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