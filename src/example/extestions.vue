<script>
export default {
  name: 'Extestions',

  props: {
    onSuccess: Function
  },

  data() {
    return {
      filelist: []
    };
  },

  methods: {
    handleSuccess(res, file) {
      // 上传成功的钩子
      this.onSuccess(res, file, this.uploadList);
    }
  },

  render() {
    const data = {
      props: {
        'on-success': this.handleSuccess
      },
      ref: 'upload'
    };
    const uploadComponent = <upload {...data}></upload>;

    return (
      <div class="el-extestions">
        {
          uploadComponent
        }
      </div>
    );
  }

};
</script>
