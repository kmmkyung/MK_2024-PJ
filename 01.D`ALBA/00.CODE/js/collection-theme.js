import collectionLinkData from '../assets/data/collectionLinkData.js'


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
  section1.style.backgroundImage = `url(${collectionLinkData[locationLinkValue]["section-1_bg"]})`
  section1.style.color = collectionLinkData[locationLinkValue]["section-1_color"]
  section1h6.innerHTML = collectionLinkData[locationLinkValue]["section-1_h6"]
  section1h1.innerHTML = collectionLinkData[locationLinkValue]["section-1_h1"]
  section1p.innerHTML = collectionLinkData[locationLinkValue]["section-1_p"]
  section1img.src = collectionLinkData[locationLinkValue]["section-1_logo"]
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
    if(window.scrollY>=section2Height){
      section2.style.backgroundColor = collectionLinkData[locationLinkValue]["section-2_bgColor"][1]
    }
    else{
      section2.style.backgroundColor = collectionLinkData[locationLinkValue]["section-2_bgColor"][0]
    }
  })

  collectionLinkData[locationLinkValue]["section-2_slide"].forEach(element => {
    let section2li = `
    <li class="swiper-slide">
      <img src="./assets/images/collection/${element}">
    </li>
    `
    
    section2ul.innerHTML += section2li;
  });
  section2p2.innerHTML = collectionLinkData[locationLinkValue]["section-2_text2"]
  section2p1.innerHTML = collectionLinkData[locationLinkValue]["section-2_text1"]
  section2p2.innerHTML = collectionLinkData[locationLinkValue]["section-2_text2"]
  section2caption.innerHTML = collectionLinkData[locationLinkValue]["section-2_caption"]







  
  const swiper1 = new Swiper('.section-2__swiper',{
    direction: 'horizontal',
    loop: true,
    // autoplay: {
      //   delay: 3000,
      // },
      effect:'fade',
      fadeEffect: { crossFade: true },
      navigation:{
        nextEl: '.section-2__navigation-button-next',
        prevEl: '.section-2__navigation-button-prev',
      },
      pagination: {
        el: '.section-2__swiper .swiper-pagination',
        clickable: true
      },
    })

    const swiper2 = new Swiper('.section-5__swiper',{
    direction: 'horizontal',
    loop: true,
    // autoplay: {
      //   delay: 3000,
      // },
      effect:'fade',
      fadeEffect: { crossFade: true },
      navigation:{
        nextEl: '.section-5__navigation-button-next',
        prevEl: '.section-5__navigation-button-prev',
      }
    })


})