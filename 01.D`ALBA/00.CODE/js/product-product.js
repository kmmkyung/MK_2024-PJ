import svgData from '../assets/data/svgData.js'
import {gnbData} from '../assets/data/gnbData.js';
import itemData from '../assets/data/itemData.js'
import locationHref from '../assets/data/locationHrefData.js'

window.addEventListener('DOMContentLoaded',function(){
  // topMenu
  //// filterButton
  const filterButton = document.querySelector('.menu-1__filterButton')
  filterButton.innerHTML = svgData.icon_filter

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

  let menu2Category = document.querySelectorAll('.menu-2__menu .menu-item')
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
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    let categoryKey = urlParams.get('product')
    if(ele.dataset.category == categoryKey){
    ele.classList.add('active')
    menu1Title.textContent = gnbData.Product[idx]
    menu2CategorySub('미스트·세럼·토너·앰플',mistObj,'face')
    menu2CategorySub('로션·크림·밤',creamObj,'creams')
    menu2CategorySub('헤어·바디',hairObj,'hairbody')
    }
  })
  function menu2CategorySub(category,arr,categoryKey2){
    if(menu1Title.textContent == category){
      menu2Li = ``
      for(let item in arr){
        menu2Li += `
        <li class="menu-item">
          <a href="product-product.html?product=${locationHref[category]}&${locationHref[category]}=${locationHref[item]}">${item}(${arr[item].length})</a>
        </li>
        `
      }
      menu2.innerHTML = menu2Li;
      let menu2Category = document.querySelectorAll('.menu-2__menu .menu-item')
      menu2Category.forEach(function(ele,idx){
        let queryString = window.location.search
        let urlParams = new URLSearchParams(queryString)
        let categoryKey = urlParams.get(categoryKey2)
          if(categoryKey == locationHref[Object.keys(arr)[idx]]){
            ele.classList.add('active') 
          }
      })
    }
  }

  //// pagination ///////////////////////////////////////////////////////////////////////
  let pageItemShowLength = 20 // 한 페이지당 최대 20개 보여줄것임
  
  //// product
  ////// 아이템 코드
  function pageItemDataCode(itemDataLengthArr){
    let itemCode = '';
    const itemList = document.querySelector('.product .item-list')
    for(let item of itemDataLengthArr){  
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

  ////// 전체보기
  function pageItemAll(pageButtonNumber){
    let itemDataLengthArr = []
    if(menu1Title.textContent === '전체보기'){
      for(let i=pageItemShowLength*(pageButtonNumber-1); i<pageItemShowLength*(pageButtonNumber-1)+20 && i<itemData.length; i++){
        itemDataLengthArr.push(itemData[i])
      }
      pageItemDataCode(itemDataLengthArr)
    }
  }
  pageItemAll(1)

  ////// 베스트
  function pageItemBest(pageButtonNumber){
    let itemDataLengthArr = []
    let itemDataFilterArr = []
    if(menu1Title.textContent === '베스트'){
        let filterData = itemData.filter(function(event){return event.option =='best'})
        itemDataFilterArr.push(...filterData)
      }
    for(let i=pageItemShowLength*(pageButtonNumber-1); i<pageItemShowLength*(pageButtonNumber-1)+20 && i<itemDataFilterArr.length; i++){
      itemDataLengthArr.push(itemDataFilterArr[i])
      pageItemDataCode(itemDataLengthArr)
    }
  }
  pageItemBest(1)

  ////// 기타 카테고리
  function pageItemCategory(category,pageButtonNumber){
    let itemDataLengthArr = []
    let itemDataFilterArr = []
    if(menu1Title.textContent === category){
    let filterData = itemData.filter(function(event){
      return event.class == category
    })
    itemDataFilterArr.push(...filterData)    
    }
    for(let i=pageItemShowLength*(pageButtonNumber-1); i<pageItemShowLength*(pageButtonNumber-1)+20 && i<itemDataFilterArr.length; i++){
      itemDataLengthArr.push(itemDataFilterArr[i])      
      pageItemDataCode(itemDataLengthArr)
    }
  }

  pageItemCategory('미스트·세럼·토너·앰플',1)
  pageItemCategory('선크림',1)
  pageItemCategory('마스크',1)
  pageItemCategory('로션·크림·밤',1)
  pageItemCategory('클렌징',1)
  pageItemCategory('메이크업',1)
  pageItemCategory('맨즈케어',1)
  pageItemCategory('헤어·바디',1)
  pageItemCategory('비거너리',1)
  pageItemCategory('프래그런스',1)
  
  //// 기타 카테고리 상세
  function pageItemCategorySub(category,arr,pageButtonNumber){
    let itemDataLengthArr = []
    let itemDataFilterArr = []
    let menu2LiAll = document.querySelectorAll('.menu-2__menu .menu-item')
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    let categoryKey = urlParams.get(category)
    
    menu2LiAll.forEach(function(ele,idx){
      if(categoryKey == locationHref[Object.keys(arr)[idx]]){                
        let filterData = itemData.filter(function(event){
          return event.subclass == Object.keys(arr)[idx]
        })
        itemDataFilterArr.push(...filterData)
        console.log(itemDataFilterArr);
      }
      if(categoryKey == 'lotion'){
        document.querySelector('.item-list').style.display='block'
        document.querySelector('.item-list').innerHTML='<p class="productNo">상품이 존재하지 않습니다.</p>'
        document.querySelector('.pagination').style.display='none'

      }
    })
    for(let i=pageItemShowLength*(pageButtonNumber-1); i<pageItemShowLength*(pageButtonNumber-1)+20 && i<itemDataFilterArr.length; i++){
      itemDataLengthArr.push(itemDataFilterArr[i])      
      pageItemDataCode(itemDataLengthArr)
    }
  }
  pageItemCategorySub('face',mistObj,1)
  pageItemCategorySub('creams',creamObj,1)
  pageItemCategorySub('hairbody',hairObj,1)

  function pageButton(cat){
    let pageItemLength
    const pageButtonList = document.querySelector('.pagination-list')
    if(menu1Title.textContent == cat){
      pageItemLength = Math.ceil(menu2Num[cat] / pageItemShowLength)
    }
      
    for(let i=1; i<=pageItemLength; i++){
      pageButtonList.innerHTML += `<li class="pagination-item">${i}</li>`
    }
  }
  pageButton('전체보기')
  pageButton('베스트')
  pageButton('미스트·세럼·토너·앰플')
  pageButton('선크림')
  pageButton('마스크')
  pageButton('로션·크림·밤')
  pageButton('클렌징')
  pageButton('메이크업')
  pageButton('맨즈케어')
  pageButton('헤어·바디')
  pageButton('비거너리')
  pageButton('프래그런스')


  const paginationItem = document.querySelectorAll('.pagination-item')
  paginationItem[0].classList.add('active')
  paginationItem.forEach(function(ele){
    ele.addEventListener('click',function(event){
      pageItemAll(event.target.textContent)
      pageItemBest(event.target.textContent)
      pageItemCategory(menu1Title.textContent,event.target.textContent)
      let activeItem = document.querySelector('.pagination-item.active')
      activeItem.classList.remove('active')
      ele.classList.add('active')
      setTimeout(function(){
        scrollTo(0,0)
      },150)
    })
  })

})