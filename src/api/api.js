import request from './request';

// 请求二级导航列表
async function getTabList(type) {
  const resp = await request.get('/getsidebar', {
    params: {
      type,
    },
  });
  return resp;
}

export default { getTabList };
