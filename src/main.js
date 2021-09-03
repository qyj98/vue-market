import Vue from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import './eventBus';
import 'lib-flexible';
import 'vant/lib/index.css';
import api from './api/api';

Vue.use(Vant);
Vue.config.productionTip = false;
// ?将接口加入vue的prototype中作为它的实例方法$api
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
