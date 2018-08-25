<template>
  <div class="button-test">
    <!-- 基础按钮 -->
    <div class="basic-button">
      <sy-button>
        默认按钮
      </sy-button>
      <sy-button type="primary">
        主要按钮
      </sy-button>
      <sy-button type="success">
        成功按钮
      </sy-button>
      <sy-button type="info">
        信息按钮
      </sy-button>
      <sy-button type="warning">
        警告按钮
      </sy-button>
      <sy-button type="danger" icon="el-icon-search">
        危险按钮  
      </sy-button>

      <sy-button type="primary" :disabled="true">
        禁用按钮
      </sy-button>
    </div>
    <!-- 按钮组 -->
    <div class="button-group">
      <sy-button-group>
        <sy-button type="primary">
          按钮A
        </sy-button>
        <sy-button type="primary">
          按钮B
        </sy-button>
        <sy-button type="primary">
          按钮C
        </sy-button>
      </sy-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonTest'  
};
</script>

<style lang="stylus" scoped>

</style>
