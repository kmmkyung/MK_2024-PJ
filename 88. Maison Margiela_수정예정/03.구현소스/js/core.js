///////////////////////// load /////////////////////////
import gnbdata from "./gnbdata.js";
import svgData from "./svg.js";

let hcode ="";

const core = function(){
  console.log("core.js 로딩완료")


  /********************
    gnb에 로고 넣기 / 바꾸기 / 메뉴 넣기
  ********************/
  const myNav = document.querySelector(".nav");
  const logoSVG1 = document.querySelector(".nav-Logo1");
  const logoSVG2 = document.querySelector(".nav-Logo2");
  const nav = document.querySelector(".nav-L__list");
  // console.log(logoSVG1,logoSVG2,nav)

  // 1. gnb 로고 넣기
  logoSVG1.innerHTML = svgData.logo_1;
  logoSVG2.innerHTML = svgData.logo_2;

  // 2. gnb 로고 바꾸기
  // 2-1. 스크롤시 로고 바뀜
    // 세로 스크롤 위치값
    window.addEventListener("scroll",()=>{
      // console.log("스크롤")
      let scrollTop = window.scrollY;
      // console.log("윈도우 높이값",scrollTop);
      if(scrollTop>50){
        logoSVG2.classList.remove("-hidden")
        logoSVG1.classList.add("-hidden")
        myNav.classList.add("-blur_show")
      }
      else if(scrollTop<=50){
        myNav.classList.remove("-blur_show")
        logoSVG1.classList.remove("-hidden")
        // logoSVG2.classList.add("-hidden")
      }
  })

  // 3. 메뉴 넣기
  // 3-1. 변수
  
  // 3-2. 구조화
  hcode += `
  `;
    
  for(let x in gnbdata){
    hcode += `
    <li class="nav-L__menu">
      <a class="-ghost -blur" href="#">${x}</a>
      <div class="submenu-all"><ul>
    `
    // console.log(x);

    const chgdata = x => x=="Ready-to-wear"?"RTW":x.toLowerCase();
    
    for(let y in gnbdata[x]){
      hcode += `
        <li class="nav-L__submenu">
          <a class="-blur_submenu" v-on:click="myFn('${chgdata(y)}')">${y}</a>
          <ol class="submenu-list">
      `;
      // console.log(y);
      
      for(let z of gnbdata[x][y]){
        hcode += `
        <li><a class="-blur_submenu" href="#">${z}</a></li>
        `;
      }
      hcode += `
          </ol>
        </li>
      `;
    }
    hcode += `
      </ul>
      </div>
      </li>
    `;
  }
  hcode += `
  `;



  // nav.innerHTML = hcode;

  // 3-3. gnb 메뉴 오버시 서브메뉴 보이기
  const list = document.querySelectorAll(".nav-L__menu");
  // console.log("list",list);
  // console.log("submenu",submenu);
  
  // 3-3-1. 하위메뉴/메뉴배경 변경함수
  const subBg = (ele,hv) => {
    ele.style.height = hv+"px";
    myNav.style.paddingBottom = hv+"px";
  };
  
  for(let x of list){
    console.log("4형제들:",x);
    // 마우스 오버시 ___________________ 하위메뉴 박스/하위 내부 박스높이값/로고 바꾸기/변경함수 호출
    x.onmouseenter = () => {
      let menu = x.querySelector(".submenu-all");
      let tgele=x.querySelector(".submenu-all>ul");
      // console.log(tgele);
      let submenuBoxHv = tgele.clientHeight;
      // console.log("하위내부높이",submenuBoxHv);
      // logoSVG2.classList.remove("-hidden");
      // logoSVG1.classList.add("-hidden");
      subBg(menu,submenuBoxHv);
    } //___________________
    // 마우스 아웃시 ___________________
    x.onmouseleave = () => {      
      let menu=x.querySelector(".submenu-all");
      subBg(menu,0)
    } //___________________

    let currMenu = x.querySelector("a").innerText;
    console.log(currMenu);
    if(currMenu==="Women"){

    }

  } ////// for of /////

    // 4. 로고 3d 변화
    const wdw = $(window)
    const tg = $('.nav-C')
    // console.log("tg",tg);
    
    wdw.on('scroll',function(){
        cube(tg)
    })
    
    function cube(x){
      // console.log('큐브',this)
      let a = wdw.scrollTop();
      
      if(a!==0) $(x).addClass('on');
      else $(x).removeClass('on');
  }

      
  /********************
    mobile-menu
  ********************/
    const ham = document.querySelector(".ham")
    const close = document.querySelector(".close")
    // console.log(ham,close)

    ham.onclick = mobileOn;
    close.onclick = mobileOn;
    
    function mobileOn(){
      const gnd = document.querySelector("#gnb");
      // console.log(gnb);
      gnb.classList.toggle("on");
    }


  /********************
    footer 메뉴 넣기
  ********************/

    const footerbox = document.querySelectorAll(".footer-links__box2")
    const aaa = document.querySelectorAll(".aaa")
    const bbb = document.querySelectorAll(".footer-links__list")
console.log(footerbox);
    
    const footermenu = (ele,hv) => {
      ele.style.height = hv+"px";
      // aaa.style.height = hv+"px";
    };
    
    for(let y of footerbox){
      // console.log(y);
      y.onclick = () => {
        let ftmenu = y.querySelector(".aaa");
        let ftgele= y.querySelector(".footer-links__list");
        console.log("ul",ftgele);
        let footersubmenuBoxHv = ftgele.clientHeight;
        console.log("하위내부높이",footersubmenuBoxHv);
        footermenu(ftmenu,footersubmenuBoxHv)
      }
      y.onmouseleave = () => {      
        let ftmenu=y.querySelector(".aaa");
        footermenu(ftmenu,0)
      }
    }
}
export {hcode,core};