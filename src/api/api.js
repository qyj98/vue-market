import request from './request';

// 获取二级导航列表
async function getTabList(type) {
  const resp = await request.get('/getsidebar', {
    params: {
      type,
    },
  });
  return resp;
}

// 获取商品列表
async function getGoodsList(type, page, size, sort) {
  const resp = await request.get('/getGoodsList', {
    params: {
      type,
      page,
      size,
      sort,
    },
  });
  return resp;
}

// 模糊搜索
async function getLikeSearch(likeValue) {
  const resp = await request.get('/likeSearch', {
    params: {
      likeValue,
    },
  });
  return resp;
}

// 搜索
async function getSearchList(type, page, size) {
  const resp = await request.get('/search', {
    params: {
      type,
      page,
      size,
    },
  });
  return resp;
}

export default {
  getTabList, getGoodsList, getLikeSearch, getSearchList,
};
