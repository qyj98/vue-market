import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAsideList: [],
    isLoading: false,
  },
  mutations: {
    settabAsideList(state, asideList) {
      state.tabAsideList = asideList;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
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
  },
  modules: {
  },
});
