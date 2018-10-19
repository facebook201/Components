import SyCheckbox from './src/checkbox';

SyCheckbox.install = function(Vue) {
  Vue.component(ElCheckbox.name, SyCheckbox);
};

export default SyCheckbox;