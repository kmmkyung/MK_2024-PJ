window.addEventListener('DOMContentLoaded',function(){
  const content = document.querySelectorAll('.content');
  const contentMenu = document.querySelectorAll('.content-menu li');

  contentMenu.forEach(function(ele,idx){
    ele.addEventListener('click',()=>{
      for(let i=0; i<contentMenu.length; i++){
        contentMenu[i].classList.remove('active')
        content[i].classList.remove('active')
      }
      ele.classList.add('active')
      content[idx].classList.add('active')
    })
  })

  
})