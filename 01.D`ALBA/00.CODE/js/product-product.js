import svgData from '../assets/data/svgData.js'
import {gnbData} from '../assets/data/gnbData.js';
import itemData from '../assets/data/itemData.js'
import locationHref from '../assets/data/locationHrefData.js'

window.addEventListener('DOMContentLoaded',function(){
  // topMenu
  //// filterButton
  const filterButton = document.querySelector('.menu-1__filterButton')
  const filterBox = document.querySelector('.filterBox')
  const filterBoxBg = document.querySelector('.filterBox-Bg')
  const filterBoxClose = document.querySelector('.filter-back')
  const filterBoxSelectBotten = document.querySelector('.filter-selectButton')
  filterButton.innerHTML = svgData.icon_filter
  filterButton.addEventListener('click',function(){
    filterBox.classList.add('active')
    filterBoxBg.classList.remove('-hidden')
  })
  filterBoxClose.addEventListener('click',function(){
    filterBox.classList.remove('active')
    filterBoxBg.classList.add('-hidden')
  })
  filterBoxBg.addEventListener('click',function(){
    filterBox.classList.remove('active')
    filterBoxBg.classList.add('-hidden')
  })

let tagArr = []
let filterTagCode = ``
let filterTagArr = []
const filterTagBox = document.querySelector('.filter-tag')
  for(let item of itemData){
    let itemTag = item.tag
    itemTag.forEach(function(ele){
      tagArr.push(ele);
    })
  }
  filterTagArr = tagArr.reduce(function(tag1,tag2){
    return tag1.includes(tag2) ? tag1 : [...tag1,tag2];
  },[])
  filterTagArr.forEach(ele=>{
    filterTagCode += `<span>#${ele}</span>`
  })
  filterTagBox.innerHTML=filterTagCode

  let filterTag = document.querySelectorAll('.filter-tag span')
  filterTag.forEach(ele=>
    ele.addEventListener('click',function(){
      ele.classList.toggle('click')
    })
  )

  //// menuButton
  itemData.sort(function(a,b){return a.sort.추천 - b.sort.추천})
  const selectBox = document.querySelector('.selectBox')
  const select = document.querySelector('.select')
  const selectList = document.querySelector('.select-list')
  const selectOption = document.querySelectorAll('.select-option')
  let MenuClick = 0;
  select.addEventListener('click',function(){
    selectList.classList.add('active')
    click ++;
    if(MenuClick%2== 0){
      selectList.classList.remove('active')
    }
  })
  selectOption.forEach(function(ele){
    ele.addEventListener('click',function(){
      select.textContent = ele.textContent
      selectList.classList.remove('active')
      itemSort()
    })
  })
  window.addEventListener('click',function(event){    
    if(!selectBox.contains(event.target)){
      selectList.classList.remove('active')
    } 
  })
  
  function itemSort(){
    if(select.textContent){
      itemData.sort(function(a,b){return a.sort.추천 - b.sort.추천})
      pageItemFn()
    }
    if(select.textContent == '인기순'){
      itemData.sort(function(a,b){return a.sort.인기 - b.sort.인기})
      pageItemFn()
    }
    if(select.textContent == '최신등록순'){
      itemData.sort(function(a,b){return a.sort.최신등록 - b.sort.최신등록})
      pageItemFn()
    }
    if(select.textContent == '리뷰많은순'){
      itemData.sort(function(a,b){return b.review - a.review})
      pageItemFn()
    }
    if(select.textContent == '평점높은순'){
      itemData.sort(function(a,b){return b.star - a.star})
      pageItemFn()
    }
    if(select.textContent == '높은가격순'){
      itemData.sort(function(a,b){return b.price - a.price})
      pageItemFn() 
    }
    if(select.textContent == '낮은가격순'){
      itemData.sort(function(a,b){return a.price - b.price})
      pageItemFn()
    }
  }

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
        <a href="product-item.html?item=${item.id}">
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

  function pageItemFn(){
    pageItemAll(1)
    pageItemBest(1)
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
    pageItemCategorySub('face',mistObj,1)
    pageItemCategorySub('creams',creamObj,1)
    pageItemCategorySub('hairbody',hairObj,1)
  }
  pageItemFn()


  function pageButton(cat){
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    let categoryKey = urlParams.get('product')
    let categoryKeyFace= urlParams.get('face')
    let categoryKeyCream= urlParams.get('cream')
    let categoryKeyHair= urlParams.get('hairbody')
    let pageItemLength
    const pageButtonList = document.querySelector('.pagination-list')
    if(categoryKey == 'face' && cat === '미스트·세럼·토너·앰플'){
      pageItemLength = Math.ceil(menu2Num['미스트·세럼·토너·앰플'] / pageItemShowLength);      
    }
    if(categoryKeyFace === 'mist' && cat === '미스트·세럼·토너·앰플'){
      pageItemLength = Math.ceil(mistObj['미스트'].length/ pageItemShowLength)
    }
    if(categoryKeyFace === 'serum' && cat === '미스트·세럼·토너·앰플'){
      pageItemLength = Math.ceil(mistObj['세럼'].length/ pageItemShowLength)
    }
    if(categoryKeyFace === 'toner' && cat === '미스트·세럼·토너·앰플'){
      pageItemLength = Math.ceil(mistObj['토너'].length/ pageItemShowLength)
    }
    if(categoryKeyFace === 'ampoule' && cat === '미스트·세럼·토너·앰플'){
      pageItemLength = Math.ceil(mistObj['앰플'].length/ pageItemShowLength)
    }
    if(categoryKey === 'creams' && cat === '로션·크림·밤'){
      pageItemLength = Math.ceil(menu2Num['로션·크림·밤'] / pageItemShowLength)
    }
    if(categoryKeyCream === 'lotion' && cat === '로션·크림·밤'){
      pageItemLength = Math.ceil(creamObj['로션'].length/ pageItemShowLength)
    }
    if(categoryKeyCream === 'cream' && cat === '로션·크림·밤'){
      pageItemLength = Math.ceil(creamObj['로션'].length/ pageItemShowLength)
    }
    if(categoryKeyCream === 'balm' && cat === '로션·크림·밤'){
      pageItemLength = Math.ceil(creamObj['로션'].length / pageItemShowLength)
    }
    if(categoryKey === 'hairbody' && cat === '헤어·바디'){
      pageItemLength = Math.ceil(menu2Num['헤어·바디'] / pageItemShowLength)
    }
    if(categoryKeyHair === 'hair' && cat === '헤어·바디'){
      pageItemLength = Math.ceil(hairObj['헤어'].length / pageItemShowLength)
    }
    if(categoryKeyHair === 'body' && cat === '헤어·바디'){
      pageItemLength = Math.ceil(hairObj['바디'].length / pageItemShowLength)
    }
    if(menu1Title.textContent === cat && categoryKey !== 'face' && categoryKey !== 'creams' && categoryKey !== 'hairbody' ){      
      pageItemLength = Math.ceil(menu2Num[cat] / pageItemShowLength)
    }
    for(let i=1; i<=pageItemLength; i++){
    pageButtonList.innerHTML += `<li class="pagination-item">${i}</li>`
    }
  }
  for(let gnd of gnbData.Product){
    pageButton(gnd)
  }

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
      window.scrollTo(0,0);
    })
  })

})