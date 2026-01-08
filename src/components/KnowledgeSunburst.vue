<template>
  <div class="sunburst-container">
    <dv-decoration-1 style="width:200px;height:30px;" />
    <div ref="sunburstRef" style="width: 100%; height: 320px;"></div>
    <div class="legend-box">
      <span class="legend-item" v-for="(item, idx) in legendData" :key="idx">
        <i :style="{backgroundColor: item.color}"></i>{{item.name}}
      </span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'KnowledgeSunburst',
  props: ['data'],
  data() {
    return {
      legendData: []
    };
  },
  watch: {
    data: {
      handler() { this.renderSunburst(); },
      deep: true
    }
  },
  mounted() {
    this.renderSunburst();
  },
  methods: {
    renderSunburst() {
      if (!this.$refs.sunburstRef || !this.data) return;
      
      const chart = echarts.init(this.$refs.sunburstRef);
      
      // 构建旭日图层级数据
      const domains = this.data.filter(d => d.parent === '所有知识点');
      
      this.legendData = domains.map(d => ({
        name: d.name,
        color: d.color
      }));
      
      const option = {
        title: {
          text: '知识点掌握分布',
          left: 'center',
          textStyle: { color: '#00eaff', fontSize: 14 }
        },
        tooltip: {
          formatter: (params) => {
            if (params.data) {
              return `${params.name}<br/>掌握程度: ${params.data.掌握程度 || 0}<br/>正确率: ${params.data.正确率 || 0}%`;
            }
            return '';
          }
        },
        series: {
          type: 'sunburst',
          data: this.data,
          radius: [0, '90%'],
          label: {
            rotate: 'radial',
            color: '#fff'
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#030409'
          },
          levels: [
            { r0: 0, r: '40%' },
            { r0: '40%', r: '80%' }
          ]
        }
      };
      
      chart.setOption(option);
      window.addEventListener('resize', () => chart.resize());
    }
  }
};
</script>

<style scoped>
.sunburst-container {
  padding: 10px;
  text-align: center;
}
.legend-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.legend-item {
  color: #83bff6;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.legend-item i {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
</style>