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







