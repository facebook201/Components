<script>
import Upload from './upload';
import ajax from './ajax';

function noop() {};

export default {
  name: 'SUpload',

  // 包括可以拖动的 图片墙
  components: {
    Upload
  },
  // 传递给子组件 下级组件
  provide() {
    return {
      uploader: this
    };
  },

  inject: {
    elForm: {
      default: ''
    }
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },

    data: Object,
    drag: Boolean, // 是否启用拖拽上传
    withCredentials: Boolean,
    // 是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: true
    },
    // 接收类型
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    // 上传之前的钩子
    beforeUpload: Function,
    // 删除之前的钩子
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    // 文件状态改变的钩子 添加文件 上传成功 上传失败都会调用
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function,
      default: noop
    },
    // 上传成功
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    // 已经上传的列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text picture picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },

  data() {
    return {
      // 要上传的图片队列
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },

  computed: {
    uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  methods: {
    // 开始上传
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      
      // 图片文件的相关信息 
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentag: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        console.log(err);
        return;
      }
      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },

    handleSuccess(res, rawFile) {
      // 这里面返回成功组件传进来的钩子函数
      const file = this.getFile(rawFile);
      this.onSuccess(res, file, this.uploadFiles);
    },

    handleProgress(ev, rawFile) {

    },

    handleError(e, rawFile) {

    },

    // 删除
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }

      let doRemove = () => {
        this.abort(file);
        let fileList = this.uploadFiles;
        // 移除最近添加的那个
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      };

      // 如果存在beforeRemove 钩子
      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },

    abort() {
      this.$refs['upload-inner'].abort(file);
    },

    getFile(rawFile) {
      // uploadFiles 里面包含的是所有上传成功的图片 
      // uid 的作用也是为了找到刚刚上传的那张 从所有图片里面找到
      let fileList = this.uploadFiles;
      let target;
      // 找到目标之后立即返回false
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null;
        // 如果找到就返回false
        return !target;
      });
      return target;
    }
  },

  render() {
    
    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.fileList,
        disabled: this.uploadDisabled,
        limit: this.limit,
        'on-start': this.handleStart,
        'on-success': this.handleSuccess,
        'on-progress': this.handleProgress,
        'on-error': this.handleError,
        'on-remove': this.handleRemove,
        autoUpload: this.autoUpload
      },
      ref: 'upload-inner'
    };

    const uploadComponent = <upload { ...uploadData } > { this.$slots.default } </upload>;

    return (
      <div>
        { this.listType === 'picture-card' ? uploadList : '' }
        { uploadComponent }
        { this.$slots.tip }
      </div>
    );
  }
};
</script>
