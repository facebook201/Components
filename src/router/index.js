import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../view/layout';
import Home from '../view/home';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', 
      component: Layout,
      redirect: '/home'
    }
  ],
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 })
});

export default router;
