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
    menu2Li +=`
    <li data-category=${locationHref[menuList]} class="menu-item">
      <a href="product-product.html?product=${locationHref[menuList]}">${menuList}(${menu2Num[menuList]})</a>
    </li>
    ` 
  }
  menu2.innerHTML = menu2Li;

  const menu2Category = document.querySelectorAll('.menu-2__menu .menu-item')
  let mistObj = {"미스트":[],"세럼":[],"토너":[],"앰플":[]}
  let creamObj = {"로션":[],"크림":[],"밤":[]}
  let hairObj =  {"헤어":[],"바디":[]}
  function objValue(obj,num){
    itemData.forEach((ele) => {
      if(ele.subclass == Object.keys(obj)[num]){
        obj[ele.subclass].push(ele)          
        }
      })
    }
  for(let i=0; i<=Object.keys(mistObj).length; i++){objValue(mistObj,i)}
  for(let i=0; i<=Object.keys(creamObj).length; i++){objValue(creamObj,i)}
  for(let i=0; i<=Object.keys(hairObj).length; i++){objValue(hairObj,i)}

  menu2Category.forEach((ele,idx)=>{
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const categoryKey = urlParams.get('product')
    const categoryKeyFace = urlParams.get('face')
    console.log(categoryKey);
    
      if(ele.dataset.category == categoryKey){
      ele.classList.add('active')
      menu1Title.textContent = gnbData.Product[idx]
    }
  })

  if(menu1Title.textContent == '미스트·세럼·토너·앰플'){
    menu2Li = ``
    for(let item in mistObj){
      menu2Li += `
      <li class="menu-item">
        <a href="product-product.html?product=${locationHref['미스트·세럼·토너·앰플']}&${locationHref['미스트·세럼·토너·앰플']}=${locationHref[item]}">${item}(${mistObj[item].length})</a>
      </li>
      `
    }
    menu2.innerHTML = menu2Li;
    
  }
  if(menu1Title.textContent == '로션·크림·밤'){
    menu2Li = ``
    for(let item in creamObj){
      menu2Li += `
      <li class="menu-item">
        <a href="product-product.html?product=${locationHref['로션·크림·밤']}&${locationHref['로션·크림·밤']}=${locationHref[item]}">${item}(${creamObj[item].length})</a>
      </li>
      `
    }
    menu2.innerHTML = menu2Li;
  }
  if(menu1Title.textContent == '헤어·바디'){
    menu2Li = ``
    for(let item in hairObj){
      menu2Li += `
      <li class="menu-item">
        <a href="product-product.html?product=${locationHref['헤어·바디']}&${locationHref['헤어·바디']}=${locationHref[item]}">${item}(${hairObj[item].length})</a>
      </li>
      `
    }
    menu2.innerHTML = menu2Li;
  }

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


  
  //// product
  let pageItemShowLength = 20 // 한 페이지당 최대 20개 보여줄것임
  const itemList = document.querySelector('.product .item-list')
  let itemCode = '';
  let ItemDataLengthArr = []
  function pageItemShow(pageButtonNumber){
    for(let i=pageItemShowLength*(pageButtonNumber-1); i<pageItemShowLength*(pageButtonNumber-1)+20 && i<itemData.length; i++){
      if(menu1Title.textContent){
        ItemDataLengthArr.push(itemData[i])
      }
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

  console.log(ItemDataLengthArr);
  
  //// pagination
  function pageButton(){
    let pageItemLength = Math.ceil(itemData.length / pageItemShowLength)
    
    ////// 버튼 생성
    const pageButtonList = document.querySelector('.pagination-list')
    for(let i=1; i<=pageItemLength; i++){
      pageButtonList.innerHTML += `<li class="pagination-item">${i}</li>`
    }
    
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
  }
  pageButton()

})