window.addEventListener('DOMContentLoaded',function(){
  // 배경이미지
  function sizeBg(){
    const listBg1 = document.querySelector('.section-2 .list-1')
    const listBg2 = document.querySelector('.section-2 .list-2')
    const listBg3 = document.querySelector('.section-2 .list-3')
    const listBg4 = document.querySelector('.section-2 .list-4')
    const listBg5 = document.querySelector('.section-2 .list-5')
    let link = './assets/images/'
    
    if(window.innerWidth<=900){
      listBg1.style.backgroundImage = `url(${link}story/mobile_story-muse-01.jpg)`
      listBg2.style.backgroundImage = `url(${link}story/mobile_story-muse-02.jpg)`
      listBg3.style.backgroundImage = `url(${link}story/mobile_story-muse-03.jpg)`
      listBg4.style.backgroundImage = `url(${link}story/mobile_story-muse-04.jpg)`
      listBg5.style.backgroundImage = `url(${link}story/mobile_story-muse-05.jpg)`
    }
    if(window.innerWidth>900){
      listBg1.style.backgroundImage = `url(${link}story/story-muse-01.jpg)`
      listBg2.style.backgroundImage = `url(${link}story/story-muse-02.jpg)`
      listBg3.style.backgroundImage = `url(${link}story/story-muse-03.jpg)`
      listBg4.style.backgroundImage = `url(${link}story/story-muse-04.jpg)`
      listBg5.style.backgroundImage = `url(${link}story/story-muse-05.jpg)`
    }
  }

  window.addEventListener('load',function(){
    sizeBg()
  })
  window.addEventListener('resize',function(){
    sizeBg()
  })

  const list = document.querySelectorAll('.list')
  const listContent = document.querySelectorAll('.list-content')
  list.forEach(function(ele){
    ele.addEventListener('mouseenter',function(){
      ele.style.marginBottom = 0
    })
    ele.addEventListener('mouseleave',function(){
      ele.style.marginBottom = -150 +'px'
    })
  })
})