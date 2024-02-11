window.addEventListener('DOMContentLoaded',function(){

  // 배경화면
  function sizeBg(){
    const section1 = document.querySelector('.section-1')
    const section2 = document.querySelector('.section-2')
    const section3 = document.querySelector('.section-3')
    const section4 = document.querySelector('.section-4')
    const section7 = document.querySelector('.section-7')
    const section8 = document.querySelector('.section-8')

    if(window.innerWidth<=900){
      section1.style.backgroundImage='url(./assets/images/story/mobile_story-1.jpg)'
      section2.style.backgroundImage='url(./assets/images/story/mobile_story-2.jpg)'
      section3.style.backgroundImage='url(./assets/images/story/mobile_story-3.jpg)'
      section4.style.backgroundImage='url(./assets/images/story/mobile_story-4.jpg)'
      section7.style.backgroundImage='url(./assets/images/story/mobile_story-7.jpg)'
      section8.style.backgroundImage='url(./assets/images/story/mobile_story-8.jpg)'
    }
    if(window.innerWidth>900){
      section1.style.backgroundImage='url(./assets/images/story/story-1.jpg)'
      section2.style.backgroundImage='url(./assets/images/story/story-2.jpg)'
      section3.style.backgroundImage='url(./assets/images/story/story-3.jpg)'
      section4.style.backgroundImage='url(./assets/images/story/story-4.jpg)'
      section7.style.backgroundImage='url(./assets/images/story/story-7.jpg)'
      section8.style.backgroundImage='url(./assets/images/story/story-8.jpg)'
    }
  }

  window.addEventListener('load',function(){
    sizeBg()
  })
  window.addEventListener('resize',function(){
    sizeBg()
  })

  const sectionWrap = document.querySelector('.section-wrap')
  const sections = document.querySelectorAll('.section')
  const moveElements = document.querySelectorAll('.moveElements')
  const section5Imgs = document.querySelectorAll('.section-5-right img')
  let windowWidth
  let sectionWrapWidth
  
  function onResize(){
    windowWidth = window.innerWidth;
    sectionWrapWidth = sectionWrap.scrollWidth;
  }

  // ScrollTrigger.addEventListener("refreshInit", onResize);

  let gsapMatchMedia = gsap.matchMedia();
  gsapMatchMedia.add("(min-width: 900px)",function(){      
    let timeline = gsap.to(sections,{
      x : ()=> -(sectionWrapWidth - windowWidth) + "px",        
      ease:'none',
      scrollTrigger:{
        trigger: sectionWrap,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        end: () => sectionWrapWidth,
      },
      onInit:onResize
    });
    
    // moveElements
    moveElements.forEach((ele)=>{
      gsap.from(ele,{
        xPercent: 15,
        duration: 2,
        opacity: 0,
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
    
    // section-5 img
    section5Imgs.forEach((ele)=>{
      gsap.from(ele,{
        xPercent: 15,
        duration: 0.5,
        opacity: 0,
        ease: 'none',
        scrollTrigger:{
          trigger: ele,
          containerAnimation:timeline,
          scrub: 0.5,
          start: 'left center',
          end: 'center bottom'
        }
      })
    })
  })

  gsapMatchMedia.add("(max-width: 900px)",function(){      
    // moveElements
    moveElements.forEach((ele)=>{
      gsap.from(ele,{
        duration: 2,
        opacity: 0,
        ease: 'none',
        scrollTrigger:{
          trigger: ele.parentNode.parentNode.parentNode,
          scrub:1,
          start: 'left center',
          end: 'right bottom'
        }
      })
    })
    
    // section-5 img
    section5Imgs.forEach((ele)=>{
      gsap.from(ele,{
        xPercent: 15,
        duration: 0.5,
        opacity: 0,
        ease: 'none',
        scrollTrigger:{
          trigger: ele,
          scrub: 0.5,
          start: 'left center',
          end: 'center bottom'
        }
      })
    })
  })

    
})