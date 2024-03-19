import collectionData from '../assets/data/collectionData.js'

let locationLink = location.href;
let locationLinkKey = locationLink.split("?")[1]
let locationLinkValue = locationLinkKey.split("=")[1]

window.addEventListener('DOMContentLoaded',function(){

  // 데이터 넣기
  const body = document.querySelector('body')
  if(locationLinkValue=='antioxidant' || locationLinkValue=='vegan'){
    body.classList.add('white')
    body.classList.add('blackMenu')
  }
  if(locationLinkValue=='moisture' || locationLinkValue=='relax' || locationLinkValue=='clinic'){
    body.classList.add('black')
    body.classList.add('whiteMenu')
  }

  const section1 = document.querySelector('.section-1')
  const section1h6 = document.querySelector('.section-1 h6')
  const section1h1 = document.querySelector('.section-1 h1')
  const section1p = document.querySelector('.section-1 p')
  const section1img = document.querySelector('.section-1 img')
  window.addEventListener("resize",bgChange1)
  window.addEventListener("load",bgChange1)
  function bgChange1(){
    if(window.innerWidth<=900){
      section1.style.backgroundImage = `url(./assets/images/collection/mobile_${collectionData[locationLinkValue]["section-1_bg"]})`
    }
    if(window.innerWidth>900){
      section1.style.backgroundImage = `url(./assets/images/collection/${collectionData[locationLinkValue]["section-1_bg"]})`
    }
  }
  section1.style.color = collectionData[locationLinkValue]["section-1_color"]
  section1h6.innerHTML = collectionData[locationLinkValue]["section-1_h6"]
  section1h1.innerHTML = collectionData[locationLinkValue]["section-1_h1"]
  section1p.innerHTML = collectionData[locationLinkValue]["section-1_p"]
  section1img.src = collectionData[locationLinkValue]["section-1_logo"]
    section1img.addEventListener('error',()=>{
      section1img.style.display='none'
    })

  const section2 = document.querySelector('.section-2')
  const section2ul = document.querySelector('.section-2 .swiper-wrapper')
  const section2p1 = document.querySelector('.section-2 .content-text .content-text__1')
  const section2p2 = document.querySelector('.section-2 .content-text .content-text__2')
  const section2caption = document.querySelector('.section-2 .content-text .content-text__caption')
  window.addEventListener('scroll',function(){
    let section2Height = section2.offsetHeight;
    if(window.scrollY<section2Height){
      section2.style.backgroundColor = collectionData[locationLinkValue]["section-2_bgColor"][0]
    }
    if(window.scrollY>=section2Height){
      section2.style.backgroundColor = collectionData[locationLinkValue]["section-2_bgColor"][1]
      section2.style.transition = 'background-color 2s'
    }
  })
  collectionData[locationLinkValue]["section-2_slide"].forEach(element => {
    let section2li = `
    <li class="swiper-slide">
      <img src="./assets/images/collection/${element}">
    </li>
    `
    section2ul.innerHTML += section2li;
  });
  section2p2.innerHTML = collectionData[locationLinkValue]["section-2_text2"]
  section2p1.innerHTML = collectionData[locationLinkValue]["section-2_text1"]
  section2p2.innerHTML = collectionData[locationLinkValue]["section-2_text2"]
  section2caption.innerHTML = collectionData[locationLinkValue]["section-2_caption"]
  const swiper1 = new Swiper('.section-2__swiper',{
    direction: 'horizontal',
    loop: true,
      effect:'fade',
      fadeEffect: { crossFade: true },
      navigation:{
        prevEl: '.section-2__navigation-button-prev',
        nextEl: '.section-2__navigation-button-next',
      },
      pagination: {
        el: '.section-2__swiper .swiper-pagination',
        clickable: true
      },
    })

  const section3 = document.querySelector('.section-3')
  function bgChange2(){
    if(window.innerWidth<=900){
      section3.style.backgroundImage = `url(./assets/images/collection/mobile_${collectionData[locationLinkValue]["section-3_bg"]})`
    }
    if(window.innerWidth>900){
      section3.style.backgroundImage = `url(./assets/images/collection/${collectionData[locationLinkValue]["section-3_bg"]})`
    }
  }
  window.addEventListener("resize",bgChange2)
  window.addEventListener("load",bgChange2)

  const section4 = document.querySelector('.section-4')
  const section4Content = document.querySelector('.section-4 .content-all')
  const section4h2 = document.querySelector('.section-4 h2')
  const section4p = document.querySelector('.section-4 p')
  const section4caption = document.querySelector('.section-4 span')
  section4.style.backgroundImage = `url(./assets/images/collection/${collectionData[locationLinkValue]["section-4_bg"]})`
  section4Content.style.color = collectionData[locationLinkValue]["section-4_textColor"]
  section4Content.style[collectionData[locationLinkValue]["section-4_position"]] = '10%'
  section4h2.innerHTML = collectionData[locationLinkValue]["section-4_h2"]
  section4p.innerHTML = collectionData[locationLinkValue]["section-4_p"]
  section4caption.innerHTML = collectionData[locationLinkValue]["section-4_span"]
  function bgChange3(){
    if(locationLinkValue=='moisture' || locationLinkValue=='relax' || locationLinkValue=='clinic'){
        if(window.innerWidth<=900){
          section4.style.backgroundImage = `url(./assets/images/collection/mobile_${collectionData[locationLinkValue]["section-4_bg"]})`
        }
        if(window.innerWidth>900){
          section4.style.backgroundImage = `url(./assets/images/collection/${collectionData[locationLinkValue]["section-4_bg"]})`
        }
      }
    else{
      section4.style.backgroundImage = `url(./assets/images/collection/${collectionData[locationLinkValue]["section-4_bg"]})`
    }
  }
  window.addEventListener("resize",bgChange3)
  window.addEventListener("load",bgChange3)

  const section5 = document.querySelector('.section-5')
  const section5ContentAll = document.querySelector('.section-5 .content-all')
  let section5Title = collectionData[locationLinkValue]["section-5_title"]
  let section5Img = collectionData[locationLinkValue]["section-5_img"]
  let section5List
  let section5Ul = document.querySelector('.section-5 .swiper-wrapper')
  let section5Li
  let section5h6 = collectionData[locationLinkValue]["section-5_h6"]
  let section5p = collectionData[locationLinkValue]["section-5_p"]
  let section5Link = collectionData[locationLinkValue]["section-5_link"]
  section5.style.backgroundImage = `url(${collectionData[locationLinkValue]["section-5_bg"]})`
  section5Title.forEach(function(ele,idx){
    section5List=`
    <span class="content-${idx+1} content">
      <span class="content-title font_freightDisplay">${ele}</span>
      <span class="content-img">
        <img src="./assets/images/collection/${section5Img[idx]}" alt="제품이미지">
      </span>
    </span>
    `
    section5ContentAll.innerHTML += section5List;
  })
  section5h6.forEach(function(ele,idx){
    section5Li = `
      <li class="swiper-slide">
        <h6>${ele}</h6>
        <p>${section5p[idx]}</p>
        <a href="${section5Link[idx]}">구매하기</a>
      </li>
    `
    section5Ul.innerHTML += section5Li;
  })
  const section5TextAll = document.querySelectorAll('.content-all .content')
  const section5Text = document.querySelectorAll('.content-all .content-title')
  const swiper2 = new Swiper('.section-5__swiper',{
    direction: 'horizontal',
    loop: true,
    effect:'fade',
    fadeEffect: { crossFade: true },
    navigation:{
      nextEl: '.section-5__navigation-button-next',
      prevEl: '.section-5__navigation-button-prev',
    }
  })
  section5TextAll[0].classList.add('active')
  swiper2.on('realIndexChange', function(){
    let findActiveAll = document.querySelector('.content-all .content.active')
    section5TextAll[this.realIndex].classList.add('active')
    if(section5TextAll[this.realIndex].classList.contains('active')){
      findActiveAll.classList.remove('active')
    }
  });
  section5Text.forEach(function(ele,idx){
    ele.addEventListener('click',function(){
      swiper2.slideTo(idx)
    })
  })

  const section6 = document.querySelector('.section-6')
  const section6theme = document.querySelectorAll('.section-6 .theme-list')
  section6theme.forEach(function(ele,idx){
    ele.style.backgroundImage=`url(${collectionData[locationLinkValue]["section-6_page"+idx].bg})`
    ele.style.color=collectionData[locationLinkValue]["section-6_page"+idx].color
    let section6themeList = `
      <h2>${collectionData[locationLinkValue]["section-6_page"+idx].h2}</h2>
      <h5>${collectionData[locationLinkValue]["section-6_page"+idx].h5}</h5>
      <p>${collectionData[locationLinkValue]["section-6_page"+idx].p}</p>
    `
    ele.innerHTML = section6themeList;
    ele.addEventListener('click',function(){
      location.href="collection-theme.html?collection="+collectionData[locationLinkValue]["section-6_page"+idx].link
    })
  })
})