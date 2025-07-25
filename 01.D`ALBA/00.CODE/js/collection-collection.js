import svgData from '../assets/data/svgData.js'

window.addEventListener('DOMContentLoaded',function(){
  // svg
  const arrowLeft = document.querySelector('.arrow-left')
  const arrowRight = document.querySelector('.arrow-right')
  arrowLeft.innerHTML = svgData.arrowLeft_w
  arrowRight.innerHTML = svgData.arrowRight_w

  // collection-bg__slide
  const collectionSwiper1 = new Swiper('.collection-bg__swiper',{
    loop: true,
    loopedSlides: 4,
    slidesPerView: 1,
    loopAdditionalSlides: 1,
    centeredSlides: true,
    allowTouchMove:false,
    effect:'fade',
    fadeEffect: {
      crossFade: true
    },
    watchSlidesProgress: true,
  })
  
  // collection-content__slide
  const collectionSwiper2 = new Swiper('.collection-content__swiper',{
    loop: true,
    loopedSlides: 4,
    slidesPerView: 1,
    loopAdditionalSlides: 1,
    centeredSlides: true,
    allowTouchMove:false,

    slideToClickedSlide: true,
    navigation: {
      nextEl: '.arrow-right',
      prevEl: '.arrow-left',
    },
  
    on:{
      slideChange: function(){
        
        let collectionTitle = document.querySelector('.collection-bg h1')
        let collectionItem = document.querySelectorAll('.collection-content__item')
        let collectionItemBtn = document.querySelectorAll('.item-button')
        let collectionArrowLeft = document.querySelector('.arrow-left g')
        let collectionArrowRight = document.querySelector('.arrow-right g')
        const body = document.querySelector('body')
        if(this.realIndex == 0 || this.realIndex == 1){
          collectionItem.forEach((ele,idx)=>{
            ele.classList.add('white')
            ele.classList.remove('black')
            collectionItemBtn[idx].classList.add('white')
            collectionItemBtn[idx].classList.remove('black')
          })
          body.classList.add('white')
          body.classList.add('blackMenu')
          body.classList.remove('black')
          body.classList.remove('whiteMenu')
          collectionTitle.style.color='white'
          collectionArrowLeft.style.fill='white'
          collectionArrowRight.style.fill='white'
        }
        if(this.realIndex == 2 || this.realIndex == 3){
          collectionItem.forEach((ele,idx)=>{
            ele.classList.remove('white')
            ele.classList.add('black')
            collectionItemBtn[idx].classList.remove('white')
            collectionItemBtn[idx].classList.add('black')
          })
          body.classList.add('black')
          body.classList.add('whiteMenu')
          body.classList.remove('white')
          body.classList.remove('blackMenu')
          collectionTitle.style.color='black'
          collectionArrowLeft.style.fill='black'
          collectionArrowRight.style.fill='black'
        }
      }
    }
  })

  collectionSwiper1.controller.control = collectionSwiper2;
  collectionSwiper2.controller.control = collectionSwiper1;
})



