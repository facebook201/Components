### Radio

原生的radio。单选按钮添加了checked属性， 表示被选中 value属性表示单选按钮的值。获取checked属性为true的那一项 然后再获取其value。但是同一时刻只能有一个被选中 name属性就是这个作用 **通过把一些单选按钮的name设置为同一个值 就达到了互斥的效果**

 但是Vue的单选框没有name属性 只是v-model就可以达到互斥效果。**v-model的本质上对input的value进行input事件监听 如果修改了value值就改变v-model绑定的值** 

```javascript
    function genRadioModel(
        el,
        value,
        modifiers
    ) {
        var number = modifiers && modifiers.number;
        var valueBinding = getBindingAttr(el, 'value') || 'null';
        valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
        addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
        addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
    }
```

genRadioModel 里面的**value值就是v-model的值。而valueBinding的值是input的value值** 得到两者的值之后 addProp方法会把两者的比较结果是真还是假添加到input的checked上。其他checked 值不一样 所以就达到了互斥的效果。

> _n 方法是一个比较两个值的过程。它会判断两个是否都是对象 那么会通过JSON.stringify转成字符串比较。否则直接string() 比较两个值是否相同 如果值相同就加一个checked属性 表示单选被选中