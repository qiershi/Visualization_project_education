<template>
  <div class="progress-container">
    <div class="charts-layout">
      <div class="sunburst-box">
        <div ref="sunburstRef" style="width:100%;height:350px"></div>
      </div>
      <div class="quadrant-box">
        <div ref="quadrantRef" style="width:100%;height:350px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'LearningProgressChart',
  props: ['progressData'],
  data() {
    return {
      sunburstChart: null,
      quadrantChart: null
    };
  },
  watch: {
    progressData: {
      handler() { 
        this.renderCharts();
      },
      deep: true
    }
  },
  mounted() {
    this.renderCharts();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.sunburstChart) this.sunburstChart.dispose();
    if (this.quadrantChart) this.quadrantChart.dispose();
  },
  methods: {
    handleResize() {
      if (this.sunburstChart) this.sunburstChart.resize();
      if (this.quadrantChart) this.quadrantChart.resize();
    },
    renderCharts() {
      this.$nextTick(() => {
        if (!this.progressData) return;
        this.renderSunburst();
        this.renderQuadrant();
      });
    },
    renderSunburst() {
      if (!this.$refs.sunburstRef) return;
      if (this.sunburstChart) this.sunburstChart.dispose();
      
      const chart = this.sunburstChart = echarts.init(this.$refs.sunburstRef);
      
      const typeColors = {
        '进步': '#9fe6b8',
        '退步': '#fb7293',
        '稳定': '#32c5e9',
        '未分类': '#ff9c6e'
      };

      const sunburstData = [{
        name: '成长分布',
        children: this.progressData.pieData.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: typeColors[item.name] || '#ccc' }
        })),
        itemStyle: { color: '#5470c6' }
      }];

      const option = {
        title: {
          text: '群体成长类型分布',
          left: 'center',
          textStyle: { color: '#83bff6', fontSize: 16 }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}人 ({d}%)'
        },
        series: {
          type: 'sunburst',
          data: sunburstData,
          radius: [0, '90%'],
          center: ['50%', '55%'],
          sort: undefined,
          emphasis: {
            focus: 'ancestor'
          },
          levels: [
            {},
            {
              r0: 0,
              r: '25%',
              itemStyle: { borderWidth: 2 },
              label: { rotate: 'tangential', fontSize: 10 }
            },
            {
              r0: '25%',
              r: '85%',
              label: { align: 'right' }
            }
          ],
          label: {
            color: '#fff',
            textShadowColor: '#000',
            textShadowBlur: 2
          }
        }
      };
      
      chart.setOption(option);
    },
    renderQuadrant() {
      if (!this.$refs.quadrantRef) return;
      if (this.quadrantChart) this.quadrantChart.dispose();
      
      const chart = this.quadrantChart = echarts.init(this.$refs.quadrantRef);
      chart.setOption({
        title: { 
          text: '进步量化分析 (效率 vs 效果)', 
          left: 'center', 
          textStyle: { color: '#00eaff', fontSize: 16 } 
        },
        tooltip: { 
          trigger: 'item', 
          formatter: (p) => {
            const data = p.data;
            return `<div style="padding:5px">
              <span style="color:#00eaff">学生ID:</span> ${data[2]}<br/>
              <span style="color:#fac858">正确率提升:</span> ${data[0]}%<br/>
              <span style="color:#ee6666">用时减少:</span> ${data[1]}s<br/>
              <span style="color:#91cc75">状态:</span> ${data[3]}
            </div>`;
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#00eaff',
          textStyle: { color: '#fff' }
        },
        grid: {
          top: 60,
          bottom: 40,
          left: 50,
          right: 50
        },
        xAxis: { 
          name: '正确率变化', 
          nameLocation: 'middle',
          nameGap: 25,
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { color: '#83bff6' }
        },
        yAxis: { 
          name: '用时减少 (s)', 
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { color: '#83bff6' }
        },
        series: [{
          type: 'scatter',
          data: this.progressData.quadrantData,
          symbolSize: (data) => Math.sqrt(Math.abs(data[0]) + Math.abs(data[1])) * 3 + 4,
          itemStyle: {
            opacity: 0.7,
            color: (params) => {
              const type = params.data[3];
              return type === '进步' ? '#9fe6b8' : (type === '退步' ? '#fb7293' : '#32c5e9');
            },
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.5)'
          },
          markLine: {
            silent: true,
            lineStyle: { color: 'rgba(255,255,255,0.2)', type: 'solid' },
            data: [{ xAxis: 0 }, { yAxis: 0 }],
            label: { show: false }
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
              borderWidth: 2,
              borderColor: '#fff'
            }
          }
        }]
      });
    }
  }
};
</script>

<style scoped>
.progress-container {
  padding: 10px;
}
.charts-layout { 
  display: flex; 
  align-items: center; 
  width: 100%;
}
.sunburst-box { 
  flex: 1; 
  min-width: 0;
}
.quadrant-box { 
  flex: 1.5; 
  min-width: 0;
}
</style>
