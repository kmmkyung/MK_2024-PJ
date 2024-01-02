import bestProductData from '../assets/data/bestProductData.js'

window.addEventListener('DOMContentLoaded',function(){
  // section1
  //// swiper
  const swiper1Pagination = document.querySelectorAll('.swiper1-pagination li')
  let PaginationValue = []
  swiper1Pagination.forEach(function(ele){
    PaginationValue.push(ele.textContent)
  })
  
  const swiper1 = new Swiper('.section-1__swiper',{
    direction: 'horizontal',
    loop: true,
    // autoplay: {
    //   delay: 5000
    // },
    effect:'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.swiper1-pagination',
      clickable: true,
      renderBullet:function(index,className){
        return `<li class=${className}>${PaginationValue[index]}</li>`
      }
    }
  })

  //// 배경이미지
  window.addEventListener('resize',function(){
    const bannerBg1 = document.querySelector('.banner-1')
    const bannerBg2 = document.querySelector('.banner-2')
    const bannerBg3 = document.querySelector('.banner-3')
    const bannerBg4 = document.querySelector('.banner-4')
    const sectionBg4 = document.querySelector('.section-4')
    const sectionBg5 = document.querySelector('.section-5')
    if(window.innerWidth<=900){
      bannerBg1.style.backgroundImage='url(./assets/images/mobile_section-1-1.jpg)'
      bannerBg2.style.backgroundImage='url(./assets/images/mobile_section-1-2.jpg)'
      bannerBg3.style.backgroundImage='url(./assets/images/mobile_section-1-3.jpg)'
      bannerBg4.style.backgroundImage='url(./assets/images/mobile_section-1-4.jpg)'
      sectionBg4.style.backgroundImage='url(./assets/images/mobile_section-4.jpg)'
      sectionBg5.style.backgroundImage='url(./assets/images/mobile_section-5.jpg)'
    }
    if(window.innerWidth>900){
      bannerBg1.style.backgroundImage='url(./assets/images/section-1-1.jpg)'
      bannerBg2.style.backgroundImage='url(./assets/images/section-1-2.jpg)'
      bannerBg3.style.backgroundImage='url(./assets/images/section-1-3.jpg)'
      bannerBg4.style.backgroundImage='url(./assets/images/section-1-4.jpg)'
      sectionBg4.style.backgroundImage='url(./assets/images/section-4.jpg)'
      sectionBg5.style.backgroundImage='url(./assets/images/section-5.jpg)'
    }
  })

  // section-3
  //// 데이터 넣기
  const slide = document.querySelector('.section-3__swiper .slide');
  let slideCode = ``;
  bestProductData.forEach(function(ele){
    slideCode+= /* html */`
    <li class="slide-item swiper-slide">
      <img class="slide-item__img" src="${ele.img}">
      <h5 class="slide-item__title">${ele.title}</h5>
      <p class="slide-item__price">${ele.price}</p>
      <span class="slide-item__tag">${ele.tag}</span>
    </li>
    `;
  })
  slide.innerHTML = slideCode;

  const swiper2 = new Swiper('.section-3__swiper',{
    direction: 'horizontal',
    loop: true,
    // autoplay: {
    //   delay: 3000,
    // },
    effect:'fade',
    fadeEffect: { crossFade: true },
    navigation:{
      nextEl: '.section-3__navigation-button-next',
      prevEl: '.section-3__navigation-button-prev',
    }
  })
  
  // section4, section5
  function itemSHow(arr,item){
    let eleHover = 0
    let eleClick = 0
    arr.forEach(function(ele,idx){
      ele.addEventListener('mouseenter',function(){
        if(eleHover == 0){
          item[idx].classList.add('on')
        }
      })
      ele.addEventListener('mouseleave',function(){
        if(eleHover == 0){
          item[idx].classList.remove('on')
        }
      })
      ele.addEventListener('click',function(){
        let findOn = document.querySelector('.content-text__all.on')
        let findOnText = document.querySelector('.content-text__all.on .content-text')
        eleHover = 1;
        item[idx].classList.add('on')
        ele.style.opacity = 1

        if(item[idx].classList.contains('on')){
          findOn.classList.remove('on')
          findOnText.style.opacity = 0.5
          item[idx].classList.add('on')
          ele.style.opacity = 1
        }
      })
    })
  }

  const contentTextAll = document.querySelectorAll('.content-text__all')
  const contentText = document.querySelectorAll('.content-text')
  itemSHow(contentText,contentTextAll)
})