<template>
  <div id="app">
    <button-test></button-test>
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
