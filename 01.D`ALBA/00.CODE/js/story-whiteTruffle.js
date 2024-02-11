window.addEventListener('DOMContentLoaded',function(){
  function sizeBg(){
    const section1 = document.querySelector('.section-1')
    const section2 = document.querySelector('.section-2')
    const section4 = document.querySelector('.section-4')
    const section5 = document.querySelector('.section-5')
    const section6 = document.querySelector('.section-6')
    const section7 = document.querySelector('.section-7')
    const section8 = document.querySelector('.section-8')

    if(window.innerWidth<=900){
      section1.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-1.jpg)'
      section2.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-2.jpg)'
      section4.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-4.jpg)'
      section5.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-5.jpg)'
      section6.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-6.jpg)'
      section7.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-7.jpg)'
      section8.style.backgroundImage='url(./assets/images/story/mobile_story-whiteTruffle-8.jpg)'
    }
    if(window.innerWidth>900){
      section1.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-1.jpg)'
      section2.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-2.jpg)'
      section4.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-4.jpg)'
      section5.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-5.jpg)'
      section6.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-6.jpg)'
      section7.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-7.jpg)'
      section8.style.backgroundImage='url(./assets/images/story/story-whiteTruffle-8.jpg)'
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
  const section3 = document.querySelector('.section-3')
  const moveElements = document.querySelectorAll('.moveElements')
  const moveBar = document.querySelectorAll('.moveBar')
  let windowWidth 
  let sectionWrapWidth

  function onResize(){
    windowWidth = window.innerWidth;
    sectionWrapWidth = sectionWrap.scrollWidth;
  }
  
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
    gsap.to(section3,{
      backgroundColor:"#323927",
      scrollTrigger:{
        trigger: section3,
        containerAnimation:timeline,
        scrub:1,
      }
    })
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
    moveBar.forEach((ele)=>{
      gsap.from(ele,{
        duration: 5,
        opacity: 0,
        height: 1,
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
  });

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
    gsap.to(section3,{
      backgroundColor:"#323927",
      scrollTrigger:{
        trigger: section3,
        scrub:1,
      }
    })
    moveBar.forEach((ele)=>{
      gsap.from(ele,{
        duration: 5,
        autoAlpha: 0,
        height: 1,
        ease: 'none',
        scrollTrigger:{
          trigger: ele.parentNode.parentNode.parentNode.parentNode,
          scrub:1,
          start: 'left center',
          end: 'right bottom'
        }
      })
    })
  });

})