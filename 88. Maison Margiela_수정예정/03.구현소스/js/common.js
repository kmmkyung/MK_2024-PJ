///////////////////////// load /////////////////////////
import {core, hcode} from "./core.js";
import store from "./listData-women.js";
core();
console.log("common.jS 로딩!")
let menuCode = `
    <ul class="nav-L__list">
        ${hcode}
    </ul>`;

Vue.component("menu-comp", {
    template: menuCode,
    methods: {
        myFn(pm) {
            console.log("찍어라!", pm);
            // 스토어 변수 업데이트
            // store.state.cat = pm;
            // console.log("변경!", store.state.cat);
            location.href = "list.html?cat=women";
        },
    },
});
new Vue({
    el: ".mcont",
    // store, // 스토어등록!!!
    mounted() {
        core();
        // console.log(hcode)
    },
});

// ______________________________page1_____________________________
/******************************
    함수명: FullImg
    기능: 화면 로딩 3초 후 이미지 크기 변화
******************************/

const mainImg = document.querySelector(".img-con>img");
const mainTitle = document.querySelector(".page1-con>.text-con")
// console.log("메인이미지",mainImg);
// console.log("메인텍스트",mainTitle);

function FullImg(event){
    // event.preventDefault; 
    mainImg.classList.add("p1-fullimg");
    setTimeout(() => {
        mainTitle.classList.remove("-hidden")
    },1500);
}
// window.addEventListener("wheel",FullImg);
FullImg()

// 페이지가 넘어가면 셋팅 원래대로!(이미지 작아지고 글씨 없어짐)
// if(){
//     mainImg.classList.remove("-p1_fullimg")
//     mainTitle.classList.add("-hidden")
// }
// ______________________________page3_____________________________
/******************************
    기능: 영상 포지션 바꾸기(화면 4/3이 내려가면 포지션 변경)
******************************/
const pg3 = document.querySelector(".page3-vidbox")
const vid = document.querySelector(".vid")
const cover = document.querySelector(".page3-vidbox__cover")
// 영상 크기 구하기
// let vidH = vid.offsetHeight/3*2;
// console.log(vidH)

const retVal = x => x.getBoundingClientRect().top;

window.addEventListener("scroll",()=>{
    if(retVal(pg3)<0) {
        vid.style.position="relative";
        vid.style.top="0";
        vid.play();
    }
    else{
        vid.style.position="fixed";
        vid.style.top="0";
        vid.pause();
    }
    // console.log("스크롤중",retVal(pg3))
})

// let scrollTop = 0;
// window.addEventListener("scroll",(e)=>{
//     scrollTop =document.documentElement.scrollTop;
//     cover.style.opacity = .3% + scrollTop /1000;
// })


// ______________________________page5_____________________________
/******************************
    기능: 해당 text에 마우스 오버 시 폰트색 및 이미지 변경
******************************/
const txtbx = document.querySelectorAll(".txtbx")
const shoes = document.querySelectorAll(".shoes")

const setCls = (ele,idx) => {
    let temp;
    idx?temp=0:temp=1;
    // console.log(idx);
    ele.classList.add("paga5-con__text-hover-color");
    ele.classList.remove("paga5-con__text-color");
    txtbx[temp].classList.remove("paga5-con__text-hover-color");
    txtbx[temp].classList.add("paga5-con__text-color");
    shoes[temp].classList.add("-hidden");
    shoes[idx].classList.remove("-hidden");

}; //////////// setCls ///////////////

txtbx.forEach((ele,idx)=>ele.addEventListener("mouseenter",()=>setCls(ele,idx)));


//____________________________________________________________________________
