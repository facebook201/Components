// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
Vue.config.productionTip = false;
import 'element-ui/lib/theme-chalk/index.css';
// import './packages/theme/index.styl';
import ElementUI from './element';

import dayjs from 'dayjs';
// import SyUI from './packages';

Vue.use(ElementUI);
// Vue.use(SyUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
  render: h => h(App)
});
