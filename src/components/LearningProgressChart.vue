<template>
  <div class="progress-container">
    <div class="charts-layout">
      <div class="pie-box">
        <dv-active-ring-chart :config="ringConfig" style="width:200px;height:200px" />
      </div>
      <div class="quadrant-box">
        <div ref="quadrantRef" style="width:100%;height:350px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'LearningProgressChart',
  props: ['progressData'],
  computed: {
    ringConfig() {
      return {
        radius: '70%',
        activeRadius: '80%',
        data: this.progressData.pieData,
        digitalFlopStyle: { fontSize: 20, fill: '#fff' },
        showOriginValue: true
      };
    }
  },
  watch: {
    progressData: {
      handler() { this.renderQuadrant(); },
      deep: true
    }
  },
  methods: {
    renderQuadrant() {
      const chart = echarts.init(this.$refs.quadrantRef);
      chart.setOption({
        title: { text: '学生成长象限 (效率 vs 效果)', left: 'center', textStyle: { color: '#00eaff' } },
        tooltip: { trigger: 'item', formatter: (p) => `ID: ${p.data[2]}<br/>正确率提升: ${p.data[0]}%` },
        xAxis: { name: '正确率变化', splitLine: { lineStyle: { type: 'dashed' } } },
        yAxis: { name: '用时减少', splitLine: { lineStyle: { type: 'dashed' } } },
        series: [{
          type: 'scatter',
          data: this.progressData.quadrantData,
          symbolSize: 6,
          itemStyle: {
            color: (params) => {
              const type = params.data[3];
              return type === '进步' ? '#9fe6b8' : (type === '退步' ? '#fb7293' : '#32c5e9');
            }
          },
          markLine: {
            silent: true,
            lineStyle: { color: '#666' },
            data: [{ xAxis: 0 }, { yAxis: 0 }]
          }
        }]
      });
    }
  }
};
</script>

<style scoped>
.charts-layout { display: flex; align-items: center; }
.pie-box { flex: 1; }
.quadrant-box { flex: 2; }
</style>
