import VProgress from './src/progress';

VProgress.install = function(Vue) {
  VProgress.component(VProgress.name, VProgress);
};

export default VProgress;
