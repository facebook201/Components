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
    onError: Function,
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
    autoUpload: {
      type: Boolean,
      default: true
    },
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

      postFiles.forEach(rawFile => {
        // 开始上传事件
        this.onStart(rawFile);
        // autoUpload 默认自动上传 也可手动上传 等到选取到文件之后 统一手动上传
        if (this.autoUpload) this.upload(rawFile);
      });
    },

    abort(file) {
      const { reqs } = this;
    },

    // 上传
    upload(rawFile) {
      this.$refs.input.value = null;
      // 如果不存在 上传之前的钩子
      // 参数为上传的文件 若返回false 或返回promise且被reject 停止上传
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        // 如果返回一个promise 且是reslove
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);
          
          if (fileType === ['object File'] || fileType === ['object Blob']) {
            if (fileType === ['object Blob']) {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }

            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(rnull, awFile);
      }
    },

    // post 开始准备上传
    post(rawFile) {
      const { uid } = rawFile;

      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };

      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
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

