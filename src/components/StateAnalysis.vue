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
    // 根据状态获取颜色
    getStateColor(state) {
      const colorMap = {
        '正确': '#5470c6',
        '错误': '#ee6666',
        '部分正确': '#fac858',
        '未作答': '#91cc75',
        '超时未答': '#72c1d3',
        '格式错误': '#f9c440',
        '计算错误': '#f2838f',
        '概念错误': '#8378ea',
        '理解错误': '#a0a7e6',
        '粗心错误': '#ff9c6e'
      };
      
      // 为未知状态生成一致的颜色
      if (!colorMap[state]) {
        let hash = 0;
        for (let i = 0; i < state.length; i++) {
          hash = state.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const colors = [
          '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
          '#5470c6', '#fac858', '#ee6666', '#91cc75', '#72c1d3'
        ];
        
        return colors[Math.abs(hash) % colors.length];
      }
      
      return colorMap[state];
    },
    
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
          data: this.data.map(item => ({ 
            value: item.count, 
            name: item.state,
            itemStyle: { color: this.getStateColor(item.state) }
          }))
        }]
      };
      
      this.chartInstance.setOption(option);
      
      // 添加点击事件监听
      this.chartInstance.on('click', (params) => {
        if (params.data) {
          this.$emit('state-click', params.data);
        }
      });
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
