<template>
  <div class="weekly-container">
    <div ref="weekRef" style="width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'WeeklyProgressChart',
  props: ['data'],
  watch: {
    data: {
      handler() { this.renderChart(); },
      deep: true
    }
  },
  methods: {
    renderChart() {
      const chart = echarts.init(this.$refs.weekRef);
      const option = {
        title: { text: '周度学情演变轨迹', left: 'center', textStyle: { color: '#fff' } },
        tooltip: { trigger: 'axis' },
        legend: { data: ['正确率', '平均用时'], top: '10%', textStyle: { color: '#ccc' } },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.map(item => item.week),
          axisLabel: { color: '#83bff6' }
        },
        yAxis: [
          {
            type: 'value',
            name: '正确率(%)',
            min: 15,
            axisLabel: { color: '#83bff6', formatter: '{value}%' },
            splitLine: { lineStyle: { color: '#333' } }
          },
          {
            type: 'value',
            name: '用时(s)',
            position: 'right',
            axisLabel: { color: '#ff9f7f' },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '正确率',
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(131, 191, 246, 0.5)' },
                { offset: 1, color: 'rgba(131, 191, 246, 0)' }
              ])
            },
            data: this.data.map(item => item.accuracy)
          },
          {
            name: '平均用时',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            lineStyle: { color: '#ff9f7f', width: 3 },
            data: this.data.map(item => item.avgTime)
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>
