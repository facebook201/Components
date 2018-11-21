<template>
  <div id="app" ref="app">

    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions">
    </vue-dropzone>
    
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'SyApp',
  
  components: {
    vueDropzone :vue2Dropzone
  },

  data() {
    return {
      dropzoneOptions: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        thumbnaiWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'Header value' }
      }
    };
  }
}
</script>

<style lang="stylus">

.upload-progress
  display inline-block
  height 180px
  width 180px
  margin-right 50px

.avatar-uploader-icon 
  width 178px
  height 178px
  line-height 178px
  font-size 28px
  color #8c939d
  text-align center

.avatar-upload .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
</style>

