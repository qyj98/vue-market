// 混合飞入购物车,更新localstorage购物车数据
import moveToShopping from '../utills/moveToShopping';

export default function () {
  return {
    methods: {
      // ?点击加入购物车,修改仓库中的记录数据counterMap
      handleGoodsChange(id, value) {
        this.$store.commit('storageChange', { id, value });
      },
      // ?飞入购物车
      handleMoveTo(img, dom) {
        // dom要插入的外部容器
        const outerContainer = document.getElementById('app');
        const target = document.getElementById('shop-car');
        // 图片位置宽高
        const {
          left: imgLeft,
          top: imgTop,
          height: imgHeight,
          width: imgWidth,
        } = dom.getBoundingClientRect();
        // 目标(购物车)位置宽高
        const {
          left: carLeft,
          top: carTop,
          height: carHeight,
          width: carWidth,
        } = target.getBoundingClientRect();
        // yx方向偏移距离
        const disY = carTop + carHeight / 2 - imgTop - imgHeight / 2;
        const disX = carLeft + carWidth / 2 - imgLeft - imgWidth / 2;
        moveToShopping({
          img,
          imgLeft,
          imgTop,
          outerContainer,
          disY,
          disX,
          callback: () => {
            target.classList.remove('active');
          },
        });
      },

    },
  };
}
