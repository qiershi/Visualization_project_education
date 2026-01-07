<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'CommonChart',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.chartInstance.setOption(this.options);
    },
    resizeChart() {
      this.chartInstance && this.chartInstance.resize();
    }
  },
  watch: {
    options: {
      deep: true,
      handler(newVal) {
        if (this.chartInstance) {
          this.chartInstance.setOption(newVal);
        }
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
