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
  window.addEventListener('click',function(event){    
    if(!menu1Title.contains(event.target)){
      menu1Title.classList.remove('active')
      tapMenu.style.height = 0
    }
  })

  //// menu-2
  const menu2 = document.querySelector('.menu-2__menu')
  let menu2Li = ``;
  let menu2NumArr = []
  let optionBest = []
  itemData.forEach(function(ele){
    menu2NumArr.push(ele.class)
  })
  const menu2Num = menu2NumArr.reduce(function(acc,cur){
    acc[cur] = (acc[cur] || 0) +1;
    return acc;
  },{})

  const menu2NumTotal = Object.values(menu2Num).reduce(function(acc,cur){
    return acc+cur
  },0)  

  itemData.forEach(function(ele){
    if(ele.option == 'best'){
      optionBest.push(ele)
    }
  })
  menu2Num['전체보기'] = menu2NumTotal
  menu2Num['베스트'] = optionBest.length

  for (let menuList of gnbData.Product){
    menu2Li +=`<li class="menu-list"><a href="#">${menuList}(${menu2Num[menuList]})</a></li>` 
  }
  menu2.innerHTML = menu2Li

  //// select
  const selectBox = document.querySelector('.selectBox')
  const select = document.querySelector('.select')
  const selectList = document.querySelector('.select-list')
  const selectOption = document.querySelectorAll('.select-option')
  select.addEventListener('click',function(){
    selectList.classList.add('active')
  })
  selectOption.forEach(function(ele){
    ele.addEventListener('click',function(){
      select.textContent = ele.textContent
      selectList.classList.remove('active')
    })
  })
  window.addEventListener('click',function(event){    
    if(!selectBox.contains(event.target)){
      selectList.classList.remove('active')
    }
  })

  
})