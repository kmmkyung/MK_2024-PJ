window.addEventListener('DOMContentLoaded',function(){

  
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