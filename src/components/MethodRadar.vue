<template>
  <div class="radar-container">
    <dv-decoration-3 style="width:200px;height:30px;margin:0 auto;" />
    <div ref="radarRef" style="width: 100%; height: 320px;"></div>
    <div class="method-name">{{ currentMethod }}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MethodRadar',
  props: ['data'],
  data() {
    return {
      currentMethod: ''
    };
  },
  watch: {
    data: {
      handler() { this.renderRadar(); },
      deep: true
    }
  },
  mounted() {
    this.renderRadar();
  },
  methods: {
    renderRadar() {
      if (!this.$refs.radarRef || !this.data || this.data.length === 0) return;
      
      const chart = echarts.init(this.$refs.radarRef);
      this.currentMethod = this.data[0]?.full_name || '';
      
      // 极致放大差异方案：不仅设 max，更设 min，将坐标轴聚焦在微小的波动区间内
      const indicators = [
        { name: '正确率', min: 24, max: 26 },      // 聚焦在 24% - 26% 之间
        { name: '效率指数', min: 2.2, max: 2.8 },  // 聚焦在 2.2 - 2.8 之间
        { name: '稳定性', min: 0, max: 1.0 },      // 虽然都是0.8，但保留全局感
        { name: '覆盖率', min: 99.5, max: 100 },   // 聚焦在 99.5% - 100% 之间
        { name: '适用广度', min: 0, max: 100 }     // 固定满分
      ];
      
      const seriesData = this.data.map((item, index) => {
        const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'];
        const color = colors[index % colors.length];
        return {
          value: [
            item.value_正确率 || 0,
            item.value_效率指数 || 0,
            item.value_稳定性 || 0,
            item.value_覆盖率 || 0,
            item.value_适用广度 || 0
          ],
          name: item.method,
          itemStyle: { color: color },
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
              { offset: 0, color: 'rgba(0,0,0,0)' },
              { offset: 1, color: color }
            ]),
            opacity: 0.3
          },
          lineStyle: {
            width: 3,
            opacity: 1,
            shadowBlur: 10,
            shadowColor: color
          },
          symbol: 'circle',
          symbolSize: 6
        };
      });
      
      const option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(10, 20, 40, 0.9)',
          borderColor: '#00eaff',
          borderWidth: 1,
          textStyle: { color: '#fff' },
          confine: true
        },
        legend: {
          bottom: -5,
          type: 'scroll',
          textStyle: { color: '#83bff6', fontSize: 10 },
          pageTextStyle: { color: '#fff' },
          // 默认只选中第一个，避免面积重叠导致看不清
          selected: this.data.reduce((acc, item, idx) => {
            acc[item.method] = idx === 0;
            return acc;
          }, {})
        },
        radar: {
          indicator: indicators,
          shape: 'circle',
          splitNumber: 5,
          radius: '65%',
          center: ['50%', '42%'],
          axisName: {
            color: '#83bff6',
            fontSize: 10,
            fontWeight: 'bold'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(0, 234, 255, 0.05)',
                'rgba(0, 234, 255, 0.1)',
                'rgba(0, 234, 255, 0.2)',
                'rgba(0, 234, 255, 0.4)',
                'rgba(0, 234, 255, 0.6)'
              ].reverse()
            }
          },
          splitArea: { show: false },
          axisLine: {
            lineStyle: { color: 'rgba(0, 234, 255, 0.3)' }
          }
        },
        series: [{
          type: 'radar',
          data: seriesData,
          emphasis: {
            lineStyle: { width: 5 },
            areaStyle: { opacity: 0.6 }
          }
        }]
      };
      
      chart.setOption(option, true); // 使用 true 强制清理旧配置
      
      chart.on('legendselectchanged', (params) => {
        const selected = params.selected;
        const firstSelected = Object.keys(selected).find(key => selected[key]);
        if (firstSelected) {
          const method = this.data.find(d => d.method === firstSelected);
          this.currentMethod = method?.full_name || firstSelected;
        } else {
          this.currentMethod = '未选中任何方法';
        }
      });
      
      window.addEventListener('resize', () => chart.resize());
    }
  }
};
</script>

<style scoped>
.radar-container {
  padding: 10px;
  text-align: center;
}
.method-name {
  color: #ffdb5c;
  font-weight: bold;
  margin-top: 10px;
  font-size: 14px;
  background: rgba(255, 219, 92, 0.1);
  padding: 5px;
  border-radius: 4px;
}
</style>