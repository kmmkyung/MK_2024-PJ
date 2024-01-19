import svgData from '../assets/data/svgData.js'

window.addEventListener('DOMContentLoaded',function(){
  // svg
  const arrowLeft = document.querySelector('.arrow-left')
  const arrowRight = document.querySelector('.arrow-right')
  arrowLeft.innerHTML = svgData.arrowLeft_w
  arrowRight.innerHTML = svgData.arrowRight_w

  // collection-bg__slide
  const collectionSwiper1 = new Swiper('.collection-bg__swiper',{
    centeredSlides: true,
    loop: true,
    loopedSlides: 4,
    // touchRatio: 0,
    loopAdditionalSlides :1,

    allowTouchMove:false,
    effect:'fade',
    // navigation: {
    //   nextEl: '.arrow-right',
    //   prevEl: '.arrow-left',
    // },
  })
  
  // collection-content__slide
  const collectionSwiper2 = new Swiper('.collection-content__swiper',{
    centeredSlides: true,
    slideToClickedSlide: true,
    loop: true,
    loopAdditionalSlides :1,
    loopedSlides: 4,
    navigation: {
      nextEl: '.arrow-right',
      prevEl: '.arrow-left',
    },
    
  })
  
  collectionSwiper1.controller.control = collectionSwiper2
  collectionSwiper2.controller.control = collectionSwiper1

})



