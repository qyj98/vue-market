<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { fetch } from './utills/goodsStorage';
import { fetchHistory } from './utills/historyStorage';

export default {
  // ?一开始获取localstorage中的数据,保存再仓库中的记录数据
  created() {
    const counterMap = fetch();
    const history = fetchHistory();
    this.$store.commit('setCounterMap', counterMap);
    this.$store.commit('setHistory', history);
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
#app{
  width: 100vw;
  height: 100vh;
}
</style>
