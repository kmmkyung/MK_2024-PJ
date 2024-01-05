window.addEventListener('DOMContentLoaded',function(){

  const sectionWrap = document.querySelector('.section-wrap')
  const sections = document.querySelectorAll('.section')

  let timeline = gsap.to(sections,{
    xPercent: -100 * (sections.length - 1),
    ease:'none',
    scrollTrigger:{
      trigger: sectionWrap,
      pin: true,
      scrub:0.1,

    }
  })
  
  // let timeline = gsap.timeline({
  //   scrollTrigger:{
  //     trigger:sectionWrap,
  //     start:"top",
  //     pin:true,
  //     scrub:1,
  //     end: () => sectionWrap.scrollWidth,
  //   },
  //   // defaults: { ease: 'none', duration: 10}
  // })
})