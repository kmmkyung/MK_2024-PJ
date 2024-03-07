import itemContentData from '../assets/data/itemContentData.js'

let locationLink = location.href;
let locationLinkKey = locationLink.split("?")[1]
let locationLinkValue = locationLinkKey.split("=")[1]

window.addEventListener('DOMContentLoaded',function(){
  // section-buy
  const buyButton = document.querySelector('.button-list .buy')
  const noBuyWin = document.querySelector('.no-buy-window')
  const buyWin = document.querySelector('.buy-window')
  const inputSelect = document.querySelector('.input-select')
  let inputSelectOl = document.querySelector('.buy-window__input ol')
  let inputSelectLi = document.querySelectorAll('.buy-window__input ol li')
  let inputClick = 0;
  buyButton.addEventListener('click',function(){
    buyWin.classList.add('active')
    noBuyWin.style.display = 'block'
  })
  noBuyWin.addEventListener('click',function(){
    buyWin.classList.remove('active')
    noBuyWin.style.display = 'none'
  })
  inputSelect.addEventListener('click',function(){
    inputSelectOl.style.height = inputSelectOl.scrollHeight+'px'
  })
  inputSelectLi.forEach(ele=>{
    ele.addEventListener('click',function(){
      inputSelect.textContent = ele.textContent
      inputSelectOl.style.height = 0
    })
  })
  window.addEventListener('click',function(event){
    if(inputSelect != event.target){
      inputSelectOl.style.height = 0
    }
  })

  // section1
  itemContentData.forEach(function(ele,idx){
    const itemNameH1 = document.querySelector('.item-name h1')
    const itemNameH2 = document.querySelector('.item-name h2')
    const itemNameImg = document.querySelector('.item-name img')
    const introImg = document.querySelector('.item-intro__text img')
    const introTitle = document.querySelector('.item-intro__text .title')
    const introText = document.querySelector('.item-intro__text .text-text')
    const introTag = document.querySelector('.item-intro__text .text-tag')
    if(ele.id == locationLinkValue){
      itemNameH1.innerHTML = ele.nameKo
      itemNameH2.innerHTML = ele.nameEn
      itemNameImg.src = `./assets/images/itemContent/${ele.subclass}/${ele.id}/${ele.itemImages}`
      if(ele.itemIntroImg != '' ){
        introImg.src = `./assets/images/itemContent/${ele.subclass}/${ele.id}/${ele.itemIntroImg}`
      }
      else{
        introImg.style.display='none'
      }
      introTitle.innerHTML = ele.itemIntroTitle
      introText.innerHTML = ele.itemIntroText
      introTag.innerHTML = ele.itemIntroTag
    }
  })





})