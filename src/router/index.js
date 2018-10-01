import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '', component: App }
  ],
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 })
});

export default router;
