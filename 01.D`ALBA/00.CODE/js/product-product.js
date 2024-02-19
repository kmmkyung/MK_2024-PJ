import svgData from '../assets/data/svgData.js'
import {gnbData} from '../assets/data/gnbData.js';

window.addEventListener('DOMContentLoaded',function(){
  // topMenu
  //// filterButton
  const filterButton = document.querySelector('.menu-1__filterButton')
  filterButton.innerHTML = svgData.icon_filter

  //// menu-1__tapMenu
  const tapMenu = document.querySelector('.menu-1__tapMenu')
  let tapMenuLi = ``;
  for (let menuList of gnbData.Product){
    tapMenuLi +=`<li class="tapMenuList"><a href="#">${menuList}</a></li>` 
  }
  tapMenu.innerHTML = tapMenuLi
  
  const menu1Title = document.querySelector('.menu-1 h2')
  menu1Title.addEventListener('click',function(){
    menu1Title.classList.toggle('active')
    tapMenu.classList.toggle('active')
    if(tapMenu.classList.contains('active')){
      tapMenu.style.height = auto
    }
  })
})