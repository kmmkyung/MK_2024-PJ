import svgData from '../assets/data/svgData.js'
import {gnbData} from '../assets/data/gnbData.js';
import itemData from '../assets/data/itemData.js'

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
    if(menu1Title.classList.contains('active')){
      tapMenu.style.height = tapMenu.scrollHeight+'px'
    }
    else{
      tapMenu.style.height = 0
    }
  })

  //// menu-2
  const menu2 = document.querySelector('.menu-2__menu')
  let menu2Li = ``;
  let menu2NumArr = []
  itemData.forEach(function(ele){
    menu2NumArr.push(ele.class)
  })
  const menu2Num = menu2NumArr.reduce(function(accu,curr){
    accu[curr] = (accu[curr] || 0) +1; 
    return accu;
  },{})
  console.log(menu2Num);
  
  
  for (let menuList of gnbData.Product){
    menu2Li +=`<li class=""><a href="#">${menuList}()</a></li>` 
  }
  menu2.innerHTML = menu2Li



})