<template>
  <div class="home-container">
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/tabBar.vue';

export default {
  components: {
    TabBar,
  },
};
</script>

<style scoped>
.home-container{
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
</style>
