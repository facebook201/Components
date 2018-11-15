<template>
  <div id="app" ref="app">

    <!-- 上传进度条 -->
    <!-- <v-progress :percentage="23" type="circle">

    </v-progress> -->

    <!-- <div v-if="!pass && progress !== 0" class="upload-progress">
      <el-progress type="circle" :width="100" height="100" :percentage="progress" :status="propStatus"></el-progress>
    </div>

    <v-upload
      class="avatar-upload"
      :action="actionUrl"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :before-upload="beforeUploadFun">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </v-upload>
    
    <div class="picture-box">
      <ul>
        <li
          v-for="(item, index) in fileList"
          :key="index">
          <img :src="item.url" width="150" height="100">
        </li>
      </ul>
    </div> -->
    <list-item :todos="todos">
      <template slot-scope="scope">
        {{ scope.todo.name }}
      </template>
    </list-item>
  </div>
</template>

<script>
import VUpload from './packages/upload';
import VProgress from './packages/progress';
import ListItem from './example/list-item.vue';

export default {
  name: 'SyApp',
  components: {
    VUpload,
    VProgress,
    ListItem
  },
  data() {
    return {
      todos: [
        { id: 11, name: 'zhangsan' },
        { id: 12, name: 'lisi' }
      ],
      cell: '',
      actionUrl: 'http://jsonplaceholder.typicode.com/posts/',
      fileList: [],
      progress: 0, // 上传进度
      pass: null // 是否上传成功
    };
  },

  computed: {
    propStatus() {
      if (this.pass) {
        return 'success';
      } else if (this.pass == false) {
        return 'exception';
      } else  {
        return '';
      }
    }
  },

  methods: {
    beforeUploadFun(file) {
      return Promise.resolve('foo');
      const isJpeg = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpeg) {
        this.$message.error('上传图片只能是JPG格式！');
      }
      return isJpeg && isLt2M;
    },
    // 上传成功
    handleSuccess(res, file) {
      this.pass = true;
      this.fileList.push(file);      
    },
    handleProgress(e, file) {
      // 上传成功 onprogress 进度
      if (e && e.percent) {
        this.progress = Math.floor(e.percent);
        console.log(this.progress);
      }
    },
    handleChange(file) {
      if (file.status === 'ready') {
        this.pass = null;
        this.progress = 0;
      } else if (file.status === 'fail') {
        this.progress = 0;
        this.$message.error('图片上传失败');
      }
    }
  },

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

