// 本地化存储
const LOCAL_KEY = 'goods'; //! 保存到localstorage中的键值对键名
// 从localstorage获取目前所有任务 键名为LOCAL_KEY的键值
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return {};
}

// 保存商品数量数据对象到locaStorage中 goods包含id和num
export function save(goods) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(goods));
}
