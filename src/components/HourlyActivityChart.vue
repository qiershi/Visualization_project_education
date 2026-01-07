<template>
  <div class="hourly-box">
    <div ref="hourRef" style="width: 100%; height: 280px;"></div>
    <dv-decoration-10 style="width:100%;height:5px;" />
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HourlyActivityChart',
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
      const chart = echarts.init(this.$refs.hourRef);
      const option = {
        title: {
          text: '24小时答题活跃度分布',
          left: 'center',
          textStyle: { color: '#00eaff', fontSize: 16 }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}点: {c} 次'
        },
        grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          data: this.data.map(item => item.hour),
          axisLabel: { color: '#83bff6' },
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#83bff6' },
          splitLine: { lineStyle: { color: '#222' } }
        },
        series: [{
          name: '活跃度',
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 3, color: '#5470c6' },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(128, 255, 165)' },
              { offset: 1, color: 'rgb(1, 191, 236)' }
            ])
          },
          data: this.data.map(item => item.activity_count)
        }]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.hourly-box { padding: 15px; background: rgba(0, 0, 0, 0.2); }
</style>
