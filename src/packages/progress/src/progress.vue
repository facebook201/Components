<template>
  <div
    class="el-progress"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside
      }
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
    >

    <div class="el-progress-bar" v-if="type === 'line'">
      <div class="el-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        <div class="el-progress-bar__inner" :style="barStyle">
          <!-- 是否在内部显示百分比进度 -->
          <div class="el-progress-bar__innerText" v-if="textInside">{{percentage}}%</div>
        </div>
      </div>
    </div>

    <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0, 0, 100, 100">
        <path class="el-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="el-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"> </path>
      </svg>
    </div>

    <!-- 默认的进度显示 在进度条后面 -->
    <div
      class="el-progress__text"
      v-if="!textInside">
      <!-- 这里有status 所以line如果success会显示 icon后缀 -->
      <template v-if="!status">{{percentage}}%</template>
      <i v-else :class="iconClass"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'v-progress',

  props: {
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'circle'].indexOf(val) > -1 // 对props进行效验
    },
    percentage: {
      type: Number,
      default: 0,
      required: true, // 必传
      validator: val => val >= 0 && val <= 100
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    status: {
      type: String
    },
    // 是否现在是line内部百分比 line可用
    textInside: {
      type: Boolean,
      default: false
    },
    // 默认width
    width: {
      type: Number,
      default: 126
    },
    color: {
      type: String,
      default: ''
    },
    showText: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    barStyle() {
      const style = {};
      style.width = this.percentage + '%';
      style.backgroundColor = this.color;
      return style;
    },

    relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1);
    },

    // 轨道路劲
    trackPath() {
      // 圆形中间的位置
      const raduis = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
      return `M 50 50 m 0 -${raduis} a ${raduis} ${raduis} 0 1 1 0 ${raduis * 2} a ${raduis} ${raduis} 0 1 1 0 -${raduis * 2}`;
    },

    perimeter() {
      const raduis = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * raduis;
    },

    circlePathStyle() {
      const perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s eaee 0s, stroke 0.6s ease'
      };
    },

    stroke() {
      let ret;
      if (this.color) {
        ret = this.color;
      } else {
        switch (this.status) {
          case 'success':
            ret = '#13ce66';
            break;
          case 'exception':
            ret = '#ff4949';
            break;
          default:
            ret = '#20a0ff';
        }
      }
      return ret;
    },

    iconClass() {
      // type类型不同
      if (this.tyle === 'line') {
        return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-close';
      } else {
        return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
