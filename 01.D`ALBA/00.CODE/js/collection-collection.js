import svgData from '../assets/data/svgData.js'

window.addEventListener('DOMContentLoaded',function(){
  // svg
  const arrowLeft = document.querySelector('.arrow-left')
  const arrowRight = document.querySelector('.arrow-right')
  arrowLeft.innerHTML = svgData.arrowLeft_w
  arrowRight.innerHTML = svgData.arrowRight_w


  // 배경화면
  window.addEventListener('resize',function(){
    const section1 = document.querySelector('.section-1')
    const section2 = document.querySelector('.section-2')
    const section3 = document.querySelector('.section-3')
    const section4 = document.querySelector('.section-4')

    if(window.innerWidth<=900){
      section1.src='./assets/images/mobile_collection-antioxidant.jpg'
      section2.src='./assets/images/mobile_collection-vegan.jpg'
      section3.src='./assets/images/mobile_collection-moisture.jpg'
      section4.src='./assets/images/mobile_collection-relax.jpg'
    }
    if(window.innerWidth>900){
      section1.src='./assets/images/collection-antioxidant.jpg'
      section2.src='./assets/images/collection-vegan.jpg'
      section3.src='./assets/images/collection-moisture.jpg'
      section4.src='./assets/images/collection-relax.jpg'
    }
  })

  // collection-bg__slide
  const collectionSwiper1 = new Swiper('.collection-bg__swiper',{
    centeredSlides: true,
    loop: true,
    loopedSlides: 4,
    // touchRatio: 0,
    loopAdditionalSlides :1,
    allowTouchMove:false,
    effect:'fade',
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
    on:{
      slideChange: function(){
        let collectionItem = document.querySelectorAll('.collection-content__item')
        let collectionItemBtn = document.querySelectorAll('.item-button')
        let collectionArrowLeft = document.querySelector('.arrow-left g')
        let collectionArrowRight = document.querySelector('.arrow-right g')
        if(this.realIndex == 0 || this.realIndex == 1){
          collectionItem.forEach((ele,idx)=>{
            ele.classList.add('white')
            ele.classList.remove('black')
            collectionItemBtn[idx].classList.add('white')
            collectionItemBtn[idx].classList.remove('black')
          })
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
          collectionArrowLeft.style.fill='black'
          collectionArrowRight.style.fill='black'
        }
      }
    }

  })
  collectionSwiper1.controller.control = collectionSwiper2
  collectionSwiper2.controller.control = collectionSwiper1
})


