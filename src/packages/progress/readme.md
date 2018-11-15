#### Attributes



| 参数         | 说明                                        | 类型    | 可选值            | 默认值 |
| ------------ | ------------------------------------------- | ------- | ----------------- | ------ |
| percentage   | 百分比（必填）                              | number  | 0-100             | 0      |
| type         | 进度条类型                                  | string  | inline circle     | line   |
| stroke-width | 进度条的宽度 px                             | number  |                   | 6      |
| text-inside  | 进度条显示文字内置在进度条内 只在line时可用 | boolean |                   | false  |
| status       | 进度条当前状态                              | string  | success/exception |        |
| color        | 进度条背景色 覆盖status颜色                 | string  |                   |        |
| width        | 环形进度条画布宽度 circle                   | number  |                   | 126    |
| show-text    | 是否显示进度条文字内容                      | boolean |                   | True   |



```vue
<template>
  <v-progress        
	type="circle"
    color="color"
    status="success">
  </v-progress>
</template>
```





#### 个人实现的思路

分两种类型的进度条 一种是线形进度条 另一种是圆形进度条。



* 首先 线条和圆形通过 接收type判断显示 是哪种 默认是line。
* 进度颜色是默认的颜色 可以通过status状态来改变 也可以自己设置颜色 优先级高于 status
* 状态后置显示 进度数默认显示在后面 可设置进度条百分比内显
* progress组件可更改进度条的高度





#### 圆形svg

```vue
<template>
  <div v-if="type ==='circle'">
     <svg viewBox="0, 0, 100, 100">
         <path :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
         
     </svg>
  </div>
</template>
```



* svg 通过属性viewBox 绘制区域。由空格逗号分隔4个值。 (min x, min y, width, height);

* path 元素定义一个路径。

  * stroke属性定义一条线，文本或元素轮廓颜色：
  * stroke-width 定义文本或元素轮廓厚度
  *  fill 属性定义矩形的填充颜色
  * strokelinecap属性定义不同类型的开放路径的终结 圆角边 是 round
  * stroke-dasharray属性用来设置描边的点划线的图案范式。就是设置实线和虚线的宽度

* 

* 









