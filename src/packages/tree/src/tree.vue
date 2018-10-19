<template>
  <div
    class="sy-tree"
    :class="{
      'sy-tree-highlight-current': highlightCurrent,
      'is-dragging': !!dragState.raggingNode,
      'is-drop-not-allow': !dragState.allowDrop,
      'is-drop-inner': dragState.dropType === 'inner'
    }"
    role="tree"
  >

    <el-tree-node
      v-for="child in root.childNodes"
      :key="getNodeKey(child)"
      :node="child"
      :props="props"
      :render-after-expand="renderAfterExpand"
      :render-content="renderContent"
      @node-expand="handleNodeExpand">
    </el-tree-node> 

    <div class="el-tree__empty-block" v-if="isEmpty">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>

    <div
      v-show="dragState.showDropIndicator"
      class="el-tree__drop-indicator"
      ref="dropIndicator">
    </div>

  </div>
</template>

<script>
  import TreeStore from './tree-store';
  import { getNodeKey, findNearestComponent } from './util';
  import ElTreeNode from './tree-node.vue';
  import { t } from 'sy/src/locale';
  import emitter from 'sy/src/mixins/emitter';
  import { addClass, removeClass } from 'sy/src/utils/dom';


  export default {
    
  };
</script>

