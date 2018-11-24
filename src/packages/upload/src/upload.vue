<script>
import SUploadDragger from './upload-dragger';
import httpRequest from './ajax';

export default {
  name: 'upload',

  components: {
    SUploadDragger
  },
  
  props: {
    // 上传类型
    type: String,
    // 上传接口地址
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    // 上传带的额外参数
    data: Object,
    headers: Object,
    // cookies 凭证
    withCredentials: Boolean,
    multiple: Boolean, 
    accept: String,
    onStart: Function,
    // 上传进度
    onProgress: Function,
    // 上传失败
    onError: Function,
    // 成功
    onSuccess: Function,
    // 上传之前的操作
    beforeUpload: Function,
    // 是否启用拖动
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function() {}
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    // 文件队列
    fileList: Array,
    // 是否在选中文件之后立即上传
    autoUpload: Boolean,
    disabled: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: httpRequest
    },
    limit: Number,
    // 超出文件限制时的钩子
    onExceed: Function
  },

  data() {
    return {
      mouseover: false,
      // 保存返回的结果
      reqs: {}
    };
  },

  methods: {
    // 是否是图片格式
    isImage(str) {
      return str.indexOf('images') !== -1;
    },
    handleChange(e) {
      const files = e.target.files;
      if (!files) return;
      this.uploadFiles(files);
    },
    // 上传文件
    uploadFiles(files) {
      // 上传文件之前 限制参数个数
      if (this.limit && this.fileList.length + files.length > limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }
      let postFiles = [].slice.call(files);
      // 不支持多选
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      if (postFiles.length === 0) retun;
      // 开始一个个上传
      postFiles.forEach(rawFile => {
        // 开始上传
        this.onStart(rawFile);
        // autoUpload 表示自动上传默认 true
        if (this.autoUpload) this.upload(rawFile);
      });
    },

    // 开始上传
    upload(rawFile) {
      this.$refs.input.value = null;

      // 开始上传 上传之前的处理
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      const before = this.beforeUpload(rawFile);

      if (before && before.then) {

      } else if (before !== false) {
        // 如果满足钩子的条件 再上传
        this.post(rawFile);
      } else {
        // 否则就删除
        this.onRemove(null, rawFile);
      }

    },

    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    // 正式上传图片
    post(rawFile) {
      const { uid } = rawFile;

      const option = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        action: this.action,
        filename: this.name,
        file: rawFile,
        data: this.data, // 额外参数,
        onError: e => {
          this.onError(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
        },
        onProgress: e => {
          this.onProgress(e);
        }
      };

      const res = httpRequest(option);

      this.reqs[uid] = res;
      // res 返回可以是自己定义的promise之类的fetch请求
      if (res && res.then) {
        res.then(option.onSuccess, option.onError)
      }
    }
  },

  render(h) {
    let {
      handleChange,
      handleClick,
      name,
      multiple,
      drag,
      accept,
      disabled,
      uploadFiles,
      listType
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
      <div {...data} tabindex="0">
        {
          drag
            ? <s-upload-dragger disabled={disabled} on-file={uploadFiles}> { this.$slots.default } </s-upload-dragger>
            : this.$slots.default
        }
        <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input> 
      </div>
    );
  }
};
</script>
