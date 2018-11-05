<template>
  <div id="app" ref="app">

    <v-upload
      :action="actionUrl">
      <el-button type="primary">上传图片</el-button>
    </v-upload>

  </div>
</template>

<script>
import VUpload from './packages/upload';

export default {
  name: 'SyApp',
  components: {
    VUpload
  },
  data() {
    return {
      cell: '',
      actionUrl: 'http://jsonplaceholder.typicode.com/posts/'
    };
  },
  methods: {

  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>

