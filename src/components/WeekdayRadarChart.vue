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
  data() {
    return {
      chart: null
    };
  },
  watch: {
    data: {
      handler(newVal) {
        if (newVal && newVal.length) this.renderChart();
      },
      deep: true
    }
  },
  mounted() {
    if (this.data && this.data.length) this.renderChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    renderChart() {
      if (!this.$refs.radarRef) return;
      if (this.chart) this.chart.dispose();
      
      this.chart = echarts.init(this.$refs.radarRef);
      
      const option = {
        title: {
          text: '周活跃周期画像',
          left: 'center',
          textStyle: { color: '#00eaff', fontSize: 16 }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: '#00eeff',
          borderWidth: 1,
          textStyle: { color: '#fff' },
          formatter: (params) => {
            let label = `<div style="padding: 5px;">
              <div style="color: #00eaff; font-weight: bold; margin-bottom: 5px;">${params.name}</div>`;
            this.data.forEach((item) => {
              label += `<div style="font-size: 12px; display: flex; justify-content: space-between; gap: 20px;">
                <span>${item.weekday_name}:</span>
                <span style="color: #fac858; font-weight: bold;">${item.activity_count.toLocaleString()} 次</span>
              </div>`;
            });
            label += `</div>`;
            return label;
          }
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
      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.radar-container {
  width: 100%;
  height: 100%;
}
</style>
