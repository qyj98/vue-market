<template>
  <div id="app">
    <transition :name="transitionName" :mode="this.$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"></router-view>
    </transition>
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
  data() {
    // 路由切换的过渡动画
    return {
      transitionName: 'left',
    };
  },
  watch: {
    $route(to, from) {
      // ?直接写transitionName会导致原始页面变空白再出现过渡动画，给一个变量back表示过度方式
      // if (to.name === 'Classify' && from.name === 'Search') {
      //   // this.$router.back = true;
      //   this.transitionName = 'right';
      // } else if (to.name === 'Search' && from.name === 'Classify') {
      //   this.transitionName = 'left';
      // } else {
      //   this.transitionName = '';
      // }
      if (to.name === 'Classify' && from.name === 'Search') {
        this.$router.back = 'toSearch';
      } else if (to.name === 'Search' && from.name === 'Classify') {
        this.$router.back = 'toClassify';
      }
      if (this.$router.back === 'toSearch') {
        this.transitionName = 'right';
      } else if (this.$router.back === 'toClassify') {
        this.transitionName = 'left';
      } else {
        this.transitionName = '';
      }
      this.$router.back = '';
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/asset/reset';
#app{
  width: 100vw;
  height: 100vh;
  .view{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: transform .3s linear;
  }
  .left-enter{
    transform: translate(100%, 0);
  }
  .right-leave-to{
    transform: translate(100%, 0);
  }
}
</style>
