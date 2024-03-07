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
  itemContentData.forEach(function(ele){
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
      
      if(ele.itemIntroImg == "" ){
        introImg.style.display='none'
      }
      introTitle.innerHTML = ele.itemIntroTitle
      introText.innerHTML = ele.itemIntroText
      introTag.innerHTML = ele.itemIntroTag
    }
  })

  // section2
  const section2Wrap = document.querySelector('.section-2-wrap')
  let veganCode = /*html*/`
  <div class="vegan"> <!-- 비건 -->
    <div class="vegan-wrap">
      <p class="vegan-sub">피부를 위한</p>
      <h3 class="vegan-title">VEGAN RECIPE</h3>
      <p class="vegan-text">
        세계적으로 까다로운 기준의 이탈리아 브이라벨<br>
        (V-LABEL)에서 비건 인증을 받은 제품입니다.<br>
        동물성 원료를 사용하지않아<br>
        피부에 편안한 프리미엄 비건 화장품 입니다.
      </p>
    </div>
  </div>
  `
  let clinicalCode = /*html*/`
  <div class="clinical"> <!-- 저자극 테스트 -->
    <div class="clinical-wrap">
      <p class="clinical-sub">피부를 위한</p>
      <h3 class="clinical-title">CLINICAL TEST</h3>
      <p class="clinical-text">
        달바는 인증 받은 인체적용시험 전문 기관에서<br>
        저자극 테스트를 완료한 제품만을 출시합니다.
      </p>
    </div>
  </div>
  `
  let dermaCode =  /*html*/`
  <div class="derma"> <!-- 더마 테스트 -->
    <div class="derma-wrap">
      <p class="derma-sub">독일 더마 테스트</p>
      <h3 class="derma-title">EXCELLENT</h3>
      <p class="derma-text">
        1978년 설립된 독일 피부과학연구소에서 진행되는<br>
        엄격한 테스트를 통과한 저자극 제품입니다.<br>
        *독일-Germant Dermastest/30명/2021.09.10
      </p>
    </div>
  </div>
  `
  let cleanCode =  /*html*/`
  <div class="clean"> <!-- 서트 클린 -->
    <div class="clean-wrap">
      <p class="clean-sub">서트 클린</p>
      <h3 class="clean-title">CertCLEAN</h3>
      <p class="clean-text">
        1,226가지의 인체에 잠재적으로 영향을 줄 수 있는 화학성분을 심사하는<br>
        캐나다 인증을 완료한 제품입니다.<br>
        *CertClean/2022.02.07
      </p>
    </div>
  </div>
  `

  itemContentData.forEach(function(ele){
    if(ele.id == locationLinkValue){
      ele.section2.forEach((ele)=>{
        switch(ele){
          case 'vegan' : section2Wrap.innerHTML+=veganCode
          break;
          case 'clinical' : section2Wrap.innerHTML+=clinicalCode
          break;
          case 'derma' : section2Wrap.innerHTML+=dermaCode
          break;
          case 'clean' : section2Wrap.innerHTML+=cleanCode
          break;
        }
      })
    }
  })

  // section3
  itemContentData.forEach(function(ele){
    const section3Img = document.querySelector('.section-3 img')
    const section3H3 = document.querySelector('.section-3 h3')
    const section3P = document.querySelector('.section-3 p')
    if(ele.id == locationLinkValue){
      if(ele["section3-img"] != ''){
        section3Img.src = `./assets/images/itemContent/${ele.subclass}/${ele.id}/${ele["section3-img"]}`
      }
      else{
        section3Img.style.display='none'
      }
      section3H3.innerHTML = ele['section3-h3']
      section3P.innerHTML = ele['section3-p']
    }
  })


  // section4
  itemContentData.forEach(function(ele){
    if(ele.id == locationLinkValue){
      const section4Wrap = document.querySelector('.section-4-wrap')
      const contentTitle = document.querySelector('.content-title')
      contentTitle.innerHTML = ele['content-title']      
      for(let content in ele["section4-content"]){
        let contentCode = `
            <div class="content">
            <img src="" alt="content img">
            <div class="content-text">
              <h6>${content['content-h6']}</h6>
              <p>${content['content-p']}</p>
            </div>
          </div>
        `
        section4Wrap.innerHTML += contentCode
      }
    }
  })
  


})