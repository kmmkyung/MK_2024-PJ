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
    el: '.swiper-pagination',
    clickable: true
  },
})