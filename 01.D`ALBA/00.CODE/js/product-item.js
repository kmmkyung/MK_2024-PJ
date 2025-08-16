import itemContentData from '../assets/data/itemContentData.js'
import itemIngredientsData from '../assets/data/itemIngredientsData.js';

let locationLink = location.href;
let locationLinkKey = locationLink.split("?")[1]
let locationLinkValue = locationLinkKey.split("=")[1]

function setImageSafely(imgEl, realSrc, fallbackSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=') {
  if (!imgEl || !realSrc) return;

  imgEl.setAttribute('data-loading', '');
  imgEl.classList.remove('is-loaded');

  const pre = new Image();
  pre.src = realSrc;

  const show = () => {
    imgEl.src = realSrc;
    imgEl.removeAttribute('data-loading');
    imgEl.classList.add('is-loaded');
  };

  (pre.decode ? pre.decode() : Promise.resolve())
    .then(show)
    .catch(() => { pre.onload = show; });

  pre.onerror = () => {
    imgEl.src = fallbackSrc; // 실패 시 폴백
    imgEl.removeAttribute('data-loading');
    imgEl.classList.add('is-loaded');
  };
}


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
    const homeTry = document.querySelector('.item-homeTry')
    const homeTryImg = document.querySelector('.item-homeTry img')
    const introImg = document.querySelector('.item-intro__text img')
    const introTitle = document.querySelector('.item-intro__text .title')
    const introText = document.querySelector('.item-intro__text .text-text')
    const introTag = document.querySelector('.item-intro__text .text-tag')
    if(ele.id == locationLinkValue){
      itemNameH1.innerHTML = ele["name-ko"]
      itemNameH2.innerHTML = ele["name-en"]

      setImageSafely(
        itemNameImg,
        `./assets/images/itemContent/${ele.class}/${ele.id}/${ele["item-images"]}`
      );

      function homeTryImgSize(){
          if(ele["homeTry-pc_img"] && window.innerWidth > 900){
            setImageSafely(homeTryImg, `./assets/images/itemContent/${ele.class}/${ele.id}/${ele["homeTry-pc_img"]}`);
            introTitle.style.marginTop = '100px';
          } else if(ele["homeTry-mobile_img"] && window.innerWidth <= 900){
            setImageSafely(homeTryImg, `./assets/images/itemContent/${ele.class}/${ele.id}/${ele["homeTry-mobile_img"]}`);
            introTitle.style.marginTop = '100px';
          } else {
            homeTry.style.display = 'none';
            homeTryImg.style.display = 'none';
          }
        }
      homeTryImgSize()
      window.addEventListener('resize',homeTryImgSize)

      if(ele["itemIntro-img"] != '' ){
        setImageSafely(
          introImg,
          `./assets/images/itemContent/${ele.class}/${ele.id}/${ele["itemIntro-img"]}`
        );
        introTitle.style.marginTop = 100+'px'
      }
      if(ele["itemIntro-img"] == "" ){
        introImg.style.display='none'
      }
      let tagArr = []
      ele["tag"].forEach(ele=>{
      let tagString = '#'+ele
      tagArr.push(tagString)
    })
      
      introTitle.innerHTML = ele["itemIntro-title"]
      introText.innerHTML = ele["itemIntro-text"]
      introTag.innerHTML = tagArr.join(' ')
    }
  })

  // section2
  const section2 = document.querySelector('.section-2')
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
  let ecocertCode =  /*html*/`
  <div class="ecocert"> <!-- ECOCERT -->
    <div class="ecocert-wrap">
      <img class="ecocert-img" src="./assets/images/itemContent/cosmos_ecocert.png">
      <h3 class="ecocert-title">ECOCERT 인증 완료</h3>
      <p class="ecocert-text">
      <b>100% NATURAL, 97% ORGANIC</b><br><br>
        독일, 프랑스, 이탈리아, 영국 유럽 4개국의 5개 인증 기관에서 연합한<br>
        국제 유기농 화장품 협회(COSMOS-Standard AISBL)의<br>
        엄격하고 까다로운 유기농 심사를 통과해 에코서트를 인증 완료했습니다
      </p>
    </div>
  </div>
  `
  let dermaId95 =  /*html*/`
  <div class="derma"> <!-- 더마 테스트 -->
    <div class="derma-wrap">
      <p class="derma-sub">독일 더마 테스트</p>
      <h3 class="derma-title">EXCELLENT</h3>
      <p class="derma-text">
        1978년 설립된 독일 피부과학연구소에서 진행되는<br>
        엄격한 테스트를 통과한 저자극 제품입니다.<br>
        *독일-Germant Dermastest/30명/2021.09.10
      </p>
      <div class="derma-content2">
        <h3 class="derma-title">탈취 작용 테스트</h3>
        <p class="derma-text">
        향균력 99.9%%<br>달바 필로우 미스트는 불쾌한 냄새를 제거하는<br>탈취 테스트를 완료한 제품입니다.<br><br>KATRI 한국의류시험연구원/황색포도상구균, 폐렴균 99% 감소/2022.12.23
        </p>
      </div>
      <h3 class="derma-title">항균 작용 테스트</h3>
      <p class="derma-text">
        탈취력 99%<br>달바 필로우 미스트는 유해균을 잡아주는<br>항균 테스트를 완료한 제품입니다.<br><br>KOTITI 시험연구원/암모니아, 포름알데히드 99.9% 감소/2022.12.01
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
          case 'ecocert' : section2Wrap.innerHTML+=ecocertCode 
          break;
          case 'dermaId95' : section2Wrap.innerHTML+=dermaId95 
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
        section3Img.src = `./assets/images/itemContent/${ele.class}/${ele.id}/${ele["section3-img"]}`
      }
      if(ele["section3-img"] == ''){
        section3Img.style.display='none'
      }
      section3H3.innerHTML = ele['section3-h3']
      section3P.innerHTML = ele['section3-p']
    }
  })

  // section4
  itemContentData.forEach(function(ele){
    const section4 = document.querySelector('.section-4')
    const section4Wrap = document.querySelector('.section-4-wrap')
    const contentTitle = document.querySelector('.content-title')
    if(ele.id == locationLinkValue){
      contentTitle.innerHTML = ele['content-title']      
      for(let content of ele["section4-content"]){
        let contentCode = `
        <div class="content">
        <img class="content-img" src="./assets/images/itemContent/${ele.class}/${ele.id}/${content['content-img']}">
        <div class="content-text">
          <h6>${content['content-h6']}</h6>
          <p>${content['content-p']}</p>
          </div>
        </div>
        `
        section4Wrap.innerHTML += contentCode
        let contentImg = document.querySelectorAll('.content:last-child .content-img')
        let contentTextLast = document.querySelector('.content:last-child .content-text')
        let contentTextH6Last = document.querySelector('.content:last-child .content-text h6')
        let contentTextPLast = document.querySelector('.content:last-child .content-text p')

        contentImg.forEach((ele,idx)=>{
          if(content['content-img'] == ''){
            contentImg[idx].style.display='none'
          }
        })
        if(content['content-h6'] == ''){
          contentTextH6Last.style.display='none'
        }
        else{
          contentTextLast.style.marginTop = 100+'px'
        }
        if(content['content-p'] == ''){
          contentTextPLast.style.display='none'
        }
        else{
          contentTextLast.style.marginTop = 100+'px'
        }
      }
      
      window.addEventListener('scroll',function(){
        let section4Height = section4.offsetHeight;              
        if(window.scrollY<section4Height*1.5){
          section4.style.backgroundColor = ele["section4-bg"][0]
        }
        if(window.scrollY>=section4Height*1.2){
          section4.style.backgroundColor = ele["section4-bg"][1]
        }
      })
    }
  })
  
  // section5
  const section5 = document.querySelector('.section-5')
  const section5Wrap = document.querySelector('.section-5-wrap')
  let codePatent1 = /*html*/`
  <div class="patent-intro">
    <img src="./assets/images/itemContent/trufferol.jpg" alt="trufferol">
    <h2>EXCLUSIVE<br>INGREDIENT</h2>
  </div>
  <div class="patent-content">
    <div class="content-1">
      <p class="content-1__subTitle">달바 독자적인 특허성분</p>
      <h5 class="content-1__title">Trufferol™</h5>
      <p class="content-1__caption">[특허 제10-2332666호]</p>
      <p class="content-1__text">
        이탈리아산 화이트 트러플과 토코페롤을 황금비율로 배합하여<br>
        달바의 탄력 메커니즘을 완성하는<br>
        핵심 독자 성분 트러페롤™을 개발했습니다.
      </p>
    </div>
    <div class="content-2">
      <h6 class="content-2__title">White Truffle</h6>
      <p class="content-2__subTitle">
        이탈리아산 화이트 트러플<br>
        (흰서양송로추출물)
        </p>
      <div class="plus">
        <div class="plus-row"></div>
        <div class="plus-col"></div>
      </div>
      <h6 class="content-2__title">Tocopherol</h6>
      <p class="content-2__subTitle">비타민E 토코페롤</p>
      <p class="content-2__text">
        d'Alba 독자 성분'트러페롤' 인체적용시험 완료로 확인된 효과<br>
        겉탄력 + 깊은탄력 2중 탄력 개선에 도움
      </p>
      <p class="content-2__caption">
        [한국피부과학연구원, 2020.04.17~2020.06.08, 23명, 사용전, 2주사용후, 4주 사용후,<br>
        피부탄력, 피부 깊은 탄력개선 평가 비교, 개인차있음]<br>
        *성분 특성에 한함
      </p>
    </div>
  </div>
  `
  let codePatent2 = /*html*/`
  <div class="patent-intro">
    <img src="./assets/images/itemContent/trupair.jpg" alt="trupair">
    <h2>EXCLUSIVE<br>INGREDIENT</h2>
  </div>
  <div class="patent-content">
    <div class="content-1">
      <h5 class="content-1__title">Trupair™</h5>
      <p class="content-1__text">
      [흰서양송로추출물, 병풀추출물, 마데카소사이드, 아시아티코사이드, 아시아틱애씨드]
      </p>
    </div>
    <div class="content-2">
      <p class="content-2__text">
      미네랄 성분이 풍부한 이탈리아산 화이트 트러플,<br>
      수확 후 2일 이내의 생병풀에서 추출하여 신선한 병풀추출물,<br>
      <br>
      3가지 CICA 성분을 황금 비율로 배합하여<br>
      달바의 진정 메커니즘을 완성하는 핵심 진성 성분
      </p>
    </div>
  </div>
  `
let codePatent3 = /*html*/`
  <div class="patent-intro">
    <img src="./assets/images/itemContent/fragrance.jpg" alt="fragrance">
    <h2>EXCLUSIVE<br>INGREDIENT</h2>
  </div>
  <div class="patent-content">
    <div class="content-1">
      <p class="content-1__subTitle">달바만의 세련된</p>
      <h5 class="content-1__title">FRAGRANCE</h5>
      <p class="content-1__text">
        이탈리아산 명품 원료 레몬오일이 함유되어<br>
        우아한 자연의 움직임과 유려한 싱그러움을<br>
        본연 그대로 느낄 수 있습니다.
      </p>
    </div>
    <div class="content-2">
      <h6 class="content-2__title">italy lemon oil</h6>
      <p class="content-2__subTitle">이탈리아산 레몬 오일</p>
    </div>
  </div>
`
let codePatent4 = /*html*/`
<div class="patent-intro">
  <img src="./assets/images/itemContent/Triple.jpg" alt="trufferol">
  <h2>EXCLUSIVE<br>INGREDIENT</h2>
</div>
<div class="patent-content">
  <div class="content-1">
    <p class="content-1__subTitle">달바의 세련된</p>
    <h5 class="content-1__title">Triple Essential Oil</h5>
    <p class="content-1__text">
      식물성 에센셜 오일을 블렌딩하여 만든<br>‘Triple essential oil’ 처방으로<br>향이 머무른 자리에 선연하게 안도감을 남겨줍니다.
    </p>
  </div>
  <div class="content-2">
    <h6 class="content-2__title">Lavandula Hybrida Oil</h6>
    <p class="content-2__subTitle">(라벤더 오일)</p>
    <p class="content-2__text">편안한 분위기 속 휴식을 도움</p>
    <div class="plus">
      <div class="plus-row"></div>
      <div class="plus-col"></div>
    </div>
    <h6 class="content-2__title">Salvia Sclarea(Clary) Oil</h6>
    <p class="content-2__subTitle">(클라리 세이지 오일)</p>
    <p class="content-2__text">신체와 감정의 균형 유지</p>
    <div class="plus">
      <div class="plus-row"></div>
      <div class="plus-col"></div>
    </div>
    <h6 class="content-2__title">Eucalyptus Globulus Leaf Oil</h6>
    <p class="content-2__subTitle">(유칼립투스 오일)</p>
    <p class="content-2__text">낯선 환경에서 익숙함과 안심 조성</p>
  </div>
</div>
`
  itemContentData.forEach(function(ele){
    if(ele.id == locationLinkValue){
      if(ele.patent === 'Trufferol'){
        section5Wrap.innerHTML = codePatent1;
      }
      if(ele.patent === 'Trupair'){
        section5Wrap.innerHTML = codePatent2;
      }
      if(ele.patent === 'Fragrance'){
        section5Wrap.innerHTML = codePatent3;
      }
      if(ele.patent === 'Triple'){
        section5Wrap.innerHTML = codePatent4;
      }
      if(ele.patent == ''){
        section5.style.display = 'none';
      }
    }
  })

  // section6
  itemContentData.forEach(function(ele){
    if(ele.id == locationLinkValue){
    const section6 = document.querySelector('.section-6')
    // const section6Img = document.querySelector('.section-6 .section-6__bg')
    const section6Bg = document.querySelector('.section-6 .section-6__bg')
    const section6H5 =  document.querySelector('.section-6 h5')
    const ingredientsTitleUl = document.querySelector('.ingredients-title__list')
    const ingredientsTextUl = document.querySelector('.ingredients-text__list')
    let ingredientsTitleCode = /*html*/``      
    let ingredientsTextCode = /*html*/``      
    if(ele.id == locationLinkValue){
      if(ele['ingredients-item'] == ""){
        section6.style.display='none'
      }
      if(ele['ingredients-item'] != ""){
        section6H5.innerHTML = ele["ingredients-h5"]
        for(let list in itemIngredientsData){
          for(let i = 0; i<ele['ingredients-item'].length; i++){
            if(list == ele['ingredients-item'][i]){              
              ingredientsTitleCode += `<li class="list-item"><a href="javascript:void(0)">${itemIngredientsData[list]["ingredients-title"]}</a></li>` 
              
            }
          }
          ingredientsTitleUl.innerHTML = ingredientsTitleCode
        }
        
        const ingredientsLiA = document.querySelectorAll('.ingredients-title__list .list-item a')
        window.addEventListener('load',section5BgSize)
        function section5BgSize(){
          if(window.innerWidth>900){
            // section6Img.src = `./assets/images/itemContent/ingredients/${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-bg__pc"]}`
            section6Bg.style.backgroundImage = `url(./assets/images/itemContent/ingredients/${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-bg__pc"]})`
          }
          else{
            // section6Img.src = `./assets/images/itemContent/ingredients/${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-bg__mobile"]}`
            section6Bg.style.backgroundImage = `url(./assets/images/itemContent/ingredients/${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-bg__mobile"]})`
          }
        }
        ingredientsLiA[0].classList.add('active')
        ingredientsTextCode += `
        <li class="list-item" >
        <h6 class="text-title">${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-title"]}</h6>
        <p class="text-ingredients">${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-text"]}</p>
        <p class="text-caption">${itemIngredientsData[ingredientsLiA[0].textContent]["ingredients-caption"]}</p>
        </li>
        `
        ingredientsTextUl.innerHTML = ingredientsTextCode

        ingredientsLiA.forEach(function(item){
          item.addEventListener('click',function(event){
            if(window.innerWidth>900){
              // section6Img.src = `./assets/images/itemContent/ingredients/${itemIngredientsData[event.target.textContent]["ingredients-bg__pc"]}`
              section6Bg.style.backgroundImage = `url(./assets/images/itemContent/ingredients/${itemIngredientsData[event.target.textContent]["ingredients-bg__pc"]})`
            }
            else{
              // section6Img.src = `./assets/images/itemContent/ingredients/${itemIngredientsData[event.target.textContent]["ingredients-bg__mobile"]}`
              section6Bg.style.backgroundImage = `url(./assets/images/itemContent/ingredients/${itemIngredientsData[event.target.textContent]["ingredients-bg__mobile"]})`
            }
            let liActive = document.querySelector('.ingredients-title__list .list-item a.active')
            let ingredientsTextCodeChange = `
            <li class="list-item" >
            <h6 class="text-title">${itemIngredientsData[event.target.textContent]["ingredients-title"]}</h6>
            <p class="text-ingredients">${itemIngredientsData[event.target.textContent]["ingredients-text"]}</p>
            <p class="text-caption">${itemIngredientsData[event.target.textContent]["ingredients-caption"]}</p>
            </li>
            `
            ingredientsTextUl.innerHTML = ingredientsTextCodeChange
            if(liActive.classList.contains('active')){
              liActive.classList.remove('active')
              event.target.classList.add('active')
            }
          })
        })
      }
    }

      window.addEventListener('resize',section5BgSize2)
      function section5BgSize2(){
        let liActive = document.querySelector('.ingredients-title__list .list-item a.active')
        if(window.innerWidth>900){
          // section6Img.src = `./assets/images/itemContent/ingredients/${itemIngredientsData[liActive.textContent]["ingredients-bg__pc"]}`
          section6Bg.style.backgroundImage = `url(./assets/images/itemContent/ingredients/${itemIngredientsData[liActive.textContent]["ingredients-bg__pc"]})`
        }
        else{
          // section6Img.src = `./assets/images/itemContent/ingredients/${itemIngredientsData[liActive.textContent]["ingredients-bg__mobile"]}`
          section6Bg.style.backgroundImage = `url(./assets/images/itemContent/ingredients/${itemIngredientsData[liActive.textContent]["ingredients-bg__mobile"]})`
        }
      }
    } //// if
  }) //// itemContentData

  // section7
  itemContentData.forEach(function(ele){
    const section7 = document.querySelector('.section-7')
    const section7Img = document.querySelector('.section-7 img')
    if(ele.id == locationLinkValue){
      if(ele["section7-img"] !== ''){
        section7Img.src = `./assets/images/itemContent/${ele.class}/${ele.id}/${ele["section7-img"]}`
      }
      if(ele["section7-img"] == ''){
        section7.style.display='none'
      }
    }
  })

  // section8
  itemContentData.forEach(function(ele,idx){
    if(ele.id == locationLinkValue){
      // Use
      const infoUse = document.querySelector('.info-use')
      const infoUseUl= document.querySelector('.info-use__list')
      const infoUseTItle = document.querySelector('.info-title')
      const infoUseUse = document.querySelector('.info-use__use')
      const infoUseTip = document.querySelector('.info-use__tip')
      const infoUseSubTitle = document.querySelectorAll('.info-use__subTitle')
      const infoUseText = document.querySelectorAll('.info-use__text')
      let useClick = [0,0];
      infoUseUse.innerHTML = ele["infoUse"]
      infoUseTip.innerHTML = ele["infoTip"]
      infoUseTItle.addEventListener('click',function(){
        infoUse.classList.toggle('active')
        if(infoUse.classList.contains('active')){
          infoUseUl.style.height = infoUseUl.scrollHeight+'px'
        }
        else{
          infoUseUl.style.height = 0
        }
      })

      infoUseSubTitle.forEach((ele,idx)=>{
        ele.addEventListener('click',function(){
          useClick[idx]++;
          if(useClick[idx]%2 == 0){
            ele.classList.remove('active')
            infoUseText[idx].classList.remove('active')
            infoUseText[idx].style.height = 0
          }
          else{
            ele.classList.add('active')
            infoUseUl.style.height = 'auto'
            infoUseText[idx].classList.add('active')
            infoUseText[idx].style.height = infoUseText[idx].scrollHeight+'px'
          }
        })
      })
      
      // tested
      const infoTested = document.querySelector('.info-tested')    
      const infoTestedTitle = document.querySelector('.info-tested .info-title')
      const infoTestedUl = document.querySelector('.info-tested ul')    
      let infoTestedCode = ``;
      infoTestedTitle.addEventListener('click',function(){
        infoTested.classList.toggle('active')
        if(infoTested.classList.contains('active')){
          infoTestedUl.style.height = infoTestedUl.scrollHeight+'px'
        }
        else{
          infoTestedUl.style.height = 0
        }
      })

      for(let item of itemContentData[idx]['infoTested-item']){  
        infoTestedCode += `
        <li class="info-tested__item">
        <p class="info-tested__title">${Object.keys(item)}</p>
        <div class="info-tested__text">${item[Object.keys(item)]}</div>
        </li>
        ` 
      }
      infoTestedUl.innerHTML = infoTestedCode

      const infoTestedLi = document.querySelectorAll('.info-tested ul li')
      let testedClick = []
      for(let i = 0; i<infoTestedLi.length; i++){
        testedClick.push(0)
      }      

      const infoTestedItemTitle = document.querySelectorAll('.info-tested__title')    
      const infoTestedText = document.querySelectorAll('.info-tested__text')
      infoTestedItemTitle.forEach((ele,idx)=>{
        ele.addEventListener('click',function(){
          testedClick[idx]++;
          if(testedClick[idx]%2 == 0){
            ele.classList.remove('active')
            infoTestedText[idx].classList.remove('active')
            infoTestedText[idx].style.height = 0
          }
          else{
            ele.classList.add('active')
            infoTestedUl.style.height = 'auto'
            infoTestedText[idx].classList.add('active')
            infoTestedText[idx].style.height = infoTestedText[idx].scrollHeight+'px'
          }
        })
      })

      // ingredients
      const infoIngredients = document.querySelector('.info-ingredients')
      const infoIngredientsTitle = document.querySelector('.info-ingredients .info-title')
      const infoIngredientsUl = document.querySelector('.info-ingredients ul')
      const infoIngredientsTextWrap = document.querySelector('.info-ingredients__textWrap')
      const infoIngredientsWrap = document.querySelector('.info-ingredients__wrap')
      let infoIngredientCode1 = ``;
      let infoIngredientCode2 = ``;

      for(let item of itemContentData[idx]['infoIngredients-item']){ 
        infoIngredientCode1 += `
        <li class="info-ingredients__item">
          <p class="info-ingredients__subTitle">${Object.keys(item)}</p>
        </li>
        `
        infoIngredientCode2 += `
        <div class="info-ingredients__text">${item[Object.keys(item)]}</div>
        `
      }
      infoIngredientsUl.innerHTML = infoIngredientCode1
      infoIngredientsTextWrap.innerHTML = infoIngredientCode2


      const infoIngredientsSubTitle = document.querySelectorAll('.info-ingredients__subTitle')
      const infoIngredientsText = document.querySelectorAll('.info-ingredients__text')
      if(ele['infoIngredients-item'] != ''){
        infoIngredientsSubTitle[0].classList.add('active')
        infoIngredientsText[0].classList.add('active')
      }

      infoIngredientsTitle.addEventListener('click',function(){
        infoIngredients.classList.toggle('active')
        if(infoIngredients.classList.contains('active')){
          infoIngredientsWrap.style.height = infoIngredientsWrap.scrollHeight+'px'
        }
        else{
          infoIngredientsWrap.style.height = 0
        }
      })
      infoIngredientsSubTitle.forEach(function(ele,idx){
        ele.addEventListener('click',function(event){
          let itemActive = document.querySelector('.info-ingredients__subTitle.active')
          let itemTextActive = document.querySelector('.info-ingredients__text.active')
          ele.classList.add('active')
          infoIngredientsText[idx].classList.add('active')
          if(itemActive.classList.contains('active') && itemActive !== event.target){
            itemActive.classList.remove('active')
            itemTextActive.classList.remove('active')
            event.target.classList.add('active')
          }
        })
      })



      // product
      if( ele.id == 80){
        const productContentWrap = document.querySelector('.info-product__contentWrap')
        let idCode80 = `
          <p class="product-name info-product__content">
            <span class="info-product__subtitle">제품명 :</span>
            <span class="name"></span>
          </p>
          <p class="product-capacity  info-product__content">
            <span class="info-product__subtitle">용도 :</span>
            <span class="capacity">마사지 기구</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">재질:</span>
            <span>도자기(세라믹)</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">사용 방법:</span>
            <span>사용 전, 마사지가 필요한 부위에 오일 또는 크림을 도포한 뒤<br>
            괄사를 이용해 지그시 누르고 부드럽게 문질러 줍니다.<br>*제품 사용 후에는 괄사에 남아있는 오일과 크림을 닦아낸 후 보관해주세요.</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">제조자 및 책임판매업자 :</span>
            <span>(주)비앤비코리아 / (주)비모뉴먼트</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">제조국:</span>
            <span>대한민국</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">기능성 화장품 안전성 심사 필 유무 :</span>
            <span>기능성 화장품 / 화장품법에 따른 기능성 화장품 심사(또는 보고)를 필함</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">사용할 때의 주의사항 :</span>
            <span>1. 마사지 이외의 다른 용도로 사용하지 마십시오.</span>
            <span>2. 제품의 바닥면으로 마사지 하지 마십시오.</span>
            <span>3. 무리하게 힘을 주어 사용하지 마십시오.</span>
            <span>4. 너무 심하게 사용할 경우 부상, 피부 손상이 될 수 있으니 강도를 조절해서 사용하십시오.</span>
            <span>5. 어린이 및 영/유아 손에 닿지 않는 곳에서 보관하십시오.</span>
            <span>6. 타인에게 던지거나 제품 충격, 파손에 주의하십시오.</span>
            <span>7. 열기(직화열 포함) 및 화기, 화학약품, 직사광선, 떨어트림 등의 노출에 주의하십시오.</span>
            <span>8. 파손된 제품은 절대 다시 사용하시 마십시오.</span>
            <span>9. 상처가 있는 부위에 사용하지 마십시오.</span>
            <span>10. 본 제품은 의료기기가 아닌 일반 공산품입니다.</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">품질보증기준 :</span>
            <span>본 상품에 이상이 있을 경우 공정거래 위원회 고시 “소비자 분쟁 해결기준”에 의해 교환 또는 보상해 드립니다.</span>
          </p>
          <p class="info-product__content">
            <span class="info-product__subtitle">소비자 상담 관련 전화번호 :</span>
            <span>02-332-7727</span>
          </p>  
        `
        productContentWrap.innerHTML = idCode80 
      }
      const infoProduct = document.querySelector('.info-product')
      const infoProductTitle = document.querySelector('.info-product .info-title')
      const infoProductContentWrap = document.querySelector('.info-product .info-product__contentWrap')
      const infoProductName =  document.querySelector('.product-name .name')
      const infoProductCapacity =  document.querySelector('.product-capacity .capacity')
      let capacityString = " / "
      let capacityArr = ele.capacity.join(capacityString)
      infoProductName.innerHTML = ele['name-ko'];
      infoProductCapacity.innerHTML = capacityArr;

      infoProductTitle.addEventListener('click',function(){
        infoProduct.classList.toggle('active')
        if(infoProduct.classList.contains('active')){
          infoProductContentWrap.style.height = infoProductContentWrap.scrollHeight+'px'
        }
        else{
          infoProductContentWrap.style.height = 0
        }
      })

      // shipping
      const infoShipping = document.querySelector('.info-shipping')
      const infoShippingTitle = document.querySelector('.info-shipping .info-title')
      const infoShippingContentWrap = document.querySelector('.info-shipping__contentWrap')

      infoShippingTitle.addEventListener('click',function(){
        infoShipping.classList.toggle('active')
        if(infoShipping.classList.contains('active')){
          infoShippingContentWrap.style.height = infoShippingContentWrap.scrollHeight+'px'
        }
        else{
          infoShippingContentWrap.style.height = 0
        }
      })
      const shippingH2 = document.querySelector('.buy-window__item h2')
      const shippingPrice = document.querySelector('.buy-window__item p')
      if(ele.id == locationLinkValue){
        shippingH2.innerHTML = ele['name-ko']
        shippingPrice.innerHTML = `KRW ${ele['price']}`
      }

      const shippingCapacity = document.querySelector('.buy-window__input ol') 
      let shippingCapacityCode = ``
      ele.capacity.forEach(item=>{
        shippingCapacityCode += `<li>${item}</li>`
      })
      console.log(shippingCapacityCode);
      
      shippingCapacity.innerHTML = shippingCapacityCode
    }
  })
})