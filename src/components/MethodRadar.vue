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
      
      // 雷达图指标
      const indicators = [
        { name: '正确率', max: 100 },
        { name: '效率指数', max: 100 },
        { name: '稳定性', max: 10 },
        { name: '覆盖率', max: 100 },
        { name: '适用广度', max: 100 }
      ];
      
      const seriesData = this.data.map(item => ({
        value: [
          item.value_正确率 || 0,
          item.value_效率指数 || 0,
          item.value_稳定性 || 0,
          item.value_覆盖率 || 0,
          item.value_适用广度 || 0
        ],
        name: item.method
      }));
      
      const option = {
        title: {
          text: '学习方法多维评估',
          left: 'center',
          textStyle: { color: '#00eaff', fontSize: 14 }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 5,
          textStyle: { color: '#ccc' }
        },
        radar: {
          indicator: indicators,
          shape: 'circle',
          splitNumber: 4,
          axisName: {
            color: '#83bff6',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 234, 255, 0.2)'
            }
          }
        },
        series: [{
          type: 'radar',
          data: seriesData,
          itemStyle: {
            opacity: 0.7
          },
          lineStyle: {
            width: 2
          },
          areaStyle: {
            opacity: 0.1
          }
        }]
      };
      
      chart.setOption(option);
      
      // 点击图例切换显示的方法
      chart.on('legendselectchanged', (params) => {
        const selected = params.selected;
        for (const key in selected) {
          if (selected[key]) {
            const method = this.data.find(d => d.method === key);
            this.currentMethod = method?.full_name || key;
            break;
          }
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