<template>
  <div class="tab-aside-container" ref="container">
    <div
      v-for="(item, i) in tabAsideList"
      :key="item"
      :class="{ active: i === index }"
      @touchstart="move = false"
      @touchmove="move = true"
      @touchend="scrollTo(i, $event)"
    >
      {{ i === 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moveTo from '../utills/tools';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  // ?从仓库中获取侧边导航数据
  computed: {
    ...mapState(['tabAsideList', 'sort', 'tabName']),
  },
  // ?一开始就加载一次商品数据
  mounted() {
    this.$store.commit('resetGoodsList');
    this.$store.dispatch('getGoodsList', { type: this.tabAsideList[0], sort: this.sort });
  },
  methods: {
    async scrollTo(i, e) {
      if (!this.move) {
        this.index = i;
        const { container } = this.$refs;
        const itemTop = e.target.getBoundingClientRect().top;
        const halfItemHeight = e.target.offsetHeight / 2;
        const containerTop = container.offsetTop;
        const halfContainerHeight = container.offsetHeight / 2;
        const disc = itemTop + halfItemHeight - containerTop - halfContainerHeight;
        moveTo(container.scrollTop, disc, container, 'scrollTop');
        // ?仅保存当前的商品类型,在商品列表处监听watch商品类型变化,变化了就重新加载数据
        this.$store.commit('setGoodsType', this.tabAsideList[i]);
      }
    },
  },
  watch: {
    tabName() {
      this.$store.dispatch('getAsideList', this.tabName);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-aside-container {
  position: fixed;
  top: 137px;
  left: 0;
  width: 79px;
  bottom: 1.33333rem;
  background: #f8f8f8;
  overflow: auto;
  div {
    width: 100%;
    text-align: center;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
  }
}
.tab-aside-container::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
