<template>
  <div class="card-container van-hairline--bottom">
    <div class="card-img"  ref="imgContainer">
      <img :src="images[0]" />
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{ title }}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="prices">￥{{ price }}</div>
      <div class="counter">
        <div class="couterIncreace" v-if="num" @touchend="itemDecreace(id)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div class="couterDecreace" @touchend="itemIncreace(id)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['images', 'title', 'tags', 'desc', 'price', 'id', 'num'],
  methods: {
    itemIncreace() {
      this.$emit('goodsNumChange', this.id, 1);
      // ?飞入购物车
      this.$emit('moveTo', this.images[0], this.$refs.imgContainer);
    },
    itemDecreace() {
      this.$emit('goodsNumChange', this.id, -1);
    },
  },
};
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  display: flex;
  height: 100px;
  position: static;
  .card-img {
    width: 90px;
    height: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      color: #ff1a90;
      font-weight: bold;
      font-size: 13px;
    }
    .counter {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      bottom: 10px;
      div:not(.num) {
        img {
          width: 18px;
        }
      }
      .num{
        font-size: 14px;
        padding: 0 5px;
      }
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
