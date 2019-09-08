<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'SyApp',

  data() {
    return {
      imgUrl: ''
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

.avatar-uploader .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden

.avatar-uploader .avatar 
  display block
  width 150px
  height 150px


.avatar-uploader-icon
  height 148px
  line-height 148px
  width 148px
  font-size 28px
  color #80939d


</style>

