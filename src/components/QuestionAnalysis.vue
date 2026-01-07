<template>
  <div class="question-container">
    <div class="chart-row">
      <div class="rank-list">
        <div class="sub-title">🔥 难度排行榜 (正确率最低)</div>
        <dv-scroll-ranking-board :config="rankConfig" style="width:100%;height:260px" />
      </div>
      
      <div class="bubble-chart">
        <div ref="bubbleRef" style="width:100%;height:300px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'QuestionAnalysis',
  props: ['difficultyData'],
  computed: {
    rankConfig() {
      return {
        data: this.difficultyData.hardestQuestions.map(q => ({
          name: q.title_ID.substring(0, 15) + '...',
          value: Math.round(q.正确率 * 100)
        })),
        unit: '%',
        sort: false // CSV 已经排好序了
      };
    }
  },
  watch: {
    difficultyData: {
      handler() { this.renderBubble(); },
      deep: true
    }
  },
  methods: {
    renderBubble() {
      const chart = echarts.init(this.$refs.bubbleRef);
      chart.setOption({
        title: { text: '题目效能分布 (用时 vs 正确率)', left: 'center', textStyle: { color: '#fff', fontSize: 14 } },
        grid: { top: '20%', bottom: '15%', left: '10%' },
        tooltip: {
          formatter: (p) => `题目: ${p.data[3]}<br/>用时: ${p.data[0]}s<br/>正确率: ${p.data[1]}%`
        },
        xAxis: { name: '平均用时(s)', axisLabel: { color: '#83bff6' }, splitLine: { show: false } },
        yAxis: { name: '正确率%', axisLabel: { color: '#83bff6' }, splitLine: { lineStyle: { type: 'dashed' } } },
        series: [{
          type: 'scatter',
          symbolSize: (data) => Math.sqrt(data[2]) / 2, // 答题量越大气泡越大
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              { offset: 0, color: 'rgb(251, 118, 123)' },
              { offset: 1, color: 'rgb(204, 46, 72)' }
            ])
          },
          data: this.difficultyData.bubbleData
        }]
      });
    }
  }
};
</script>
