import SyRadio from './src/radio';

SyRadio.install = function(Vue) {
  Vue.component(SyRadio.name, SyRadio);
};

export default SyRadio;
