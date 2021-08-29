import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAsideList: [], // 侧边栏数据
    isLoading: false,
    goodsList: [], // 商品数据
    sort: 'all',
    type: null,
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
    resetGoodsList(state) {
      state.goodsList = [];
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
        page = 1, size = 7, sort = 'all',
      } = options;
      const type = options.type || ctx.state.type;
      const { list } = await api.getGoodsList(type, page, size, sort);
      ctx.commit('setGoodsList', list);
      ctx.commit('setGoodsType', type);
    },
  },
  modules: {
  },
});
