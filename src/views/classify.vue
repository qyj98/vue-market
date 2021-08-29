<template>
  <div class="home-container">
    <div class="search-btn">
       <van-icon name="search" />
       <div>苹果特价一元一斤</div>
    </div>
    <Tab1 />
    <template v-if="!isLoading">
      <TabAside />
    </template>
    <van-loading v-else-if="isLoading" color="#ff1a90" size="1rem" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tab1 from '../components/Tab1.vue';
import TabAside from '../components/TabAside.vue';

export default {
  components: {
    Tab1,
    TabAside,
  },
  computed: {
    ...mapState(['isLoading']),
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
.van-loading{
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
