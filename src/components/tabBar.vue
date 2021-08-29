<template>
  <van-tabbar route fixed>
  <van-tabbar-item icon="home-o" :to="{name: 'Home'}">首页</van-tabbar-item>
  <van-tabbar-item icon="apps-o"  :to="{name: 'Classify'}">分类</van-tabbar-item>
  <van-tabbar-item icon="cart-o"  :to="{name: 'Shopping'}">购物车</van-tabbar-item>
  <van-tabbar-item icon="user-circle-o"  :to="{name: 'Me'}">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
export default {

};
</script>

<style>

</style>
