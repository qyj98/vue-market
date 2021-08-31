<template>
  <van-tabbar route fixed>
  <van-tabbar-item icon="home-o" :to="{name: 'Home'}">首页</van-tabbar-item>
  <van-tabbar-item icon="apps-o"  :to="{name: 'Classify'}">分类</van-tabbar-item>
  <van-tabbar-item icon="cart-o" :badge="badge" :to="{name: 'Shopping'}">购物车</van-tabbar-item>
  <van-tabbar-item icon="user-circle-o"  :to="{name: 'Me'}">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['counterMap']),
    badge() {
      let count = Object.values(this.counterMap).reduce((prev, cur) => prev + cur, 0);
      if (count > 99) {
        count = '99+';
      }
      return count;
    },
  },
};
</script>

<style>

</style>
