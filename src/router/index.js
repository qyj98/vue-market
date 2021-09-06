import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

VueRouter.prototype.back = ''; // ?是否返回上一页
VueRouter.prototype.goBack = function goBack() {
  this.go(-1); // ?切换回上次的路由
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: { name: 'Classify' },
    children: [{
      path: 'classify',
      name: 'Classify',
      component: () => import('@/views/classify.vue'),
    }, {
      path: 'shopping',
      name: 'Shopping',
      component: () => import('@/views/shopping.vue'),
    }, {
      path: 'me',
      name: 'Me',
      component: () => import('@/views/me.vue'),
    }],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search.vue'),
  },
  {
    path: '*',
    redirect: { name: 'Classify' },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
