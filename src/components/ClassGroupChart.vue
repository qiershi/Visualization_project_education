<template>
  <div class="group-container">
    <div class="sub-title">班级平均正确率 (Top 表现)</div>
    <dv-capsule-chart :config="capsuleConfig" style="width:100%;height:200px" />
    
    <div class="sub-title" style="margin-top:20px">班级平均答题规模</div>
    <div ref="barRef" style="width: 100%; height: 250px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ClassGroupChart',
  props: ['data'],
  computed: {
    capsuleConfig() {
      // 提取正确率最高的前 5 个班级进行展示
      const topData = [...this.data]
        .sort((a, b) => b.平均正确率 - a.平均正确率)
        .slice(0, 5)
        .map(item => ({
          name: item.班级,
          value: Math.round(item.平均正确率 * 100)
        }));
      return {
        data: topData,
        unit: '%',
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#9fe6b8']
      };
    }
  },
  watch: {
    data: {
      handler() { this.renderBarChart(); },
      deep: true
    }
  },
  methods: {
    renderBarChart() {
      const chart = echarts.init(this.$refs.barRef);
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: '10%', bottom: '15%', left: '15%' },
        xAxis: { type: 'value', axisLabel: { color: '#83bff6' }, splitLine: { show: false } },
        yAxis: { 
          type: 'category', 
          data: this.data.map(item => item.班级),
          axisLabel: { color: '#83bff6' }
        },
        series: [{
          name: '平均答题数',
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#188df0' },
              { offset: 1, color: '#83bff6' }
            ])
          },
          data: this.data.map(item => item.平均答题次数.toFixed(1))
        }]
      });
    }
  }
};
</script>

<style scoped>
.group-container { padding: 15px; }
.sub-title { color: #00eaff; font-size: 14px; font-weight: bold; border-left: 4px solid #00eaff; padding-left: 10px; }
</style>
