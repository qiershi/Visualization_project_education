<template>
  <div class="behavior-chart">
    <div class="chart-header">
      <dv-decoration-5 style="width:300px;height:30px;" />
      <span class="title">学习行为分布分析</span>
    </div>
    
    <div ref="scatterRef" style="width:100%;height:300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'StudentBehaviorChart',
  props: {
    scatterData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    scatterData: {
      handler() { 
        this.renderScatter();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.renderScatter();
  },
  methods: {
    renderScatter() {
      if (!this.$refs.scatterRef) return;
      
      const chart = echarts.init(this.$refs.scatterRef);
      
      const option = {
        title: { 
          text: '学习强度 vs 正确率 (行为分布)',
          left: 'center', 
          textStyle: { 
            color: '#00eaff', 
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (param) => {
            return `
              <div style="padding:5px;">
                <div><b>学生ID:</b> ${param.data[3]}</div>
                <div><b>学习强度:</b> ${param.data[0].toFixed(2)}</div>
                <div><b>正确率:</b> ${param.data[1].toFixed(1)}%</div>
                <div><b>答题次数:</b> ${param.data[2]}</div>
              </div>
            `;
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#00eaff',
          borderWidth: 1,
          textStyle: { color: '#fff' }
        },
        grid: { 
          top: '20%', 
          bottom: '15%',
          left: '10%',
          right: '10%',
          containLabel: true
        },
        xAxis: { 
          name: '学习强度 (答题数/活跃天数)',
          nameTextStyle: { color: '#83bff6' },
          type: 'value',
          splitLine: { 
            lineStyle: { 
              type: 'dashed',
              color: 'rgba(131, 191, 246, 0.2)'
            } 
          },
          axisLabel: { color: '#83bff6' },
          axisLine: { lineStyle: { color: '#83bff6' } }
        },
        yAxis: { 
          name: '正确率 (%)',
          nameTextStyle: { color: '#83bff6' },
          type: 'value',
          min: 0,
          max: 100,
          splitLine: { 
            lineStyle: { 
              type: 'dashed',
              color: 'rgba(131, 191, 246, 0.2)'
            } 
          },
          axisLabel: { 
            color: '#83bff6',
            formatter: '{value}%'
          },
          axisLine: { lineStyle: { color: '#83bff6' } }
        },
        series: [{
          type: 'scatter',
          symbolSize: (data) => {
            // 根据答题次数动态调整气泡大小
            const size = Math.sqrt(data[2]) / 2;
            return Math.max(5, Math.min(size, 20));
          },
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              { offset: 0, color: 'rgba(0, 242, 255, 0.8)' },
              { offset: 0.7, color: 'rgba(0, 168, 255, 0.6)' },
              { offset: 1, color: 'rgba(0, 77, 167, 0.4)' }
            ]),
            borderColor: '#fff',
            borderWidth: 1,
            shadowColor: 'rgba(0, 242, 255, 0.5)',
            shadowBlur: 10
          },
          emphasis: {
            itemStyle: {
              shadowColor: 'rgba(0, 242, 255, 0.8)',
              shadowBlur: 20
            }
          },
          data: this.scatterData
        }],
        visualMap: {
          show: false,
          dimension: 2, // 答题次数维度
          min: 0,
          max: Math.max(...this.scatterData.map(d => d[2])),
          inRange: {
            color: ['#00eaff', '#0077ff', '#003f7f']
          }
        }
      };
      
      chart.setOption(option);
      
      // 响应式调整
      window.addEventListener('resize', () => chart.resize());
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', () => chart.resize());
        chart.dispose();
      });
    }
  }
};
</script>

<style scoped>
.behavior-chart {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.title {
  color: #00eaff;
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
  text-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
}
</style>