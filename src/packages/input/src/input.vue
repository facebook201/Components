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
        <slot name="prefix"><slot>
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
import Migrating from 'sy/src/mixins/migrating';
import merge from 'sy/src/utils/merge';
import { isKorean } from 'sy/src/utils/shared';

export default {

};
</script>

