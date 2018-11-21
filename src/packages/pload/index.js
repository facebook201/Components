import Upload from './src';

Upload.install = function(Vue) {
  Vue.components(Upload.name, Upload);
};

export default Upload;
