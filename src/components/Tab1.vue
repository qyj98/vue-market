<template>
  <div class="tab1-container" ref="container">
    <div
      class="tab-item"
      @touchstart="move = false"
      @touchmove="move = true"
      @touchend="scrollTo(i, $event)"
      v-for="(item, i) in menuList"
      :key="item.title"
      :class="{ active: index === i }"
    >
      <div class="tabImg">
        <img :src="item.imgURL" />
      </div>
      <div class="tabTitle">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import moveTo from '../utills/tools';

export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    async scrollTo(i, e) {
      if (!this.move) {
        this.index = i;
        const { container } = this.$refs;
        const halfContainerWidth = container.offsetWidth / 2;
        const halfItemWidth = e.target.offsetWidth / 2;
        const ItemLeft = e.target.getBoundingClientRect().left;
        const disc = ItemLeft + halfItemWidth - halfContainerWidth;
        moveTo(container.scrollLeft, disc, container, 'scrollLeft');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tab1-container {
  display: flex;
  height: 104px;
  justify-content: flex-start;
  align-content: center;
  padding: 0;
  overflow: scroll;
  .tab-item {
    width: 50px;
    height: 70px;
    margin: 10px 5px;
    background-color: #fff;
    .tabImg {
      width: 50px;
      height: 50px;
      border: 2px solid #fff;
      border-radius: 46px;
      display: flex;
      justify-content: center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }
    .tabTitle {
      margin-top: 5px;
      color: #000;
      text-align: center;
    }
  }
  .active {
    .tabImg {
      border: 2px solid #d13193;
    }
    .tabTitle {
      font-weight: bold;
      background-color: #d13193;
      color: #fff;
      border-radius: 60px;
    }
  }
}
.tab1-container::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>
