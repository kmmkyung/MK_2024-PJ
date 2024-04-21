<template>
  <div>
    <aside class="top-notice">
      <div class="top-notice__wrap">
        <div class="text-wrap">
          <p>
            <span class="text-brand">EATH LIBRARY</span>
            <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
            <span class="text-brand">EATH LIBRARY</span>
            <span>Evolutionary, Achievement from Traditional Heritage</span>
            <span class="text-brand">EATH LIBRARY</span>
            <span>당신의 손을 위한 가장 자연스러운 선택.</span>
          </p>
          <p>
            <span class="text-brand">EATH LIBRARY</span>
            <span>회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</span>
            <span class="text-brand">EATH LIBRARY</span>
            <span>Evolutionary, Achievement from Traditional Heritage</span>
            <span class="text-brand">EATH LIBRARY</span>
            <span>당신의 손을 위한 가장 자연스러운 선택.</span>
          </p>
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
    // width: calc(100% - 50px);
    margin: 0 25px;
    overflow: hidden;
    position: relative;
    
    &::before{
      content: '';
      height: 40px;
      width: 10px;
      background: linear-gradient(90deg, rgb(0, 0, 0),rgba(0, 0, 0, 0));
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    &::after{
      content: '';
      height: 40px;
      width: 10px;
      background: linear-gradient(-90deg, rgb(0, 0, 0),rgba(0, 0, 0, 0));
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }

    .text-wrap{
      white-space: nowrap;
      display: flex;
      flex-wrap: nowrap;
      gap: 10vw;
      width: max-content;
      // animation: topText 20s linear infinite;
      
      @keyframes topText {
        100% {
          transform: translateX(calc(-50% + -5vw));
        }
      }

      &:hover{
        animation-play-state: paused;
      }

        p{
          width: 100%;
          white-space: nowrap;
          
          span{
            display: inline-block;
            text-align: left;
            line-height: 40px;
            font-size: abstracts.$font-size-s;
            
            &:hover{
              text-decoration: underline;
            }
          }

          span:not(:last-child){
            margin-right: 10vw;
          }

          .text-brand{
            font-weight: bold;
          }
        }
      }
    }
  }
</style>