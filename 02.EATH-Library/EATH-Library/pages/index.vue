<template>
  <div>
    <aside class="top-notice">
      <div class="top-notice__wrap">
        <div class="texts-wrap">
          <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
          <span>EATH LIBRARY</span>
          <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
          <span>EATH LIBRARY</span>
          <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
          <span>EATH LIBRARY</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@use '../assets/scss/abstracts';

.top-notice{
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #fff;
  text-align: center;
  
  .top-notice__wrap{
    width: 100%;
    height: 100%;
    padding: 0 25px;
    
    .texts-wrap{
      display: flex;
      flex-wrap: nowrap;
      gap: min(15vw,200px);
      animation: topText 20s infinite;
      
      @keyframes topText {
        0%{
          transform: translateX(0%);
        }
        100%{
          transform: translateX(-100%);
        }
      }
      
      span{
        line-height: 40px;
        font-size: abstracts.$font-size-s;
        white-space: nowrap;
        
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
}
</style>