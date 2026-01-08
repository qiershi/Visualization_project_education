<template>
  <div class="difficulty-group">
    <div class="header-decoration">
      <dv-decoration-1 style="width:100px;height:50px;" />
      <span class="title">难度等级综合评估</span>
    </div>
    <div ref="groupRef" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'DifficultyGroupChart',
  props: ['data'],
  watch: {
    data: {
      handler() { this.renderChart(); },
      deep: true
    }
  },
  methods: {
    renderChart() {
      const chart = echarts.init(this.$refs.groupRef);
      const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['平均用时', '平均正确率'], textStyle: { color: '#ccc' } },
        xAxis: {
          type: 'category',
          data: this.data.map(item => item.难度等级),
          axisLabel: { color: '#83bff6' }
        },
        yAxis: [
          {
            type: 'value',
            name: '用时(s)',
            axisLabel: { color: '#83bff6' },
            splitLine: { show: false }
          },
          {
            type: 'value',
            name: '正确率',
            min: 0,
            max: 1,
            axisLabel: { formatter: v => (v * 100) + '%', color: '#ffdb5c' },
            splitLine: { lineStyle: { type: 'dashed', color: '#333' } }
          }
        ],
        series: [
          {
            name: '平均用时',
            type: 'bar',
            barWidth: '40%',
            itemStyle: { color: '#5470c6' },
            data: this.data.map(item => item.平均用时.toFixed(2))
          },
          {
            name: '平均正确率',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 10,
            lineStyle: { width: 4, color: '#ffdb5c' },
            itemStyle: { color: '#ffdb5c' },
            label: { show: true, formatter: p => (p.value * 100).toFixed(1) + '%' },
            data: this.data.map(item => item.平均正确率)
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.header-decoration { display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.title { color: #fff; font-size: 18px; font-weight: bold; margin-left: -20px; }
</style>
