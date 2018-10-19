<template>
  <label
    class="sy-radio"
    :class="[
      border && radioSize ? 'sy-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <!-- 这个就是模拟的圆形按钮 -->
    <span class="sy-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <!-- 这个是里面的白色圆圈 -->
      <span class="sy-radio__inner"></span>
      <!-- 这里的input就是真正的radio按钮 但是被隐藏了 -->
      <!-- 
        注意这边css隐藏input的写法 是通过opacity和absolute实现的。
        absolute是脱离文档流 不占据空间
        opacity 可以看不到前提下 还可以触发鼠标点击 这个很重要
      -->
      <input
        class="sy-radio__original"
        type="radio"
        :value="label"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span class="sy-radio__label" @keydown.stop>
      <slot></slot>
      <!-- 当radio组件有默认内容才显示template 起到一个占位作用 -->
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>

</template>

<script>
import Emitter from 'sy/src/mixins/emitter';

export default {
  name: 'sy-radio',
  
  mixins: [Emitter],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  componentsName: 'SyRadio',

  props: {
    // value就是 el-radio 的 v-model的值 
    // v-model 本身就是语法糖
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },

  data() {
    return {
      focus: false
    };
  },

  computed: {
    isGroup() {
      let parent = this.$parent;
      // 判断父组件是否是 单选按钮组
      while(parent) {
        if (parent.$options.componentsName !== 'SyRadioGropu') {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      // 不是组 model的值就是
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('SyRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      }
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    radioSize() {
      const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize;
    },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled || (this.elForm || {}).disabled
        : this.disabled || (this.elForm || {}).disabled;
    },
    tabIndex() {
      return !this.isDisabled ? (this.isGroup ? (this.model === this.label ? 0 : -1 ) : 0) : -1; 
    }
  },

  methods: {
    handleChange() {
      // 
      this.$nextTick(() => {
        // 改变值的时候向父组件传递model值 改变model值
        this.$emit('change', this.model);
        // 当使用组的时候 告诉父组件 值变化了 
        this.isGroup && this.dispatch('SyRadioGroup', 'handleChange', this.model);
      });
    }
  },
  mounted() {
    this.model = 11;
  }
};
</script>
