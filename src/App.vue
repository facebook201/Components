<template>
  <div id="app" ref="app">
    <!-- <div class="mix-input">
      <el-input placeholder="请输入内容" v-model="mixInput">
        <template slot="prepend">http://</template>
        <template slot="append">.com</template>
      </el-input>
    </div>     -->
    <middle-ware minlength="23"></middle-ware>

  </div>
</template>

<script>
import MiddleWare from './middleware.vue';

export default {
  name: 'SyApp',
  components: {
    MiddleWare
  },
  data() {
    return {
      name: 'ss',
      ss: '张三',
      mixInput: '混合'
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
