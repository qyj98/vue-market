import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAsideList: [], // 侧边栏数据
    isLoading: false,
    goodsList: [], // 商品数据
  },
  mutations: {
    settabAsideList(state, asideList) {
      state.tabAsideList = asideList;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setGoodsList(state, list) {
      state.goodsList = list;
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
    // 获取商品列表
    async getGoodsList(ctx, options) {
      const {
        type, page = 1, size = 7, sortType = 'all',
      } = options;
      const { list } = await api.getGoodsList(type, page, size, sortType);
      ctx.commit('setGoodsList', list);
    },
  },
  modules: {
  },
});
