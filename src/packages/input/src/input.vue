<template>
  <div
    :class="[
      type === 'textarea' ? 'sy-textarea' : 'sy-input',
      {
        'is-disabled': inputDisabled,
        'sy-input-group': $slots.prepend || $slots.append,
        'sy-input-group--append': $slots.append,
        'sy-input-group-prepend': $slots.prepend,
        'sy-input-prefix': $slots.prefix || prefixIcon,
        'sy-input--suffix': $slots.suffix || suffixIcon || clearable
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    >

    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="sy-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$attrs"
        :type="type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
        >

      <!-- 前置内容 icon -->
      <span class="sy-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="sy-input__icon"
          v-if="prefixIcon"
          :class="prefixIcon">
        </i>
      </span>

      <!-- 后置内容 icon -->
      <span class="sy-input__suffix" 
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
        <span class="sy-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="sy-input__icon"
              v-if="suffxIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-else
            class="sy-input_icon el-icon-circle-close el-input-clear"
            @click="clear">
          </i>
        </span>
        <i class="sy-input__icon" 
          v-if="validateState"
          :class="['sy-input__validateIcon', validateIcon]">
        </i>
      </span>

      <!-- 后置元素 -->
      <div class="sy-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>

    </template>
  </div>
</template>

<script>
import emitter from 'sy/src/mixins/emitter';
// import Migrating from 'sy/src/mixins/migrating';
// import merge from 'sy/src/utils/merge';

export default {
  name: 'SyInput',
  
  componentName: 'SyInput',

  mixins: [emitter],

  inheritAttrs: false,

  data() {
    return {
      currentValue: this.value == null
        ? ''
        : this.value,
      hovering: false,
      focused: false,
      isOnComposition: false,
      valueBeforeComposition: null
    };
  },

  props: {
    value: [String, Number],
    tabindex: String,
    readonly: Boolean,
    clearable: {
      type: Boolean,
      default: false
    },
    label: String,
    suffixIcon: String,
    prefixIcon: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    // 输入框
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },

    showClear() {
      // 显示删除 满足下面的条件
      return this.clearable &&
        !this.disabled &&
        !this.readonly &&
        this.currentValue !== '' &&
        (this.focused || this.hovering);
    }
  },

  watch: {
    value(val, olaValue) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    focus() {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    blur() {
      (this.$refs.input || this.$refs.textarea).blur();
    },
    // 触发input事件
    handleInput(event) {
      const value = event.target.value;
      this.setCurrentValue(value);
      this.$emit('input', value);
    },
    setCurrentValue(value) {
      // 这里的逻辑比较多 主要是通过元素的
      this.currentValue = value;
    },
    // 触发hange事件
    handleChange(event) {
      this.$emit('change', event.target.value);
    }
  }
};
</script>

