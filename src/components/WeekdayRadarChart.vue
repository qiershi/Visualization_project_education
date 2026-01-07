<template>
  <div class="radar-container">
    <div ref="radarRef" style="width: 100%; height: 320px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'WeekdayRadarChart',
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
      const chart = echarts.init(this.$refs.radarRef);
      
      const option = {
        title: {
          text: '周活跃周期画像',
          left: 'center',
          textStyle: { color: '#00eaff', fontSize: 16 }
        },
        radar: {
          indicator: this.data.map(item => ({
            name: item.weekday_name,
            max: 45000 // 根据数据最大值（周三41093）设定略高的上限
          })),
          splitNumber: 4,
          axisName: { color: '#83bff6' },
          splitLine: { lineStyle: { color: 'rgba(0, 234, 255, 0.2)' } },
          splitArea: { show: false },
          axisLine: { lineStyle: { color: 'rgba(0, 234, 255, 0.2)' } }
        },
        series: [{
          name: '日活跃量',
          type: 'radar',
          data: [{
            value: this.data.map(item => item.activity_count),
            name: '答题次数',
            symbolSize: 6,
            itemStyle: { color: '#00eaff' },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: 'rgba(0, 234, 255, 0.6)' },
                { offset: 1, color: 'rgba(0, 234, 255, 0.1)' }
              ])
            }
          }]
        }]
      };
      chart.setOption(option);
    }
  }
};
</script>
