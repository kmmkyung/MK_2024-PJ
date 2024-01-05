window.addEventListener('DOMContentLoaded',function(){

  const sectionWrap = document.querySelector('.section-wrap')
  const sections = document.querySelectorAll('.section')

  let scrollTween = gsap.to(sections,{
    xPercent: -100 * (sections.length - 1),
    ease:'none',
    duration: 10,
    scrollTrigger:{
      trigger: sectionWrap,
      pin: true,
      scrub:1,
      end:sectionWrap.scrollWidth,
    }
  })

  // section 2
  const section2Left = document.querySelector('.section-2-left');
  gsap.from(section2Left,{
    xPercent:15,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section2Left,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center", // 요소의 좌측 뷰포트 뷰포트 중간
      end: "right bottom" // 요소 우측 뷰포트 아래
    }
  })
  
  // section 3
  const section3Left = document.querySelector('.section-3-left');
  gsap.from(section3Left,{
    xPercent:15,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section3Left,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom" 
    }
  })
  
  // section 4
  const section4Title = document.querySelector('.section-4-title');
  gsap.from(section4Title,{
    opacity:0,
    xPercent:15,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section4Title,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })
  
  // section 4
  const section5Left = document.querySelector('.section-5-left');
  gsap.from(section5Left,{
    xPercent:15,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section5Left,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })

  const section5RightImg1 = document.querySelector('.section-5-right__img1');
  gsap.from(section5RightImg1,{
    xPercent:20,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section5RightImg1,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })

  const section5RightImg2 = document.querySelector('.section-5-right__img2');
  gsap.from(section5RightImg2,{
    xPercent:20,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section5RightImg2,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })

  const section5RightImg3 = document.querySelector('.section-5-right__img3');
  gsap.from(section5RightImg3,{
    xPercent:20,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section5RightImg3,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })

  // section 6
  const section6Left = document.querySelector('.section-6-left');
  gsap.from(section6Left,{
    xPercent:15,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section6Left,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })

  // section 7
  const section7Left = document.querySelector('.section-7-left');
  gsap.from(section7Left,{
    xPercent:15,
    duration:2,
    ease:'none',
    scrollTrigger:{
      trigger:section7Left,
      containerAnimation:scrollTween,
      scrub:1,
      start:"left center",
      end: "right bottom"
    }
  })
})