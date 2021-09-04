<template>
  <div class="list-container">
    <div class="list-header" ref="header">
      <div
        :class="{ active: sortType === 'all' }"
        @touchend="changeType('all')"
      >
        综合
      </div>
      <div
        :class="{ active: sortType === 'sale' }"
        @touchend="changeType('sale')"
      >
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': sortType === 'price-up',
          'price-down': sortType === 'price-down',
        }"
        @touchend="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content" ref="container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有了"
          @load="onLoad"
          :immediate-check="false"
        >
          <goods-card
            v-for="item in goodsList"
            :key="item.id"
            v-bind="item"
            :num="counterMap[item.id]"
            @goodsNumChange="handleGoodsChange"
            @moveTo="handleMoveTo"
          ></goods-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from './GoodsCard.vue';
import moveToShop from '../mixin/moveToShop';
// import moveToShopping from '../utills/moveToShopping';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      isLoading: false, // ?是否下拉刷新中
      loading: false, // ?是否正在加载下一页数据
      finished: false, // ?是否已经没有下一页数据了
      page: 1, // ?当前页码
    };
  },
  computed: {
    ...mapState(['sort', 'goodsList', 'type', 'total', 'counterMap']),
    sortType() {
      return this.sort;
    },
  },
  mixins: [moveToShop()],
  methods: {
    // // ?点击加入购物车,修改仓库中的记录数据counterMap
    // handleGoodsChange(id, value) {
    //   this.$store.commit('storageChange', { id, value });
    // },
    // // ?飞入购物车
    // handleMoveTo(img, dom) {
    //   // dom要插入的外部容器
    //   const outerContainer = document.getElementById('app');
    //   const target = document.getElementById('shop-car');
    //   // 图片位置宽高
    //   const {
    //     left: imgLeft,
    //     top: imgTop,
    //     height: imgHeight,
    //     width: imgWidth,
    //   } = dom.getBoundingClientRect();
    //   // 目标(购物车)位置宽高
    //   const {
    //     left: carLeft,
    //     top: carTop,
    //     height: carHeight,
    //     width: carWidth,
    //   } = target.getBoundingClientRect();
    //   // yx方向偏移距离
    //   const disY = carTop + carHeight / 2 - imgTop - imgHeight / 2;
    //   const disX = carLeft + carWidth / 2 - imgLeft - imgWidth / 2;
    //   moveToShopping({
    //     img,
    //     imgLeft,
    //     imgTop,
    //     outerContainer,
    //     disY,
    //     disX,
    //     callback: () => {
    //       target.classList.remove('active');
    //       // this.$bus.$emit('goodsAdd');
    //     },
    //   });
    // },
    // ?滚动到底部加载下一页
    onLoad() {
      if (this.finished) {
        return;
      }
      this.page += 1;
      this.loading = true;
      // ?防抖处理
      setTimeout(() => {
        this.$store
          .dispatch('getGoodsList', { page: this.page, sort: this.sortType })
          .then(() => {
            this.loading = false;
            if (this.goodsList.length >= this.total) {
              this.finished = true;
            }
          });
      }, 50);
    },
    // ?下拉刷新
    onRefresh() {
      this.page = 0;
      this.$store.commit('resetGoodsList');
      this.finished = false;
      this.isLoading = true;
      this.onLoad();
      this.isLoading = false;
    },
    // ?切换商品展示筛选方式,销量,价格升降?
    changeType(val) {
      if (val === 'price') {
        if (this.sortType === 'price-up') {
          this.$store.dispatch('setSortType', 'price-down');
        } else {
          this.$store.dispatch('setSortType', 'price-up');
        }
      } else {
        this.$store.dispatch('setSortType', val);
      }
      this.onRefresh();
    },
  },
  // ?切换商品子类目重新加载数据
  watch: {
    type() {
      this.page = 0;
      this.$store.commit('resetGoodsList');
      this.finished = false;
      this.isLoading = false;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.list-container {
  transform: translateY(0);
  transition: all 0.3s;
  position: fixed;
  border-top: 1px solid #eee;
  top: 135px;
  right: 0;
  width: 296px;
  bottom: 50px;
  overflow: auto;
}
.list-header {
  position: sticky;
  top: 0;
  height: 25px;
  width: 280px;
  padding: 0 8px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  z-index: 100;
  background: #fff;
  > div {
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #cecece;
    position: relative;
  }
  .active,
  .price-up,
  .price-down {
    font-weight: bold;
    color: #ff1a90;
  }
  .price::before {
    position: absolute;
    content: "";
    right: 0;
    top: 3px;
    border: 4px solid transparent;
    border-bottom-color: #aaa;
  }
  .price::after {
    content: "";
    border: 4px solid transparent;
    position: absolute;
    right: 0;
    bottom: 3px;
    border-top-color: #aaa;
  }
  .price-up::before {
    border-bottom-color: #ff1a90;
  }
  .price-down::after {
    border-top-color: #ff1a90;
  }
}
.list-content {
  // position: relative;
  width: 296px;
  height: calc(100vh - 160px - 1.33rem);
  left: 0;
  overflow: auto;
}
.van-loading {
  top: 10px;
}
.van-pull-refresh {
  overflow: visible;
  -webkit-user-select: none;
  user-select: none;
}
.list-container::-webkit-scrollbar {
  width: 0px;
  background: none;
}
.list-content::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
