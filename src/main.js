// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './packages/theme/index.styl';

Vue.use(ElementUI);

Vue.component('my-com', {
  render: function (h){
		return h(
			'h' + this.level,
			this.$slots.default
		);
	},
	props: {
		level: {
			type: Number,
			required: true
		}
  },
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
		router,
    render: h => h(App)
});
