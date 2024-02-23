import svgData from '../assets/data/svgData.js'
import {gnbData} from '../assets/data/gnbData.js';
import itemData from '../assets/data/itemData.js'
import locationHref from '../assets/data/locationHrefData.js'

window.addEventListener('DOMContentLoaded',function(){
  // topMenu
  //// filterButton
  const filterButton = document.querySelector('.menu-1__filterButton')
  filterButton.innerHTML = svgData.icon_filter

  //// menu-1__tapMenu
  const tapMenu = document.querySelector('.menu-1__tapMenu')
  let tapMenuLi = ``;
  for (let menuList of gnbData.Product){
    tapMenuLi +=`<li class="tapMenuList"><a href="product-product.html?product=${locationHref[menuList]}">${menuList}</a></li>` 
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
    menu2Li +=`<li data-category=${locationHref[menuList]} class="menu-item"><a href="product-product.html?product=${locationHref[menuList]}">${menuList}(${menu2Num[menuList]})</a></li>` 
  }
  menu2.innerHTML = menu2Li;

  const menu2Category = document.querySelectorAll('.menu-2__menu .menu-item')
  menu2Category.forEach((ele)=>{
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const categoryKey = urlParams.get('product')
    if(ele.dataset.category == categoryKey){
      ele.classList.add('active')
    }
  })
  
  
  //// select
  const selectBox = document.querySelector('.selectBox')
  const select = document.querySelector('.select')
  const selectList = document.querySelector('.select-list')
  const selectOption = document.querySelectorAll('.select-option')
  let click = 0;
  select.addEventListener('click',function(){
    selectList.classList.add('active')
    click ++;
    if(click%2== 0){
      selectList.classList.remove('active')
    }
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

  //// pagination
  let pageItemShowLength = 20 // 한 페이지당 최대 20개 보여줄것임
  let pageItemLength = Math.ceil(itemData.length / pageItemShowLength)

  ////// 버튼 생성
  const pageButtonList = document.querySelector('.pagination-list')
  function pageButton(){
    for(let i=1; i<=pageItemLength; i++){
      pageButtonList.innerHTML += `<li class="pagination-item">${i}</li>`
    }
  }
  pageButton()

  //// product
  function pageItemShow(pageButtonNumber){
    const itemList = document.querySelector('.product .item-list')
    let itemCode = '';
    let ItemDataLengthArr = []
    for(let i=pageItemShowLength*(pageButtonNumber-1); i<pageItemShowLength*(pageButtonNumber-1)+20 && i<itemData.length; i++){
      ItemDataLengthArr.push(itemData[i])
    }
    for(let item of ItemDataLengthArr){  
      let capacityString = " / "
      let itemCapacity = item.capacity;
      let itemCapacityArr = itemCapacity.join(capacityString)
      itemCode += `
      <li class="item">
        <a href="#">
          <div class="item-wrap">
            <div class="item-text">
              <h5 class="item-text__title">${item.name}</h5>
              <p class="item-text__price">KRW ${item.price}</p>
            </div>
            <div class="item-imgBox">
              <img class="item-imgBox__img" src="${item.images}">
            </div>
            <div class="item-bottom">
            <div class="item-info">
            <p class="item-info__caption">
            `
    for(let itemTag of item.tag){
      itemCode += `
              <span>#${itemTag}</span>  
                `
    }
      itemCode +=`
            </p>
              <p class="item-info__size">
              <span>${itemCapacityArr}</span>
            </p>
          </div>
          <div class="item-review">
            <p class="item-review__number">리뷰: ${item.review}</p>
            <p class="item-review__star">★${item.star}</p>
          </div>
        </div>
      </div>
      </a>
    </li>
    `
    }
    itemList.innerHTML = itemCode
  }
  pageItemShow(1)

  const paginationItem = document.querySelectorAll('.pagination-item')
  paginationItem[0].classList.add('active')
  paginationItem.forEach(function(ele){
    ele.addEventListener('click',function(event){
      pageItemShow(event.target.textContent)
      let activeItem = document.querySelector('.pagination-item.active')
        activeItem.classList.remove('active')
      ele.classList.add('active')
    })
  })
  



})