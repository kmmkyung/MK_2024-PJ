window.addEventListener('DOMContentLoaded',function(){
  const list = document.querySelectorAll('.list')
  const listContent = document.querySelectorAll('.list-content')
  list.forEach(function(ele,idx){
    ele.addEventListener('mouseenter',function(){
      ele.style.marginBottom = 0
    })
    ele.addEventListener('mouseleave',function(){
      ele.style.marginBottom = -150 +'px'
    })
  })
})