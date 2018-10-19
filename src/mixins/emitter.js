/**
 * 混入选项 混入是一种分发Vue组件中可复用功能的非常灵活的方式。
 * 混入的methods 将会和组件原本的methods合并 优先保留组件的methods
 *
 */


function boradcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      boradcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {

/** 实现向最近的特定父级组件发送事件的逻辑 不断取自己的父组件 判断是否是目标组件
 * @param{ componentName } 父组件的名称
 * @param{ eventName } 事件名称
 * @param { params } 事件参数 一个数组或者单独的值 
 */

    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while(parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 如果是目标组件 就在父组件上调用 $emit 触发事件
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    boradcast(componentName, eventName, params) {
      boradcast.call(this, componentName, eventName, params);
    }
  }
};
