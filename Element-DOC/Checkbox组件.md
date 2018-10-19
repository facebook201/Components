### checkbox



checkbox 组件跟 radio 布局差不多。 主要介绍选中效果的实现。



```stylus
.el-checkbox__inner
	&::after
		position absolute
        content ''
        border 1px solid #fff
        /* 主要在下面几行 */
		border-top 0 // 上面去掉
        border-left 0 // 下面去掉
        height 7px // 通过右边和下面旋转得到对勾
        left 4px 
        top 1px
        width 3px
        transform rotate(45deg) scaleY(0)
        transform-origin center
        transition transform .15s ease-in .05s
        
 // 通过scaleY(0 1) 的转换 来实现放大效果       
.el-checkbox.is-checked
	.el-checkbox__inner
		&::after
    		tansform rotate(45deg) scaleY(1)
```



#### Vue复选框的原理

![border]()

单个复选框使用bool值 多个使用数组。看一下Vue的源码部分 是怎么处理复选框的。

**复选框的代码是什么时候执行的 很苦恼**

```javascript
// value 就是v-model的值

function genCheckboxModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
) {
  const number = modifiers && modifiers.number
  const valueBinding = getBindingAttr(el, 'value') || 'null'
  const trueValueBinding = getBindingAttr(el, 'true-value') || 'true'
  const falseValueBinding = getBindingAttr(el, 'false-value') || 'false'
  
  // 添加checked属性 如果是false 表示未选中 如果是true 就表示选中
  addProp(el, 'checked',
    `Array.isArray(${value})` +
    `?_i(${value},${valueBinding})>-1` + (
      trueValueBinding === 'true'
        ? `:(${value})`
        : `:_q(${value},${trueValueBinding})`
    )
  )
  
   // vue 给复选框添加了change事件 处理数组的值 
  // 如果 值是数组 如果没有选中 就去掉它 这里是使用的是slice 后 合并concat。 splice 会改变原始数组
  addHandler(el, 'change',
    `var $$a=${value},` +
        '$$el=$event.target,' +
        `$$c=$$el.checked?(${trueValueBinding}):(${falseValueBinding});` +
    'if(Array.isArray($$a)){' +
      `var $$v=${number ? '_n(' + valueBinding + ')' : valueBinding},` +
          '$$i=_i($$a,$$v);' +
      `if($$el.checked){$$i<0&&(${genAssignmentCode(value, '$$a.concat([$$v])')})}` +
      `else{$$i>-1&&(${genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')})}` +
    `}else{${genAssignmentCode(value, '$$c')}}`,
    null, true
  )
}

// 添加属性值
function addProp (el, name, value) {
   // 给props属性 添加对象
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

```



```javascript
      isChecked() {
        // 是否选中 如果是boolean值 返回当前值即可
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          // 如果是数组 查看label是否在 model数组里
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },
```









