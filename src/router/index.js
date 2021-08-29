import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '*',
    redirect: {
      path: '/',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
