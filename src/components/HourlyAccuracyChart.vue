<template>
  <div class="accuracy-container">
    <dv-decoration-3 style="width:250px;height:30px;margin: 0 auto;" />
    <div ref="accuracyRef" style="width: 100%; height: 280px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HourlyAccuracyChart',
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
      const chart = echarts.init(this.$refs.accuracyRef);
      const option = {
        title: {
          text: '24小时答题正确率波动',
          left: 'center',
          textStyle: { color: '#fff', fontSize: 14 }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}点: {c}%'
        },
        xAxis: {
          type: 'category',
          data: this.data.map(item => item.hour),
          axisLabel: { color: '#83bff6' }
        },
        yAxis: {
          type: 'value',
          min: 20, // 根据你的数据分布，设置20为底更利于观察波动
          max: 30,
          axisLabel: { formatter: '{value}%', color: '#83bff6' },
          splitLine: { lineStyle: { color: '#333', type: 'dashed' } }
        },
        series: [{
          data: this.data.map(item => item.accuracy),
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#ffdb5c' },
          lineStyle: { width: 4, color: '#ffdb5c' },
          // 标记最高点
          markPoint: {
            data: [
              { type: 'max', name: '最高' },
              { type: 'min', name: '最低' }
            ]
          }
        }]
      };
      chart.setOption(option);
    }
  }
};
</script>
