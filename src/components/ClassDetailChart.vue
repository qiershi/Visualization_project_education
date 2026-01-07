<template>
  <div class="detail-container">
    <div ref="compareRef" style="width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ClassDetailChart',
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
      const chart = echarts.init(this.$refs.compareRef);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['平均得分', '正确率 (%)'],
          textStyle: { color: '#fff' },
          top: '5%'
        },
        grid: { left: '3%', right: '4%', bottom: '5%', containLabel: true },
        xAxis: [{
          type: 'category',
          data: this.data.map(item => item.class),
          axisLabel: { color: '#83bff6', rotate: 45 }
        }],
        yAxis: [
          {
            type: 'value',
            name: '得分',
            min: 0,
            max: 1.5, // 根据数据范围调整
            axisLabel: { color: '#83bff6' },
            splitLine: { lineStyle: { color: '#333' } }
          },
          {
            type: 'value',
            name: '正确率',
            min: 0,
            max: 50,
            axisLabel: { formatter: '{value}%', color: '#ff9f7f' },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '平均得分',
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 1, color: '#188df0' }
              ])
            },
            data: this.data.map(item => item.平均得分)
          },
          {
            name: '正确率 (%)',
            type: 'line',
            yAxisIndex: 1, // 使用右侧 Y 轴
            smooth: true,
            lineStyle: { color: '#ff9f7f', width: 3 },
            itemStyle: { color: '#ff9f7f' },
            data: this.data.map(item => (item.平均正确率 * 100).toFixed(1))
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>
