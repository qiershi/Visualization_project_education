<template>
  <div class="parallel-container">
    <div ref="parallelRef" style="width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'QuestionParallelChart',
  props: ['data'],
  data() {
    return {
      chart: null
    };
  },
  watch: {
    data: {
      handler(newVal) {
        if (newVal && newVal.bubbleData) this.renderChart();
      },
      deep: true
    }
  },
  mounted() {
    if (this.data && this.data.bubbleData) this.renderChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chart) this.chart.dispose();
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    renderChart() {
      if (!this.$refs.parallelRef) return;
      if (this.chart) this.chart.dispose();

      this.chart = echarts.init(this.$refs.parallelRef);

      // 数据格式: [平均用时, 正确率, 答题次数, 题目ID]
      const rawData = this.data.bubbleData;

      const option = {
        title: {
          text: '题目效能多维平行坐标',
          left: 'center',
          textStyle: { color: '#83bff6', fontSize: 16 }
        },
        parallelAxis: [
          { 
            dim: 0, 
            name: '平均用时(s)', 
            nameTextStyle: { color: '#83bff6' },
            axisLabel: { color: '#fff' },
            splitLine: { show: false }
          },
          { 
            dim: 1, 
            name: '正确率(%)', 
            nameTextStyle: { color: '#83bff6' },
            axisLabel: { color: '#fff' },
            splitLine: { show: false }
          },
          { 
            dim: 2, 
            name: '答题总量', 
            nameTextStyle: { color: '#83bff6' },
            axisLabel: { color: '#fff' },
            splitLine: { show: false }
          }
        ],
        parallel: {
          left: '10%',
          right: '15%',
          bottom: '15%',
          top: '20%',
          parallelAxisDefault: {
            type: 'value',
            nameLocation: 'end',
            nameGap: 20,
            splitLine: { show: false },
            axisLine: { lineStyle: { color: 'rgba(0, 234, 255, 0.5)' } },
            axisTick: { lineStyle: { color: 'rgba(0, 234, 255, 0.5)' } },
            axisLabel: { color: '#fff' }
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 100,
          dimension: 1, // 以正确率为映射标准
          orient: 'horizontal',
          left: 'center',
          bottom: 0,
          itemWidth: 10,
          text: ['高正确率', '低正确率'],
          textStyle: { color: '#83bff6' },
          inRange: {
            color: ['#fb7293', '#fac858', '#91cc75']
          }
        },
        series: {
          type: 'parallel',
          lineStyle: {
            width: 2,
            opacity: 0.4
          },
          inactiveOpacity: 0.05,
          activeOpacity: 1,
          data: rawData.map(d => [d[0], d[1], d[2]])
        }
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.parallel-container {
  width: 100%;
  height: 100%;
}
</style>
