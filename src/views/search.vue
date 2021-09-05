<template>
  <div class="search-container">
    <div class="search-header">
      <van-icon class="backBtn" name="arrow-left" @click="$router.goBack()" />
      <van-search
        class="inpContent"
        v-model.trim="value"
        show-action
        :placeholder="place"
        input-align="left"
        @search="onSearch"
        @input="input"
        @focus="onfocus"
      >
        <template #action>
          <div @click="onSearch(value)" v-if="showList">搜索</div>
          <div class="shop-car" v-else>
            <van-icon
            name="shopping-cart-o"
            id="shop-car"
            :badge="badge"
            @click="$router.push({name: 'Shopping'})" />
          </div>
        </template>
      </van-search>
    </div>
    <div class="list" v-if="showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template #default>
            <span v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="search-list" v-else>
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
    </div>
    <div class="history" v-if="showList && likeList.length === 0">
      <div class="title">历史记录:</div>
      <div class="historyContainer" v-if="searchHsitory.length > 0">
        <div
          class="history-item"
          @touchend="onSearch(item.text)"
          v-for="item in searchHsitory"
          :key="item.id"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from '../components/GoodsCard.vue';
import moveToShop from '../mixin/moveToShop';
import { generateId } from '../utills/historyStorage';

export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      value: '',
      place: '酒',
      timer: null,
      showList: true,
      finished: false,
      loading: false,
      likeList: [],
      goodsList: [],
      page: 0,
      total: 0,
      sHistory: {
        id: null,
        text: '',
      },
    };
  },
  computed: {
    ...mapState(['counterMap', 'searchHsitory']),
    badge() {
      let count = Object.values(this.counterMap).reduce(
        (prev, cur) => prev + cur,
        0,
      );
      if (count > 99) {
        count = '99+';
      }
      return count;
    },
  },
  mixins: [moveToShop()],
  methods: {
    // ?点击加入购物车,修改仓库中的记录数据counterMap
    handleGoodsChange(id, value) {
      this.$store.commit('storageChange', { id, value });
    },
    // ?输入时模糊搜素,防抖处理(输入关键字后如果'正在请求中'||'输入空白'就停止请求远程数据并初始化)
    async input(value) {
      if (!value) {
        // this.showList = false;
        this.likeList = [];
        this.goodsList = [];
      } else if (this.timer) {
        clearTimeout(this.timer);
        this.showList = false;
        this.timer = null;
        this.likeList = [];
        this.goodsList = [];
      } else {
        this.showList = true;
        this.value = value;
        this.timer = setTimeout(async () => {
          const { result } = await this.$api.getLikeSearch(this.value);
          this.likeList = result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    // ?聚焦就模糊搜素
    onfocus() {
      this.showList = true;
    },
    // ?匹配关键字更改颜色
    formatHTML(item) {
      // 全局匹配输入的关键字this.value--比如'酒'
      const reg = new RegExp(this.value, 'g');
      // 从模糊搜索的结果列表item中将正则reg匹配到的关键字替换成红色字体的关键字
      return item.replace(reg, this.value.fontcolor('red'));
    },
    // ?点击精确搜索
    onSearch(value) {
      if (value) {
        this.value = value;
        this.sHistory.id = generateId();
        this.sHistory.text = this.value;
        this.$store.commit('historyAdd', this.sHistory);
        this.sHistory = {};
      } else {
        this.value = this.place;
      }
      // 每次搜索初始化,
      this.showList = false;
      this.page = 0;
      this.goodsList = [];
      this.finished = false;
      this.onLoad();
    },
    // ?下拉加载更多
    async onLoad() {
      if (this.finished) {
        return;
      }
      this.page += 1;
      this.loading = true;
      const { list, total } = await this.$api.getSearchList(
        this.value,
        this.page,
        5,
      );
      this.goodsList = [...this.goodsList, ...list];
      this.total = total;
      if (this.goodsList.length < this.total) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 10;
  .search-header {
    position: fixed;
    display: flex;
    top: 0;
    box-sizing: border-box;
    background: #fff;
    padding: 0 20px;
    width: 100%;
    align-items: center;
    z-index: 20;
    justify-content: space-between;
    .backBtn {
      font-size: 22px;
    }
    .inpContent {
      flex: 1;
      .shop-car {
        display: flex;
        align-items: center;
        #shop-car {
          font-size: 20px;
        }
        .active {
          transition: all 0.3s ease-out;
          transform: scale(1.1);
          color: #f40;
        }
      }
    }
  }
  .list {
    top: 1.333333rem;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.8rem;
    background: #fff;
    z-index: 10;
  }
  .search-list {
    position: relative;
    width: 350px;
    margin: 48px auto 0;
    background: #fff;
    z-index: 10;
  }
  .history {
    position: absolute;
    width: 345px;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .historyContainer {
      display: flex;
      margin-top: 20px;
      margin-left: 10px;
      flex-wrap: wrap;
      .history-item {
        padding: 15px;
        margin: 0 0 10px 10px;
        background: #eee;
        border-radius: 10px;
      }
    }
  }
}
</style>>
