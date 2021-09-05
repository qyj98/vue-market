<template>
  <div class="shop-container">
    <van-nav-bar
      title="购物车"
      right-text="删除"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="del"
    />
    <div class="card" v-if="showContent">
      <van-checkbox-group
        class="card-content"
        v-model="result"
        ref="checkboxGroup"
      >
        <div class="card-box" v-for="(item, i) in selectedGoods" :key="item.id">
          <div class="checkBtn">
            <van-checkbox :name="item.id" @click="itemCheck(item.checked, i)">
            </van-checkbox>
          </div>
          <div class="card-item">
            <goods-card
              v-bind="item"
              :num="counterMap[item.id]"
              @goodsNumChange="handleGoodsChange"
              @moveTo="handleMoveTo"
            ></goods-card>
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <div class="holderImg" v-else>
      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
      />
    </div>
    <van-submit-bar class="shopFooter" :price="totalPrice" button-text="去结算">
      <van-checkbox ref="checkAll" v-model="checked" @click="checkAll(checked)">
        全选
      </van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Dialog, Toast } from 'vant';
import GoodsCard from '../components/GoodsCard.vue';
import moveToShop from '../mixin/moveToShop';
// import moveToShopping from '../utills/moveToShopping';

export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      checked: false, // ?是否全选
      selectedGoods: [], // ?加购的商品数组
      result: [], // ?当前选中的商品id数组（每个checkbox的标识符name对应数据组成的数组）
      showContent: false, // ?当前是否有加购的商品
      show: false,
    };
  },
  async created() {
    const resp = Object.keys(this.counterMap);
    this.result = resp.map(Number);
    this.showContent = false;
    const { list } = await this.$api.getGoodsByIds(resp.join(','));
    // ?映射
    const checkList = list.map((item) => ({
      ...item,
      checked: true,
    }));
    this.selectedGoods = checkList;
    if (this.selectedGoods.length > 0) {
      this.checked = true;
      this.showContent = true;
    } else {
      this.checked = false;
      this.showContent = false;
    }
  },
  computed: {
    ...mapState(['counterMap', 'goodsList']),
    totalPrice() {
      const resp = this.selectedGoods
        .filter((item) => item.checked)
        .map((item) => item.price * this.counterMap[item.id] * 100)
        .reduce((prev, cur) => prev + cur, 0);
      return resp;
    },
  },
  mixins: [moveToShop()],
  methods: {
    // ?改变商品加购数量
    handleGoodsChange(id, value) {
      if (this.counterMap[id] === 1 && value === -1) {
        Dialog.confirm({
          message: '您是否要删除已选中商品',
        })
          .then(() => {
            this.$store.commit('storageChange', { id, value });
            this.selectedGoods = this.selectedGoods.filter((item) => item.id !== id);
            if (this.selectedGoods.length === 0) {
              this.showContent = false;
              this.checked = false;
            }
          })
          .catch(() => {
            Toast('已取消');
          });
      }
      if (this.counterMap[id] > 1 || value === 1) {
        this.$store.commit('storageChange', { id, value });
      }
    },
    // ?全选
    checkAll(value) {
      if (this.selectedGoods.length === 0) {
        console.log(1);
        Toast('当前没有任何商品哦');
        this.checked = false;
        return;
      }
      if (!value) {
        this.selectedGoods = this.selectedGoods.map((item) => ({
          ...item,
          checked: false,
        }));
      } else {
        this.selectedGoods = this.selectedGoods.map((item) => ({
          ...item,
          checked: true,
        }));
      }
      this.$refs.checkboxGroup.toggleAll(value);
    },
    // ?选中单条商品
    itemCheck(checkStatus, index) {
      if (checkStatus) {
        this.selectedGoods[index].checked = false;
      } else {
        this.selectedGoods[index].checked = true;
      }
      // ?如果当前有未选中的商品，就取消全选
      const arr = Object.keys(this.counterMap).map(Number);
      for (let i = 0; i < arr.length; i += 1) {
        if (this.result.indexOf(arr[i]) < 0) {
          this.checked = false;
          return;
        }
      }
      this.checked = true;
    },
    del() {
      const delList = this.selectedGoods.filter((item) => item.checked);
      Dialog.confirm({
        message: '您是否要删除已选中商品',
      })
        .then(() => {
          delList.forEach((item) => {
            this.$store.commit('deleteStorageItem', item.id);
          });
          this.selectedGoods = this.selectedGoods.filter((item) => !item.checked);
          if (this.selectedGoods.length === 0) {
            this.showContent = false;
            this.checked = false;
          }
        })
        .catch(() => {
          Toast('已取消');
        });
    },
  },
};
</script>

<style lang="less" scoped>
.shop-container {
  width: 100%;
  height: 100vh;
  background: #fff;
  .card {
    width: 100%;
    top: 46px;
    height: 521px;
    position: absolute;
    box-sizing: border-box;
    padding: 0px 10px;
    background: #fff;
    overflow-y: scroll;
    .card-content {
      .card-box {
        width: 100%;
        box-sizing: border-box;
        padding: 0.133333rem 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .card-item {
          margin-left: 10px;
          width: 100%;
        }
      }
    }
  }
  .shopFooter {
    bottom: 1.3333rem;
  }
  .card::-webkit-scrollbar {
    width: 0;
    background: none;
  }
}
</style>>
