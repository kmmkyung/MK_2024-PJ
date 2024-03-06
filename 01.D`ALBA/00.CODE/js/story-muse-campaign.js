import museCampaignData from '../assets/data/museCampaignData.js'

let locationLink = location.href;
let locationLinkKey = locationLink.split("?")[1]
let locationLinkValue = locationLinkKey.split("=")[1]

window.addEventListener('DOMContentLoaded',function(){

  // section1
  const section1Video = document.querySelector('.section-1 video')
  const section1h6 = document.querySelector('.section-1-content h6')
  const section1h1 = document.querySelector('.section-1-content h1')
  const section1p = document.querySelector('.section-1-content p')
  console.log(window.innerWidth);
  
  function sizeImg(){
    if(window.innerWidth>900){
      section1Video.poster = `./assets/images/muse/${museCampaignData[locationLinkValue]["section1-videoPoster"]}`
      section2.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section2-bg"]})`
      section5.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section5-bg"]})`
      section6.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section6-bg"]})`
    }
    else{
      section1Video.poster = `./assets/images/muse/${museCampaignData[locationLinkValue]["section1-videoPoster_mobile"]}`
      section2.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section2-bg_mobile"]})`
      section5.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section5-bg_mobile"]})`
      section6.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section6-bg_mobile"]})`
    }
  }

  window.addEventListener('resize',sizeImg)
  window.addEventListener('load',sizeImg)

  section1Video.src = `./assets/images/muse/${museCampaignData[locationLinkValue]["section1-video"]}`
  // setTimeout(function(){
  //   section1Video.play()
  // },1500)
  section1h6.innerHTML=museCampaignData[locationLinkValue]["section1-h6"]
  section1h1.innerHTML=museCampaignData[locationLinkValue]["section1-h1"]
  section1p.innerHTML=museCampaignData[locationLinkValue]["section1-p"]

  // section2
  const section2 = document.querySelector('.section-2')
  const section2Content = document.querySelector('.section-2-content')
  const section2h2 = document.querySelector('.section-2-content h2')
  const section2p = document.querySelector('.section-2-content p')
  section2h2.innerHTML=museCampaignData[locationLinkValue]["section2-h2"]
  section2p.innerHTML=museCampaignData[locationLinkValue]["section2-p"]
  switch(locationLinkValue){
    case 'muse1' : section2Content.classList.add('muse1');
    break;
    case 'muse2' : section2Content.classList.add('muse2');
    break;
    case 'muse3' : section2Content.classList.add('muse3');
    break;
    case 'muse4' : section2Content.classList.add('muse4');
    break;
    case 'muse5' : section2Content.classList.add('muse5');
    break;
  }

  const section3 = document.querySelector('.section-3')
  const section3Ul = document.querySelector('.muse-list')
  switch(locationLinkValue){
    case 'muse5' : section3.classList.add('muse5');
    break;
  }
  section3.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section3-bg"]})`
  museCampaignData[locationLinkValue]["section-3-item"].forEach(function(ele){
    let section3Li = `<li class="swiper-slide list-item">
      <img src="./assets/images/muse/${ele}">
    </li>`
    section3Ul.innerHTML += section3Li;
  })

  const swiper1 = new Swiper('.muse-section3__swiper',{
    direction: 'horizontal',
    loop: true,
    effect:'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.muse-section3__swiper .swiper-pagination',
      clickable: true
    },
  })

  const section4 = document.querySelector('.section-4')
  switch(locationLinkValue){
    case 'muse5' : section4.classList.add('muse5');
    break;
  }
  const section4P = document.querySelector('.section-4-text p')
  const section4H6 = document.querySelector('.section-4-text h6')
  const sectionUl = document.querySelector('.section-4 .product-list')

  function section4Swiper(){
  museCampaignData[locationLinkValue]["section4-li"].forEach(ele=>{      
    let sectionLi = /* html */`
    <li class="swiper-slide list-item">
      <div class="list-item__wrap">
        <div class="item-content__top">
          <h6 class="item-content__name">${ele.name}</h6>
          <p class="item-content__price">${ele.price}</p>
        </div>
        <img class="item-content__img" src="./assets/images/muse/${ele.img}">
        <div class="item-content__bottom">
          <p class="item-content__tag">${ele.tag}</p>
          <p class="item-content__capacity">${ele.capacity}</p>
        </div>
      </div>
    </li>
    `
    sectionUl.innerHTML += sectionLi;
  })
}
  section4P.innerHTML=museCampaignData[locationLinkValue]["section4-p"]
  section4H6.innerHTML=museCampaignData[locationLinkValue]["section4-h6"]
  section4Swiper()

  if(locationLinkValue !== 'muse1'){
    const swiper2 = new Swiper('.muse-section4__swiper',{
      direction: 'horizontal',
      spaceBetween: 5,
      slidesPerView: 2.1,
      centeredSlides: true,
      loop:true,
      breakpoints: {
        900:{
          spaceBetween: 30,
          slidesPerView: 3,
        }
      },
      navigation:{
        prevEl: '.section-4__navigation-button-prev',
        nextEl: '.section-4__navigation-button-next',
      },
      on:{
        init : section4Swiper()
      },
    })
  }
  if(locationLinkValue == 'muse1'){
    const section4SwiperWrap = document.querySelector('.muse-section4__swiper')
    section4SwiperWrap.classList.add('muse1')
  }

  const section5 = document.querySelector('.section-5')
  if(locationLinkValue == 'muse5'){
    section5.style.display='none'
  }

  const section6 = document.querySelector('.section-6')
  const section6P = document.querySelector('.section-6 p')
  const section6H3 = document.querySelector('.section-6 h3')
  section6P.innerHTML=museCampaignData[locationLinkValue]["section6-p"]
  section6H3.innerHTML=museCampaignData[locationLinkValue]["section6-h3"]
})