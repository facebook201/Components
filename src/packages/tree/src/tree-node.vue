<template>
  <div
    class="el-tree-node"
    @click.stop="handleClick"
    @contextmenu="($enevt) => this.handleContextMenu($event)"
    v-show="node.visible"
    :class="{
      'is-expanded': expanded,
      'is-current': tree.store.currentNode === node,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drag.stop="handleDrop"
    ref="node"
  >

    <div class="el-tree-node__content"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
      <span
        class="el-tree-node__expand-icon el-icon-caret-right"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf' : node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>

      <!-- 这里表示可选择的层级的树型 -->
      <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange">
      </el-checkbox>
      
      <span 
        v-if="node.loading"
        class="el-tree-node__loading-icon el-icon-loading">
      </span>
      <node-content :node="node"></node-content>
    </div>

    <el-collapse-transition>
      <div
        class="el-tree-node__children"
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded">

        <el-tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :render-after-expend="renderAfterExpand"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </el-tree-node>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
import ElCollapseTransition from 'sy/src/transitions/collapse-transition';
import ElCheckbox from 'sy/src/packages/checkbox';
import emitter from 'sy/src/mixins/emitter';
import { getNodeKey } from './util';

export default {
  name: 'ElTreeNode',

  componentName: 'ELTreeNode',

  mixins: [emitter],
  
  props: {
    
  }
};
</script>
