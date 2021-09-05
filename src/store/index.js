import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/api';
import { save } from '../utills/goodsStorage';
import { saveHistory } from '../utills/historyStorage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAsideList: [], // 侧边栏数据
    showLoading: false,
    tabName: '',
    goodsList: [], // 商品数据
    sort: 'all',
    total: 0,
    type: null,
    counterMap: {}, // ?商品加入购物车数量包含id和num
    searchHsitory: [],
    selectedGoods: [],
  },
  mutations: {
    settabAsideList(state, asideList) {
      state.tabAsideList = asideList;
    },
    setShowLoading(state, payload) {
      state.showLoading = payload;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    setTabName(state, tabName) {
      state.tabName = tabName;
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
    // ?将localstorage中的记录数据整体保存再仓库中
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setHistory(state, searchHsitory) {
      state.searchHsitory = searchHsitory;
    },
    // ?修改仓库中记录数据(counterMap)的内部数据,修改后重新保存在localstorage中
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
    deleteStorageItem(state, id) {
      Vue.delete(state.counterMap, id);
      save(state.counterMap);
    },
    // ?添加搜索历史
    historyAdd(state, obj) {
      // 重复的搜索历史就遍历删掉旧的，新的添加在数组前面，超出限定数量的就删除数组最后的数据
      state.searchHsitory.forEach((item, index) => {
        if (obj.text === item.text) {
          state.searchHsitory.splice(index, 1);
        }
      });
      state.searchHsitory.unshift(obj);
      if (state.searchHsitory.length > 10) {
        state.searchHsitory.splice(10, 1);
      }
      saveHistory(state.searchHsitory);
    },
    setSelectedGoods(state, obj) {
      state.selectedGoods.unshift(obj);
    },
  },
  actions: {
    // ?获取侧边栏数据并保存在仓库中的tabAsideList中
    async getAsideList(ctx, type) {
      ctx.commit('setShowLoading', true);
      const resp = await api.getTabList(type);
      ctx.commit('settabAsideList', resp);
      ctx.commit('setShowLoading', false);
    },
    // ?保存筛选方式, 销量,综合,价格
    setSortType(ctx, type) {
      ctx.commit('setSortType', type);
    },
    // ?获取商品列表
    async getGoodsList(ctx, options) {
      const {
        type = ctx.state.type, page = 1, size = 7, sort = ctx.state.sort,
      } = options;
      const { list, total } = await api.getGoodsList(type, page, size, sort);
      ctx.commit('setGoodsList', list);
      ctx.commit('setGoodsTotal', total);
      ctx.commit('setGoodsType', type);
    },
  },
  modules: {
  },
});
