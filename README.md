# VueComponents 命名为sy-components
平时项目中用的都是Vue 业务也多了 没有深入去学习Vue 也没有去写过基本组件。不深入学习 也就不知道自己有多渺小 多菜。所以这里一系列是阅读和学习Element-UI的组件源码 和 知识点。 然后来写一个自己的轮子组件。



####  主要目录 

+ package 组件的源码
+ src 工具函数 某些组件会用到这些函数
+ theme-chalk 是所有样式的文件



我们发现package文件夹下都有文件夹来放组件 文件夹下面有一个index.js. 代码如下

```javascript
import Button from './src/button';
// 这里是让Vue 可以把组件当插件使用 Vue.use 来安装
Button.install = function install(Vue) {
    Vue.component(Button.name, Button);
}

// 导出组件
export default Button;
```

有2种方法使用组件，一是当做插件，而是直接import后注册组件，官网示例代码如下，也可以不注册成全局组件

```javascript
import Vue from 'vue';
import { Button } from 'element-ui';
import App from './App.vue';
Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */
new Vue({
  el: '#app',
  template: <App />,
  components: { App }
});
```

这里说一下我自己之前不清楚的一个知识点 **render函数**

```javascript
// 初始化new Vue的时候 也可以这样
new Vue({
   el: '#app',
   render: h => h(App)
});
```

开始的时候不明白render函数是干什么的 甚至不明白这个写法是什么意思。简单来说这个render函数是个高阶函数。 我们拆分一下

```javascript
render: h => h(App);

render: function(createElement){
    return createElement(App);
}
// 这样写看看打印什么
new Vue({
    el: '#app'
    render: h => {
        console.log(h(App));
        return h(App);
    }
});
```

打印h(App) 发现是一个VNode 虚拟DOM对象。里面有很多属性信息 tag classname等。其实Vue 是通过建立一个虚拟DOM 对真实DOM发生的变化保持追踪。createElement 这个函数我会在其他的readme 中详细说 暂不介绍。



#### No PostCSS config found in 报错

项目的webpack是3.0+ 版本的 所以需要对Postcss做处理

 

### 源码目录

* [render函数](https://github.com/facebook201/VueComponents/blob/master/Element-DOC/render%E5%87%BD%E6%95%B0.md)
* [Button组件]() 
* [radio组件]()

