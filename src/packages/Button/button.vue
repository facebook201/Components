<template>
  <button
    class="sy-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'sy-button-' + type : '',
      {
        'is-disabled': buttonDisabled,
        'is-plain': plain,
        'is-loading': loading
      }
    ]"
    >
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'SyButton',
  inject: {
    elForm: {
      default: ''
    }
  },
  props: {
    nativeType: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    size: String,
    autofocus: Boolean,
    loading: Boolean,
    plain: Boolean,
    disabled: Boolean
  },
  computed: {
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  data() {
    return {

    };
  },
  methods: {
    handleClick(ev) {
      this.$emit('click', ev);
    }
  }
};
</script>


