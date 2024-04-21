<template>
  <div>
    <TopNoticeCom></TopNoticeCom>
    <HeaderCom></HeaderCom>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script>
import TopNoticeCom from '~/components/main/TopNoticeCom.vue';
import HeaderCom from '~/components/base/HeaderCom.vue';

  export default {
    components:{
      TopNoticeCom: TopNoticeCom,
      HeaderCom:HeaderCom
    }
  }
</script>

<style lang="scss" scoped>

</style>