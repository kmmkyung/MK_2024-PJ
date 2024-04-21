<template>
  <div>
    <aside class="top-notice">
      <div class="top-notice__wrap">
        <p>
          <span class="text-brand">EATH LIBRARY</span>
          <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
          <span class="text-brand">EATH LIBRARY</span>
          <span>Evolutionary, Achievement from Traditional Heritage</span>
          <span class="text-brand">EATH LIBRARY</span>
          <span>당신의 손을 위한 가장 자연스러운 선택.</span>
          <span class="text-brand">EATH LIBRARY</span>
          <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
          <span class="text-brand">EATH LIBRARY</span>
          <span>Evolutionary, Achievement from Traditional Heritage</span>
          <span class="text-brand">EATH LIBRARY</span>
          <span>당신의 손을 위한 가장 자연스러운 선택.</span>
        </p>
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
    // width: calc(100% - 50px);
    // margin: 0 25px;
    overflow: hidden;
    white-space: nowrap;
        
    p{
      white-space: nowrap;
      animation: topText 5s linear infinite;

      @keyframes topText {
        100% { transform: translateX(calc(-100%));
        }
      }
      
      &:hover{
        animation-play-state: paused;
      }
      
      span:not(:last-child){
        margin-right: 10vw;
      }
      
      span{
        display: inline-block;
        text-align: left;
        line-height: 40px;
        font-size: abstracts.$font-size-s;
        
        &:hover{
          text-decoration: underline;
        }
      }
      
      .text-brand{
        font-weight: bold;
      }
    }
  }
}
</style>