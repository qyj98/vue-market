<template>
  <div class="list-container">
    <div class="list-header van-hairline--top-bottom">
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
    <div class="list-content">
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
          ></goods-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from './GoodsCard.vue';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {
    ...mapState(['sort', 'goodsList', 'type', 'total']),
    sortType() {
      return this.sort;
    },
  },
  // created() {
  //   console.log(this.loading, this.isLoading, this.finished);
  // },
  methods: {
    onRefresh() {
      console.log(1);
      this.page = 0;
      this.$store.commit('resetGoodsList');
      this.finished = false;
      this.isLoading = false;
      this.onLoad();
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
  },
};
</script>

<style lang="less" scoped>
.list-container {
  position: relative;
  top: -10.5px;
  left: 79px;
}
.list-header {
  width: 296px;
  position: relative;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end;
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
  position: relative;
  width: 296px;
  height: 455px;
  left: 0;
  overflow: auto;
}
.van-loading {
  top: 10px;
}
</style>
