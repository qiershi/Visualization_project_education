<template>
  <div class="chart-wrapper">
    <div class="capsule-title">快速答题(1-9s)占比</div>
    <dv-capsule-chart :config="capsuleConfig" style="width:100%;height:120px;" />
  </div>
</template>

<script>
export default {
  name: 'ShortTimeChart',
  props: {
    data: Array,
    basicStats: Object,
    compactMode: {
      type: Boolean,
      default: false
    }
  }, // 添加 basicStats 属性和 compactMode 属性
  computed: {
    capsuleConfig() {
      // 如果提供了 basicStats 数据，则使用其中的 total_1_9_percentage
      let shortTimePercent = 0;
      
      if (this.basicStats && this.basicStats.shortTimePercent) {
        shortTimePercent = parseFloat(parseFloat(this.basicStats.shortTimePercent).toFixed(1));
      } else {
        // 否则使用原来的逻辑计算
        let shortTimeCount = 0;
        let totalCount = 0;
        
        if (this.data && this.data.length > 0) {
          // 假设数据中包含秒数和计数
          this.data.forEach(item => {
            totalCount += item.count || 0;
            if (item.second <= 9) {
              shortTimeCount += item.count || 0;
            }
          });
        }
        
        shortTimePercent = totalCount > 0 ? parseFloat(((shortTimeCount / totalCount) * 100).toFixed(1)) : 0;
      }
      
      const regularPercent = parseFloat((100 - shortTimePercent).toFixed(1));

      // 根据 compactMode 决定配置
      const baseConfig = {
        data: [
          { name: `快速答题 ${shortTimePercent}%`, value: shortTimePercent },
          { name: `常规答题 ${regularPercent}%`, value: regularPercent }
        ],
        colors: ['#e062ae', '#37a2da'],
        // 设置最大值为100，以确保正确的刻度显示
        maxValue: 100,
        dataType: ['percent', 'percent'],
        unit: '%',
        // 配置数字显示样式
        digitalFlopStyle: { 
          fontSize: 16, 
          fontWeight: 'bold', 
          fill: '#fff' 
        },
        // 设置label在右侧显示百分比
        label: {
          show: true,
          position: 'right',
          formatter: '{value}%',
          style: { fill: '#fff', fontSize: 14, fontWeight: 'bold' }
        },
        // 设置tooltip显示
        showOriginValue: true
      };
      
      // 根据 compactMode 设置不同的柱子尺寸
      if (this.compactMode) {
        baseConfig.columnWidth = 40;
        baseConfig.columnGap = 10;
        baseConfig.axisLabel = {
          show: false
        };
        baseConfig.axisTick = {
          show: false
        };
        baseConfig.axisLine = {
          show: false
        };
      } else {
        baseConfig.columnWidth = 60;
        baseConfig.columnGap = 15;
      }
      
      return baseConfig;
    }
  },
  watch: {
    data: {
      handler(newVal) {
        if (newVal && newVal.length) this.renderChart();
      },
      deep: true
    },
    basicStats: {
      handler() {
        // 当 basicStats 更新时重新计算
      },
      deep: true
    }
  },
  methods: {
    renderChart() {
      // 由于使用了 dv-capsule-chart 组件，不需要手动渲染 ECharts
    }
  }
};
</script>

<style scoped>
.chart-wrapper { 
  padding: 20px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.capsule-title {
  text-align: center;
  color: #00eaff;
  font-size: 16px;
  margin-bottom: 15px;
}
</style>