<template>
  <div
    class="el-upload-dragger"
    :class="{
      'is-dragover': dragover
    }"
    @drop.prevent="onDrop"
    @dragleave.prevent="dragover = false"
    @dragover.prevent="onDragOver"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SUploadDrag',

  props: {
    disabled: Boolean
  },

  inject: {
    uploader: {
      default: ''
    }
  },

  data() {
    return {
      dragover: false
    };
  },

  methods: {
    onDragOver() {
      if (!this.disabled) {
        this.dragove = true;
      }
    },

    // 拖放到区域内触发事件
    onDrop(e) {
      if (this.disabled || !this.uploader) return;
      
      const accept = this.uploader.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit('file', e.dataTransfer.files);
        return;
      }
      this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
        const { type, name } = file;
        // .jpg 扩展后缀名
        const extension = name.indexOf('.') > -1
          ? ` .${name.split('.').pop() }`
          : '';
        const baseType = type.replace(/\.*$/, '');
        
        // 如果多个
        return accept.split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType;
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '');
            }
            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType;
            }
            return false;
          })
      }));

    }
  }
};
</script>
