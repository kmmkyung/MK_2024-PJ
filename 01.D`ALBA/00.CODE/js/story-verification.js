window.addEventListener('DOMContentLoaded',function(){
  const content = document.querySelectorAll('.content');
  const contentMenu = document.querySelectorAll('.content-menu li');

  contentMenu.forEach(function(ele,idx){
    ele.addEventListener('click',function(){
      let activeEle = contentMenu
      ele.classList.add('active')

    })
  })
})