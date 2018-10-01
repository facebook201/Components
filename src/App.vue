<template>
  <div id="app">
    <my-com :level="1">
      
    </my-com>
    {{name}}
  </div>
</template>

<script>
import ButtonTest from '@/example/componentsTest/ButtonTest';

export default {
  name: 'SyApp',
  components: {
    ButtonTest
  },
  data() {
    return {
      name: 'ss'
    }
  },
  created() {
  },
  watch: {
    name(val, newVal) {
      console.log(val, newVal);
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
