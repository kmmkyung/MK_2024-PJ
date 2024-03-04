import museCampaignData from '../assets/data/museCampaignData.js'

let locationLink = location.href;
let locationLinkKey = locationLink.split("?")[1]
let locationLinkValue = locationLinkKey.split("=")[1]

window.addEventListener('DOMContentLoaded',function(){
  // section1
  const section1Video = document.querySelector('.section-1 video')
  const section1h6 = document.querySelector('.section-1-content h6')
  const section1h1 = document.querySelector('.section-1-content h1')
  const section1p = document.querySelector('.section-1-content p')
  section1Video.src = `./assets/images/muse/${museCampaignData[locationLinkValue]["section1-video"]}`
  section1Video.poster = `./assets/images/muse/${museCampaignData[locationLinkValue]["section1-videoPoster"]}`
  // setTimeout(function(){
  //   section1Video.play()
  // },3000)
  section1h6.innerHTML=museCampaignData[locationLinkValue]["section1-h6"]
  section1h1.innerHTML=museCampaignData[locationLinkValue]["section1-h1"]
  section1p.innerHTML=museCampaignData[locationLinkValue]["section1-p"]

  // section2
  const section2 = document.querySelector('.section-2')
  const section2Content = document.querySelector('.section-2-content')
  const section2h2 = document.querySelector('.section-2-content h2')
  const section2p = document.querySelector('.section-2-content p')
  section2.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section2-bg"]})`
  section2h2.innerHTML=museCampaignData[locationLinkValue]["section2-h2"]
  section2p.innerHTML=museCampaignData[locationLinkValue]["section2-p"]
  switch(locationLinkValue){
    case 'muse1' : section2Content.classList.add('muse1');
    break;
    case 'muse2' : section2Content.classList.add('muse2');
    break;
    case 'muse3' : section2Content.classList.add('muse3');
    break;
    case 'muse4' : section2Content.classList.add('muse4');
    break;
    case 'muse5' : section2Content.classList.add('muse5');
    break;
  }

  const section3 = document.querySelector('.section-3')
  const section3Ul = document.querySelector('.muse-list')
  section3.style.backgroundImage=`url(./assets/images/muse/${museCampaignData[locationLinkValue]["section3-bg"]})`
  museCampaignData[locationLinkValue]["section-3-item"].forEach(function(ele){
    let section3Li = `<li class="swiper-slide list-item">
      <img src="./assets/images/muse/${ele}">
    </li>`
    section3Ul.innerHTML += section3Li;
  })

  const swiper1 = new Swiper('.muse-section3__swiper',{
    direction: 'horizontal',
    loop: true,
      effect:'fade',
      fadeEffect: { crossFade: true },
      pagination: {
        el: '.muse-section3__swiper .swiper-pagination',
        clickable: true
      },
    })


    const swiper2 = new Swiper('.muse-section4__swiper',{
      direction: 'horizontal',
      loop: true,
        effect:'fade',
        fadeEffect: { crossFade: true },
        navigation:{
          prevEl: '.section-4__navigation-button-prev',
          nextEl: '.section-4__navigation-button-next',
        }
      })
})