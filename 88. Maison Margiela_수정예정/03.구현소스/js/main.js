window.addEventListener("DOMContentLoaded",()=>{
    console.log("list.js 로딩완료")
//____________________________________________________________________________

// 서브페이지 오버시 사진 변경
const mainLi2 = document.querySelectorAll(".none_hover")
const mainLiH = document.querySelectorAll(".hover")
console.log("메인이미지",mainLi2)
console.log("호버이미지",mainLiH)

mainLiH.forEach((ele,idx)=>{
    ele.addEventListener("mouseenter",function(){
        this.style.opacity = 1;
        mainLi2[idx].style.opacity =0;
    });
    ele.addEventListener("mouseout", function(){
        this.style.opacity = 0;
        mainLi2[idx].style.opacity =1;
    })
})
//____________________________________________________________________________

// 상세페이지 오버시 사진 변경
const mainPic = document.querySelector(".sublist-con__img-main>img");
let subPic = document.querySelectorAll(".sublist-con__img-sub-ul-li>img");
// let subPicLi = document.querySelectorAll(".sublist-con__img-sub-ul-li");
// console.log(mainPic,subPic);

for(let i=0; i<subPic.length; i++){
subPic[i].addEventListener("mouseover",chgPic);
}
function chgPic(){
let subPicAttribute = this.getAttribute("src");
mainPic.setAttribute("src",subPicAttribute)
}
//____________________________________________________________________________
// 이미지 클릭시 상세페이지 보기
// 클릭시 화면 스크롤 막기
const listBox = document.querySelector("#sublist");
const blurBox = document.querySelector(".blur_box");
const listImg = document.querySelectorAll(".list-con li");
const closeBtn = document.querySelector(".sublist_close");
// console.log(listImg)
// console.log(listBox);

listImg.forEach((ele, idx) =>{
ele.addEventListener("click",function(){
    console.log('ele', ele);
    
    listBox.classList.remove("-hidden");
    blurBox.classList.remove("-hidden");
    
})
}) // forEach

closeBtn.addEventListener("click",function(){
    listBox.classList.add("-hidden");
    blurBox.classList.add("-hidden");
})
})