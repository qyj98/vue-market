<template>
  <div class="list-container">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type === 'all' }" @touchend="changeType('all')">
        综合
      </div>
      <div :class="{ active: type === 'sale' }" @touchend="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': type === 'price-up',
          'price-down': type === 'price-down',
        }"
        @touchend="changeType('price')"
      >
        价格
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'price-up',
    };
  },
  methods: {
    changeType(val) {
      if (val === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = val;
      }
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
</style>
