<template>
  <header>
    <div class="header-wrap">
      <div class="pc-menu">
        <div class="pc-logo" v-on:click="home()"></div>
        <div class="pc-bar" v-on:click="pcMenuActive()">
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
        <div class="mobile-bar" v-on:click="mobileMenuActive()">
          <span class="line topLine"></span>
          <span class="line bottomLine"></span>
        </div>
        <nav class="mobile-nav">
          <div class="nav-wrap">
            <img class="wide-logo" src="../../assets/images/logo-wide.png" alt="logo">
            <ul class="menu-list">
              <li class="list-item"><a href="#">제품</a></li>
              <li class="list-item"><a href="#">브랜드</a></li>
              <li class="list-item"><a href="#">경험</a></li>
              <li class="list-item"><a href="#">매거진</a></li>
              <li class="list-item"><a href="#">성분</a></li>
              <li class="list-item"><a href="#">이벤트</a></li>
            </ul>
            <ol class="subMenu-list">
              <li class="list-item mobile-login"><a href="#">로그인</a></li>
              <li class="list-item mobile-cart"><a href="#">(0)</a></li>
            </ol>
          </div>
        </nav>
      </div>
    </div>
    <div class="header-pcBg"></div>
    <div class="header-mobileBg"></div>
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
      },
      pcMenuActive(){
        const pcMenuBar = document.querySelector('.pc-bar')
        const pcMenuNav = document.querySelector('.pc-nav')
        const pcBg = document.querySelector('.header-pcBg')
        pcMenuBar.addEventListener('click',function(){
          pcMenuBar.classList.toggle('active')
          pcMenuNav.classList.toggle('active')
          pcBg.classList.toggle('active')
        })
      },
      mobileMenuActive(){
        const mobileMenuBar = document.querySelector('.mobile-bar')
        const mobileMenuNav = document.querySelector('.mobile-nav')
        const mobileBg = document.querySelector('.header-mobileBg')
        mobileMenuBar.addEventListener('click',function(){
          mobileMenuBar.classList.toggle('active')
          mobileMenuNav.classList.toggle('active')
          mobileBg.classList.toggle('active')
        })
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
