<template>
  <div id="app">
    {{name}}
    <Test>
      <div>我是默认slot</div>
    </Test>
  </div>
</template>

<script>
import Test from './Test.js';

export default {
  name: 'SyApp',
  components: {
    Test
  },
  data() {
    return {
      name: 'ss',
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
