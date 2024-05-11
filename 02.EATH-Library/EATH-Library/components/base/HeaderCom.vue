<template>
  <header>
    <div class="header-wrap">
      <div class="pc-menu">
        <div class="pc-logo" v-on:click="home()"></div>
        <div class="pc-bar">
          <span class="line topLine"></span>
          <span class="line bottomLine"></span>
        </div>
        <nav class="pc-nav">
          <div class="nav-wrap">
            <ul class="menu-list">
              <li class="list-item"><a href="#">제품</a></li>
              <li class="list-item"><a href="#">브랜드</a></li>
              <li class="list-item"><a href="#">경험</a></li>
              <li class="list-item"><a href="#">매거진</a></li>
              <li class="list-item"><a href="#">성분</a></li>
              <li class="list-item"><a href="#">이벤트</a></li>
              <li class="list-item pc-login"><a href="#">로그인</a></li>
              <li class="list-item pc-cart"><a href="#">(0)</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="mobile-menu">
        <div class="mobile-logo" v-on:click="home()"></div>
        <div class="mobile-bar">
          <span class="line"></span>
          <span class="line"></span>
        </div>
        <nav class="mobile-nav">
          <div class="nav-wrap">
            <ul class="menu-list">
              <li class="list-item"><a href="#">제품</a></li>
              <li class="list-item"><a href="#">브랜드</a></li>
              <li class="list-item"><a href="#">경험</a></li>
              <li class="list-item"><a href="#">매거진</a></li>
              <li class="list-item"><a href="#">성분</a></li>
              <li class="list-item"><a href="#">이벤트</a></li>
              <li class="list-item"><a href="#">로그인</a></li>
              <li class="list-item"><a href="#">(0)</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="header-bg"></div>
  </header>
</template>

<script>
import logoData from '../../js/logoData.js'
  export default {
    data(){
      return{

      }
    },
    props:{},
    components:{},
    methods:{
      home(){
        this.$router.push('/')
      }
    },
    mounted(){
      // logo 넣기
      const pcLogo = document.querySelector('.pc-logo')
      const mobileLogo = document.querySelector('.mobile-logo')
      pcLogo.innerHTML= logoData;
      mobileLogo.innerHTML= logoData;
    }
  }
</script>

<style lang="scss" scoped src="../../assets/scss/layout/_navBar.scss">
  
</style>
