<template>
  <div class="method-container">
    <div ref="roseRef" style="width: 100%; height: 320px;"></div>
    <div class="best-method" v-if="bestMethod">
      🏆 效率之王：{{ bestMethod.full_name }} ({{ bestMethod.efficiency }})
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MethodEfficiencyChart',
  props: ['data'],
  computed: {
    bestMethod() {
      if (!this.data.length) return null;
      return [...this.data].sort((a, b) => b.efficiency - a.efficiency)[0];
    }
  },
  watch: {
    data: {
      handler() { this.renderChart(); },
      deep: true
    }
  },
  methods: {
    // 根据方法名称获取颜色
    getMethodColor(methodName) {
      const colorMap = {
        '直接法': '#5470c6',
        '推理法': '#91cc75',
        '逆向法': '#fac858',
        '分类讨论': '#ee6666',
        '数形结合': '#72c1d3',
        '化归思想': '#f9c440',
        '方程思想': '#f2838f',
        '函数思想': '#8378ea',
        '整体思想': '#a0a7e6',
        '分类法': '#ff9c6e'
      };
      
      // 为未知方法生成一致的颜色
      if (!colorMap[methodName]) {
        let hash = 0;
        for (let i = 0; i < methodName.length; i++) {
          hash = methodName.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const colors = [
          '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
          '#5470c6', '#fac858', '#ee6666', '#91cc75', '#72c1d3'
        ];
        
        return colors[Math.abs(hash) % colors.length];
      }
      
      return colorMap[methodName];
    },
    
    renderChart() {
      const chart = echarts.init(this.$refs.roseRef);
      chart.setOption({
        title: { 
          text: '学习方法掌握分布', 
          left: 'center', 
          textStyle: { 
            color: '#00eaff', 
            fontSize: 16,
            fontWeight: 'bold'
          },
          top: 10
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            if (params.data) {
              return `${params.name}<br/>正确率: ${params.data.value || 0}%`;
            }
            return '';
          },
          backgroundColor: 'rgba(0,20,40,0.9)',
          borderColor: '#00eeff',
          borderWidth: 1,
          textStyle: {
            color: '#fff'
          }
        },
        series: {
          type: 'sunburst',
          data: this.data.map(item => ({
            value: item.accuracy,
            name: item.name,
            itemStyle: { 
              color: this.getMethodColor(item.name),
              shadowBlur: 5,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          })),
          radius: [0, '90%'],
          sort: undefined,
          label: {
            rotate: 'radial',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowBlur: 2
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#030409',
            borderRadius: 3
          },
          levels: [
            {},
            {
              r0: 0,
              r: '40%',
              itemStyle: { 
                borderWidth: 3,
                borderColor: '#030409',
                borderRadius: 5
              },
              label: { 
                align: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff'
              }
            },
            {
              r0: '40%',
              r: '80%',
              label: { 
                position: 'outside',
                padding: [5, 0, 0, 0],
                fontSize: 12,
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.8)',
                textShadowBlur: 2
              },
              itemStyle: { 
                borderWidth: 2,
                borderColor: '#030409',
                borderRadius: 3
              }
            }
          ],
          emphasis: {
            focus: 'ancestor',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(255, 255, 255, 0.5)'
            }
          },
          animation: true
        }
      });
      
      // 添加点击事件监听
      chart.on('click', (params) => {
        if (params.data) {
          this.$emit('method-click', params.data);
        }
      });
    }
  }
};
</script>

<style scoped>
.best-method {
  text-align: center;
  color: #ffdb5c;
  font-weight: bold;
  background: rgba(255, 219, 92, 0.1);
  padding: 10px;
  border-radius: 4px;
}
</style>
