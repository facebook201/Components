### Element-ui 组件的 input组件



> $attrs 和 inheritAttrs



**$attrs**

![border](https://github.com/facebook201/VueComponents/blob/master/img/attrs.png)



**包含了符作用域中不作为prop被识别的特性（class 和 style 除）  v-bind="$attrs"** 传入内部组件 在创建高级别的组件时非常有用

在饿了么组件 input里面有应用到。



**inheritAttrs**

![border](https://github.com/facebook201/VueComponents/blob/master/img/inheriattrs.png)



这个选项是避免从父组件全部继承 属性过来。

```javascript
Vue.component('sy-input', {
   data() {
   },
   template: `
     <div class="sy-input__box">
		<input type="text" v-bind="$attrs">
     </div>
   ` 
});
// 应用
<sy-input class="middle-input" minlength="10"></sy-input>

// 如果没有加 inheritAttrs 就会继承所有父组件的属性到子组件上 渲染如下
// 会从 $attrs 的html元素一直向上 如果设置选项 false 就会把默认行为去掉 通过实例属性 $attrs 显示绑定到非根元素上
<div class="sy-input__box" minlength="10">
	<input type="text" minlength="10" >
</div>

```



**设置选项 false 就会把默认行为去掉 通过实例属性 $attrs 显示绑定到非根元素上**