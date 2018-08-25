### Button组件

button组件应该是饿了么里面非常简单的组件。就一个事件的响应以及样式的编写。但是里面也有很多小知识点。

```html
<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },
    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
```



> button 元素要始终为其指定type类型。不同的浏览器对不同的type属性使用不同的默认值 button submit reset 三种

还有button的样式 -webkit-appearence: none 去掉原生样式。line-height 1 行高和字体大小一样。 然后padding来撑开

禁用disabled功能 两部分 一是button的disabled 二是样式 cursor not-alowed

`:autofocus="autofocus`这句话，如果为true表示按钮自动获得焦点，按钮获得焦点就是按钮为focus的状态，可以用于提示用户

对button样式的写法混合了数组 对象、

最后是是`<span>`这个标签当且仅当`<el-button>`中有内容时才存在，内容放在slot插槽中，**用$slots.default来判断是否有子元素存在**



#### buttonGroup 按钮组

![border](https://user-gold-cdn.xitu.io/2018/8/17/165471ce14c2a3cb?imageView2)

按钮组就是多个按钮在一起。源码也简单直接用 div包起来 里面一个插槽。中单是在于中间部分的白线怎么实现的 是通过css伪类`:last-child`和`:first-child`和`:not`，`:first-child` 选择器用于选取**属于其父元素的首个子元素的指定选择器** 看一下scss的源码

```scss
@each $type in (primary, success, warning, danger, info) {
    .el-button--#{$type} {
      &:first-child {
        border-right-color: rgba($--color-white, 0.5);
      }
      &:last-child {
        border-left-color: rgba($--color-white, 0.5);
      }
      &:not(:first-child):not(:last-child) {
        border-left-color: rgba($--color-white, 0.5);
        border-right-color: rgba($--color-white, 0.5);
      }
    }
  }
```