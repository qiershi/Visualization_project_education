<template>
  <div class="method-container">
    <div ref="roseRef" style="width: 100%; height: 320px;"></div>
    <div class="best-method" v-if="bestMethod">
      🏆 效率之王：{{ bestMethod.full_name }} ({{ bestMethod.efficiency }})
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MethodEfficiencyChart',
  props: ['data'],
  computed: {
    bestMethod() {
      if (!this.data.length) return null;
      return [...this.data].sort((a, b) => b.efficiency - a.efficiency)[0];
    }
  },
  watch: {
    data: {
      handler() { this.renderChart(); },
      deep: true
    }
  },
  methods: {
    renderChart() {
      const chart = echarts.init(this.$refs.roseRef);
      chart.setOption({
        title: { text: '学习方法覆盖度与正确率', left: 'center', textStyle: { color: '#00eaff' } },
        tooltip: { trigger: 'item', formatter: '{b}<br/>正确率: {c}%' },
        series: [{
          name: '方法分布',
          type: 'pie',
          radius: [20, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: { borderRadius: 5 },
          data: this.data.map(item => ({
            value: item.accuracy,
            name: item.name
          })),
          label: { color: '#ccc' }
        }]
      });
    }
  }
};
</script>

<style scoped>
.best-method {
  text-align: center;
  color: #ffdb5c;
  font-weight: bold;
  background: rgba(255, 219, 92, 0.1);
  padding: 10px;
  border-radius: 4px;
}
</style>
