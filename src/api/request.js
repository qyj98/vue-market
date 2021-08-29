import axios from 'axios';

const ins = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'qyj98_1629126631087',
  },
});

ins.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

export default ins;
