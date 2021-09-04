<template>
  <div class="home-container">
    <van-nav-bar
      title="购物车"
      right-text="删除"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />
    <div>
      <img src="">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickRight() {},
  },
};
</script>

<style>
</style>
