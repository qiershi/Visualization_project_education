<template>
  <div class="bubble-container">
    <div ref="bubbleRef" style="width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MethodCompareBubble',
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
    if (this.chart) this.chart.dispose();
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    renderChart() {
      if (!this.$refs.bubbleRef) return;
      if (this.chart) this.chart.dispose();

      this.chart = echarts.init(this.$refs.bubbleRef);

      const option = {
        grid: {
          top: 40,
          bottom: 50,
          left: 60,
          right: 30
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(5, 15, 30, 0.9)',
          borderColor: '#00eeff',
          borderWidth: 1,
          padding: 10,
          textStyle: { color: '#fff' },
          formatter: (params) => {
            const d = params.data;
            return `<div style="min-width:180px">
              <div style="color:#00eaff;font-weight:bold;margin-bottom:8px;border-bottom:1px solid rgba(0,234,255,0.3);padding-bottom:5px">
                ${d.full_name}
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#83bff6">使用次数:</span>
                <span style="color:#fff">${d.usage.toLocaleString()}</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#83bff6">准确度:</span>
                <span style="color:#91cc75">${d.accuracy}%</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin:4px 0">
                <span style="color:#83bff6">效率指数:</span>
                <span style="color:#fac858;font-weight:bold">${d.efficiency.toFixed(2)}</span>
              </div>
            </div>`;
          }
        },
        xAxis: {
          name: '使用次数',
          nameLocation: 'middle',
          nameGap: 30,
          scale: true, // 不从 0 开始，自动聚焦数据区域
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { color: '#83bff6' },
          axisLine: { lineStyle: { color: 'rgba(0,234,255,0.3)' } }
        },
        yAxis: {
          name: '正确率 %',
          scale: true, // 不从 0 开始
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { 
            color: '#83bff6',
            formatter: '{value}%'
          },
          axisLine: { lineStyle: { color: 'rgba(0,234,255,0.3)' } }
        },
        series: [
          {
            type: 'scatter',
            data: this.data.map((item, index) => {
              const colors = [
                ['#4992ff', '#7cffb2'],
                ['#fddd60', '#ff6e76'],
                ['#58d5ff', '#73a9fa'],
                ['#67e0e3', '#9fe6b8'],
                ['#ffdb5c', '#fb7293'],
                ['#e062ae', '#e690d1'],
                ['#32c5e9', '#67e0e3'],
                ['#91cc75', '#fac858'],
                ['#ee6666', '#73c0de']
              ];
              const colorSet = colors[index % colors.length];
              
              return {
                value: [item.usage, item.accuracy],
                usage: item.usage,
                accuracy: item.accuracy,
                efficiency: item.efficiency,
                name: item.name,
                full_name: item.full_name,
                // 放大尺寸差异
                symbolSize: (item.efficiency - 20) * 10 + 20, 
                itemStyle: {
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                    { offset: 0, color: colorSet[0] },
                    { offset: 1, color: colorSet[1] }
                  ]),
                  opacity: 0.8,
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderWidth: 1
                },
                label: {
                  show: true,
                  formatter: '{b}',
                  position: 'top',
                  color: '#fff',
                  fontSize: 10,
                  textBorderColor: '#000',
                  textBorderWidth: 2
                }
              };
            }),
            emphasis: {
              scale: 1.2,
              itemStyle: {
                opacity: 1,
                borderWidth: 2,
                borderColor: '#fff',
                shadowBlur: 30,
                shadowColor: 'rgba(0, 234, 255, 0.8)'
              },
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold'
              }
            }
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.bubble-container {
  width: 100%;
  height: 100%;
}
</style>
