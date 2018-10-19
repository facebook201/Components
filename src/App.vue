<template>
  <div id="app">
    <sy-checkbox v-model="radio" label="1">1</sy-checkbox>
    <sy-checkbox v-model="radio1" label="2">2</sy-checkbox>
  </div>
</template>

<script>

export default {
  name: 'SyApp',
  data() {
    return {
      name: 'ss',
      ss: '张三',
      radio: false,
      radio1: true
    }
  },
  methods: {
    changeVal(val) {
      console.log(val);
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
