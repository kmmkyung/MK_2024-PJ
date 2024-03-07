window.addEventListener('DOMContentLoaded',function(){
  // section-buy
  const buyButton = document.querySelector('.button-list .buy')
  const noBuyWin = document.querySelector('.no-buy-window')
  const buyWin = document.querySelector('.buy-window')
  const inputSelect = document.querySelector('.input-select')
  let inputSelectOl = document.querySelector('.buy-window__input ol')
  let inputSelectLi = document.querySelectorAll('.buy-window__input ol li')
  buyButton.addEventListener('click',function(){
    buyWin.classList.add('active')
  })
  noBuyWin.addEventListener('click',function(){
    buyWin.classList.remove('active')
  })
  if(buyWin.classList.contains('active')){
    inputSelectOl.style.height = inputSelectOl.scrollHeight+'px'
  }
  else{
    inputSelectOl.style.height = 0
  }
  inputSelect.addEventListener('click',function(){
    inputSelectOl.style.height = inputSelectOl.scrollHeight+'px'
  })
  inputSelectLi.forEach(ele=>{
    ele.addEventListener('click',function(){
      inputSelect.textContent = ele.textContent
      inputSelectOl.style.height = 0
    })
  })
})