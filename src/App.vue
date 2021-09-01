<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { fetch } from './utills/goodsStorage';

export default {
  // ?一开始获取localstorage中的数据,保存再仓库中的记录数据
  created() {
    const counterMap = fetch();
    this.$store.commit('setCounterMap', counterMap);
  },
};
</script>

<style lang="less">
li {
    list-style: none;
}

ul li body {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}
// #app{
//   width: 10rem;
//   height: 10rem;
// }
</style>
