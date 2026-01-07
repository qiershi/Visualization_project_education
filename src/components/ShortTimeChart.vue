<template>
  <div class="chart-wrapper">
    <div ref="shortTimeRef" style="width: 100%; height: 250px;"></div>
    <dv-decoration-6 style="width:300px;height:30px;margin: 0 auto;" />
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ShortTimeChart',
  props: ['data'],
  watch: {
    data: {
      handler(newVal) {
        if (newVal && newVal.length) this.renderChart();
      },
      deep: true
    }
  },
  methods: {
    renderChart() {
      const chart = echarts.init(this.$refs.shortTimeRef);
      const option = {
        title: {
          text: '1-9秒快速答题趋势 (秒)',
          left: 'center',
          textStyle: { color: '#fff', fontSize: 14 }
        },
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.map(item => item.second + 's'),
          axisLabel: { color: '#83bff6' }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#83bff6' },
          splitLine: { lineStyle: { color: '#222' } }
        },
        series: [{
          name: '答题次数',
          type: 'line',
          smooth: true, // 曲线平滑
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#00f2ff' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 242, 255, 0.5)' },
              { offset: 1, color: 'rgba(0, 242, 255, 0)' }
            ])
          },
          data: this.data.map(item => item.count)
        }]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart-wrapper { padding: 20px; }
</style>
