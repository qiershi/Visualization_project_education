<template>
  <div class="state-container">
    <div class="chart-side">
      <div ref="pieRef" style="width: 100%; height: 200px;"></div>
    </div>
    
    <div class="table-side">
      <dv-scroll-board :config="boardConfig" style="width:100%; height:220px;" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'StateAnalysis',
  props: ['data'],
  data() {
    return {
      chartInstance: null
    };
  },
  computed: {
    boardConfig() {
      // 将 CSV 数据转换为轮播表需要的二维数组格式
      const rows = this.data.map(item => [
        `<span style="color:#00eaff">${item.state}</span>`,
        item.count,
        `${item.percentage}%`
      ]);
      return {
        header: ['状态', '数量', '占比'],
        data: rows,
        index: true,
        columnWidth: [40, 150, 80, 80],
        align: ['center'],
        headerBGC: '#190c12',
        oddRowBGC: '#0f1325',
        evenRowBGC: '#171c33'
      };
    }
  },
  watch: {
    data: {
      handler(newVal) {
        if (newVal && newVal.length) this.initPieChart();
      },
      deep: true
    }
  },
  methods: {
    initPieChart() {
      if (!this.chartInstance) {
        this.chartInstance = echarts.init(this.$refs.pieRef);
      }
      const option = {
        tooltip: { trigger: 'item' },
        series: [{
          name: '答题状态',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#030409', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: '14', fontWeight: 'bold', color: '#fff' } },
          data: this.data.map(item => ({ value: item.count, name: item.state }))
        }]
      };
      this.chartInstance.setOption(option);
    }
  }
};
</script>

<style scoped>
.state-container {
  display: flex;
  height: 100%;
  padding: 10px;
}
.chart-side { flex: 1; }
.table-side { flex: 1.5; padding-left: 10px; }
</style>
