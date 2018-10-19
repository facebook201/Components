/* 导入组件 */
import Button from './Button';
import ButtonGroup from './Button/button-group';
import Radio from './radio';
import Checkbox from './checkbox';
// import Tree from './tree';

const components = [
    Button,
    ButtonGroup,
    Radio,
    Checkbox
];

// 定义一个安装方法给 Vue.use
const install = function(Vue, opts = {}) {
    // locale.use(opts.locale);
    // 循环注册组件
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    // 实例挂载
    // Vue.property.$alert = MessageBox.alert;
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const SyUI = {
    version: '2.4.6',
    install,
    Button,
    ButtonGroup,
    Radio,
    Checkbox
};

export default SyUI;