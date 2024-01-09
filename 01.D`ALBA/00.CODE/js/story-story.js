window.addEventListener('DOMContentLoaded',function(){

  const sectionWrap = document.querySelector('.section-wrap')
  const sections = document.querySelectorAll('.section')
  
  let timeline = gsap.to(sections,{
    x : ()=> -(sectionWrap.scrollWidth - document.documentElement.clientWidth) + "px",
    ease:'none',
    scrollTrigger:{
      trigger: sectionWrap,
      pin: true,
      scrub: 1,
      end: () => sectionWrap.scrollWidth - document.documentElement.clientWidth,
    },
    // snap:{x:[0,-100,-200,-300,-400,-520,-620,-720]}
  })
  
  // moveElements
  const moveElements = document.querySelectorAll('.moveElements')
  moveElements.forEach((ele)=>{
    console.log(ele.parentNode.parentNode.parentNode);
    
    gsap.from(ele,{
      xPercent: 15,
      duration: 2,
      ease: 'none',
      scrollTrigger:{
        trigger: ele.parentNode.parentNode.parentNode,
        containerAnimation:timeline,
        scrub:1,
        start: 'left center',
        end: 'right bottom'
      }
    })
  })
  // gsap.from(moveElements,{
  //   xPercent:15,
  //   duration:2,
  //   ease:'none',
  //   scrollTrigger:{
  //     trigger:sectionWrap,
  //     containerAnimation:timeline,
  //     scrub:1,
  //     start:"left center", // 요소의 좌측 뷰포트 뷰포트 중간
  //     end: "right bottom" // 요소 우측 뷰포트 아래
  //   }
  // })
})