<template>
  <div class="radar-container">
    <div ref="radarRef" style="width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ClassEfficiencyRadar',
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
      if (!this.$refs.radarRef) return;
      if (this.chart) this.chart.dispose();

      this.chart = echarts.init(this.$refs.radarRef);

      // 展示所有班级
      const displayData = this.data;

      const option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: '#00eeff',
          borderWidth: 1,
          textStyle: { color: '#fff' },
          confine: true // 将 tooltip 限制在图表区域内
        },
        legend: {
          type: 'scroll', // 使用滚动图例
          orient: 'vertical',
          left: 'left',
          textStyle: { color: '#83bff6', fontSize: 10 },
          data: displayData.map(d => d.class),
          top: 'center',
          pageTextStyle: { color: '#fff' },
          pageIconColor: '#00eaff',
          pageIconInactiveColor: '#333'
        },
        radar: {
          indicator: [
            { name: '学生规模', max: 120 },
            { name: '平均得分', max: 1.2 },
            { name: '正确率(%)', max: 40 },
            { name: '方法多样性', max: 10 },
            { name: '平均用时(s)', max: 15 }
          ],
          shape: 'circle',
          splitNumber: 5,
          center: ['60%', '50%'], // 向右偏移一点，给左侧滚动图例留空间
          radius: '65%',
          axisName: {
            color: '#83bff6'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(0, 234, 255, 0.1)',
                'rgba(0, 234, 255, 0.2)',
                'rgba(0, 234, 255, 0.4)',
                'rgba(0, 234, 255, 0.6)',
                'rgba(0, 234, 255, 0.8)',
                'rgba(0, 234, 255, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 234, 255, 0.5)'
            }
          }
        },
        series: [
          {
            name: '班级综合效能对比',
            type: 'radar',
            lineStyle: { width: 2 },
            data: displayData.map((d, index) => {
              // 扩充调色盘
              const colors = [
                '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', 
                '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5ab1ef',
                '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d'
              ];
              return {
                value: [
                  d.学生数量,
                  d.平均得分,
                  d.平均正确率 * 100,
                  d.方法多样性,
                  d.平均用时
                ],
                name: d.class,
                symbol: 'circle',
                symbolSize: 4,
                itemStyle: { color: colors[index % colors.length] },
                areaStyle: {
                  opacity: 0.1 // 降低透明度，防止多层叠加后看不清
                }
              };
            }),
            emphasis: {
              lineStyle: {
                width: 4
              },
              areaStyle: {
                opacity: 0.4
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
.radar-container {
  width: 100%;
  height: 100%;
}
</style>
