<template>
  <div>
    <label class="middle-label">
      <input 
        type="text"
        v-bind="$attrs"
        :value="currentValue"
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'middleware',
  // inheritAttrs: false,
  props: {
    disabled: Boolean,
    value: [String, Number]
  },
  data() {
    return {
      name: 's',
      currentValue: this.value == null
        ? ''
        : this.value
    };
  },
  mounted() {
    console.log(this);
  }
};
</script>
