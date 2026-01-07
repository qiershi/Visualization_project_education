<template>
  <div class="student-box">
    <div class="honor-rank">
      <dv-decoration-7 style="width:250px;height:30px;color:#fff;">学霸综合表现榜</dv-decoration-7>
      <dv-scroll-board :config="boardConfig" style="width:100%;height:180px;" />
    </div>

    <div class="behavior-chart">
      <div ref="scatterRef" style="width:100%;height:260px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'StudentAnalysis',
  props: ['performanceData'],
  computed: {
    boardConfig() {
      const rows = this.performanceData.topStudents.map(s => [
        `<span style="color:#e7bc3c">No.${s.综合排名}</span>`,
        s.student_ID.substring(0, 8) + '...', // 脱敏显示
        s.班级,
        `${(s.正确率 * 100).toFixed(1)}%`,
        s.答题次数
      ]);
      return {
        header: ['排名', '学生ID', '班级', '正确率', '答题总数'],
        data: rows,
        columnWidth: [60, 120, 80, 80, 80],
        index: false,
        headerBGC: '#00275a',
        oddRowBGC: '#003a70',
        evenRowBGC: '#00275a'
      };
    }
  },
  watch: {
    performanceData: {
      handler() { this.renderScatter(); },
      deep: true
    }
  },
  methods: {
    renderScatter() {
      const chart = echarts.init(this.$refs.scatterRef);
      chart.setOption({
        title: { text: '学习强度 vs 正确率 (行为分布)', left: 'center', textStyle: { color: '#fff', fontSize: 14 } },
        grid: { top: '20%', bottom: '15%' },
        tooltip: {
          formatter: (param) => `ID: ${param.data[3]}<br/>强度: ${param.data[0]}<br/>正确率: ${param.data[1]}%`
        },
        xAxis: { name: '强度', splitLine: { lineStyle: { type: 'dashed' } }, axisLabel: { color: '#83bff6' } },
        yAxis: { name: '正确率%', splitLine: { lineStyle: { type: 'dashed' } }, axisLabel: { color: '#83bff6' } },
        series: [{
          type: 'scatter',
          symbolSize: (data) => Math.sqrt(data[2]) / 2, // 答题越多气泡越大
          itemStyle: {
            color: 'rgba(0, 242, 255, 0.6)',
            borderColor: '#fff',
            borderWidth: 1
          },
          data: this.performanceData.scatterData
        }]
      });
    }
  }
};
</script>

<style scoped>
.student-box { padding: 10px; }
.honor-rank { margin-bottom: 20px; }
</style>
