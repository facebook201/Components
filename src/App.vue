<template>
  <div id="app" ref="app">
    <!-- 上传图片组件 -->

    <!-- <s-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts"
      :before-upload="beforeUploadAvatar"
      :on-success="handleAvatarSuccess"
      >
      <img :src="imgUrl" v-if="imgUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </s-upload> -->

    <s-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts"
      :before-upload="beforeUploadAvatar"
      :on-success="handleAvatarSuccess"
      drag
      accept="image/jpeg"
      multiple
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处上传</div> 
    </s-upload>

  </div>
</template>

<script>
import SUpload from './packages/upload';

export default {
  name: 'SyApp',

  components: {
    SUpload
  },

  data() {
    return {
      imgUrl: ''
    };
  },

  created() {
    this.imgType = ['jpeg', 'png', 'gif'];
  },

  methods: {
    beforeUploadAvatar(file) {
      const isJPG = file.type === 'image/jpeg';

      if (!isJPG) {
        this.$message.error('头像只能是JPG格式!')
      }

      return isJPG;
    },

    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw));
      this.imgUrl = URL.createObjectURL(file.raw);
    }
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

