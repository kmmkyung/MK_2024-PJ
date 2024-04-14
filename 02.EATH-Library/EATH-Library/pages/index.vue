<template>
  <div>
    <aside class="top-notice">
      <NuxtLink class="top-notice-text" to="/">회원가입시 5% 할인쿠폰과 무료배송 혜택을 드립니다.</NuxtLink></aside>
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
  
  .top-notice-text{
    font-size: abstracts.$font-size-s;
    height: 100%;
    line-height: 15px;
  }
}
</style>