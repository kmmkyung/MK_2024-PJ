import svgData from '../assets/data/svgData.js'

window.addEventListener('DOMContentLoaded',function(){
  // svg
  const arrowLeft = document.querySelector('.collection-content__arrow .arrow-left')
  const arrowRight = document.querySelector('.collection-content__arrow .arrow-right')
  arrowLeft.innerHTML = svgData.arrowLeft_w
  arrowRight.innerHTML = svgData.arrowRight_w

  // collection-bg__slide
  const collectionSwiper1 = new Swiper('.collection-bg__swiper',{
    direction: 'horizontal',
    loop: true,
    effect:'fade',
    touchRatio: 0, // 드래그 막기
    loopedSlides: 2
  })

  // collection-content__slide
  const collectionSwiper2 = new Swiper('.collection-content__swiper',{
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    centeredSlides: true,
    loopedSlides: 2,
    navigation: {
      nextEl: '.collection-content__arrow .arrow-right',
      prevEl: '.collection-content__arrow .arrow-left',
    },
  })
  
  collectionSwiper1.controller.control = collectionSwiper2
  collectionSwiper2.controller.control = collectionSwiper1

})



