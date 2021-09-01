import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/api';
import { save } from '../utills/goodsStorage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAsideList: [], // 侧边栏数据
    isLoading: false,
    goodsList: [], // 商品数据
    sort: 'all',
    total: 0,
    type: null,
    counterMap: {}, // ?商品加入购物车数量包含id和num
  },
  mutations: {
    settabAsideList(state, asideList) {
      state.tabAsideList = asideList;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    setSortType(state, type) {
      state.sort = type;
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setGoodsTotal(state, total) {
      state.total = total;
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    // ?将localstorage中的数据保存再仓库中
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    // ?修改仓库中记录数据(counterMap)修改后重新保存在localstorage中
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if (state.counterMap[id] === 1 && value === -1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      save(state.counterMap);
    },
  },
  actions: {
    // 获取侧边栏数据并保存在仓库中的tabAsideList中
    async getAsideList(ctx, type) {
      ctx.commit('setIsLoading', true);
      const resp = await api.getTabList(type);
      ctx.commit('settabAsideList', resp);
      ctx.commit('setIsLoading', false);
    },
    // 保存筛选方式
    setSortType(ctx, type) {
      ctx.commit('setSortType', type);
    },
    // 获取商品列表
    async getGoodsList(ctx, options) {
      const {
        type = ctx.state.type, page = 1, size = 7, sort = ctx.state.sort,
      } = options;
      // const type = options.type || ctx.state.type;
      const { list, total } = await api.getGoodsList(type, page, size, sort);
      ctx.commit('setGoodsList', list);
      ctx.commit('setGoodsTotal', total);
      ctx.commit('setGoodsType', type);
      if (total > ctx.state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
