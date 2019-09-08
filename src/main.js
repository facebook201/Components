import Vue from 'vue';
import App from './App';
import router from './router';
Vue.config.productionTip = false;
import 'element-ui/lib/theme-chalk/index.css';

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
