<template>
  <div class="home-container">
    <div class="search-btn">
       <van-icon name="search" />
       <div>苹果特价一元一斤</div>
    </div>
    <Tab1 />
  </div>
</template>

<script>
import Tab1 from '../components/Tab1.vue';

export default {
  components: {
    Tab1,
  },
};
</script>

<style lang="less" scoped>
.search-btn {
  width: 355px;
  height: 33px;
  line-height: 33px;
  margin: 11px auto 0;
  border-radius: 10px;
  background-color: #eee;
  color: #a1a1a1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
