<template>
  <div class="list-container">
    <div class="list-header van-hairline--top-bottom" ref="header">
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
            v-for="(item, i) in goodsList"
            :key="i"
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
import moveToShopping from '../utills/moveToShopping';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      isLoading: false, // ?是否
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {
    ...mapState(['sort', 'goodsList', 'type', 'total', 'counterMap']),
    sortType() {
      return this.sort;
    },
  },
  methods: {
    handleGoodsChange(id, value) {
      // ?点击加入购物车,修改仓库中的记录数据counterMap
      this.$store.commit('storageChange', { id, value });
    },
    handleMoveTo(img, dom) {
      const home = document.getElementById('app');
      console.log(home);
      const cContainer = this.$refs.container;
      const imgLeft = dom.offsetLeft;
      const cTop = this.$refs.container.getBoundingClientRect().top;
      const headerHeight = this.$refs.header.getBoundingClientRect().height;
      const imgTop = dom.getBoundingClientRect().top - cTop + headerHeight;
      const imgHeight = dom.getBoundingClientRect().height;
      const cHeight = this.$refs.container.getBoundingClientRect().height;
      const discY = cHeight - imgTop + imgHeight / 2;
      // 飞入购物车  图片     图片位置      存放的外部容器 移动的距离
      moveToShopping({
        img,
        imgLeft,
        imgTop,
        cContainer,
        discY,
        callback: () => {
          console.log('飞入完成');
        },
      });
    },
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
      }, 300);
    },
    onRefresh() {
      this.page = 0;
      this.$store.commit('resetGoodsList');
      this.finished = false;
      this.isLoading = true;
      this.onLoad();
      this.isLoading = false;
    },
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
    // async changeType(val) {
    //   if (val === 'price') {
    //     if (this.sortType === 'price-up') {
    //       this.$store.dispatch('setSortType', 'price-down');
    //     } else {
    //       this.$store.dispatch('setSortType', 'price-up');
    //     }
    //   } else {
    //     this.$store.dispatch('setSortType', val);
    //   }
    //   this.$store.commit('resetGoodsList');
    //   this.page = 1;
    //   await this.$store.dispatch('getGoodsList', {
    //     page: this.page,
    //     sort: this.sortType,
    //   });
    //   this.finished = false;
    //   this.loading = false;
    // },
  },
  watch: {
    type() {
      this.page = 0;
      this.$store.commit('resetGoodsList');
      this.finished = false;
      this.isLoading = false;
      this.onLoad();
    },
    // counterMap() {
    //   this.counterMap = fetch();
    // },
  },
};
</script>

<style lang="less" scoped>
.list-container {
  transform: translateY(0);
  transition: all .3s;
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
</style>
