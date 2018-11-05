<script>
import ajax from './ajax';

function noop() {}

export default {
  name: 'Upload',

  inject: ['uploader'],

  props: {
    type: String,
    // 上传地址
    action: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    OnError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: noop
    },
    onRemove: {
      type: Function,
      default: noop
    },
    fileList: Array,
    autoUpload: Boolean,
    // 上传类型 
    listType: String,
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function
  },

  data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },

  methods: {
    isImage(str) {
      return str.indexOf('image') > -1;
    },

    // 触发change事件
    handleChange(eve) {
      const files = eve.target.files;
      
      if (!files) return;
      this.uploadFile(files);
    },

    uploadFile(files) {
      // 上传数量限制 limit onExceed 限制的钩子函数
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }

      // 转数组
      let postFiles = Array.prototype.slice.call(files);
      // 浅拷贝一份
      if (!this.multiple){ postFiles = postFiles.slice(0, 1) }
      if (postFiles.length === 0) { return; }
      console.log(postFiles);

      postFiles.forEach(rawFile => {
        // 开始上传事件
        this.onStart(rawFile);
        if (this.autoUpload) this.upload(rawFile);
      });
    },

    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    }
  },

  render(h) {
    let {
      handleClick,
      listType,
      handleChange
    } = this;


    const data = {
      class: {
        'el-upload': true,
      },
      on: {
        click: handleClick
      }
    };
    
	  data.class[`el-upload--${listType}`] = true;

    return (
    	<div {...data} tabindex="0" >
        {
          this.$slots.default
        }
      	<input ref="input" name={name} type="file" class="el-upload__input" on-change={handleChange}></input>
      </div>
    );
  }
};
</script>

<style lang="stylus" scoped>
.el-upload__input
  display none 
.el-upload
  display inline-block
</style>


