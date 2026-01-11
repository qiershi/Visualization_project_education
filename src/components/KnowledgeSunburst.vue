<template>
  <div class="sunburst-container">
    <dv-decoration-1 style="width:200px;height:30px;" />
    <div ref="sunburstRef" style="width: 100%; height: 380px;"></div>
    <div class="legend-box">
      <span 
        class="legend-item" 
        v-for="(item, idx) in legendData" 
        :key="idx"
        @mouseenter="highlightLegend(item.name, true)"
        @mouseleave="highlightLegend(item.name, false)"
        @click="focusOnNode(item.name)"
      >
        <i :style="{backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}`}"></i>
        <span>{{item.name}}</span>
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
      legendData: [],
      chartInstance: null,
      currentHighlight: null
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
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      window.removeEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    
    renderSunburst() {
      if (!this.$refs.sunburstRef || !this.data) return;
      
      // 销毁旧实例
      if (this.chartInstance) {
        this.chartInstance.dispose();
      }
      
      this.chartInstance = echarts.init(this.$refs.sunburstRef);
      
      // 构建旭日图层级数据
      const domains = this.data.filter(d => d.parent === '所有知识点');
      
      this.legendData = domains.map(d => ({
        name: d.name,
        color: d.color
      }));
      
      const option = {
        // 移除标题，使用外部 h3
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            if (params.data) {
              const mastery = params.data.掌握程度 || 0;
              const accuracy = params.data.正确率 || 0;
              return `<div style="padding: 8px;">
                <div style="font-size: 14px; font-weight: bold; color: #00eaff; margin-bottom: 6px;">
                  ${params.name}
                </div>
                <div style="font-size: 12px; color: #fff;">
                  <span style="color: #fac858;">●</span> 掌握程度: <strong>${mastery}</strong>
                </div>
                <div style="font-size: 12px; color: #fff;">
                  <span style="color: #5470c6;">●</span> 正确率: <strong>${accuracy}%</strong>
                </div>
              </div>`;
            }
            return '';
          },
          backgroundColor: 'rgba(0, 20, 40, 0.95)',
          borderColor: '#00eeff',
          borderWidth: 2,
          textStyle: {
            color: '#fff'
          },
          extraCssText: 'box-shadow: 0 0 20px rgba(0, 234, 255, 0.5); border-radius: 8px;'
        },
        series: {
          type: 'sunburst',
          data: this.data,
          radius: [0, '95%'],
          center: ['50%', '50%'],
          sort: undefined,
          // 高亮样式
          emphasis: {
            focus: 'ancestor',
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 234, 255, 0.8)',
              borderWidth: 4,
              borderColor: '#00eaff'
            },
            label: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
              textShadowColor: '#000',
              textShadowBlur: 4
            }
          },
          // 淡出样式
          blur: {
            itemStyle: {
              opacity: 0.3
            },
            label: {
              opacity: 0.3
            }
          },
          label: {
            rotate: 'radial',
            color: '#fff',
            fontSize: 13,
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowBlur: 3,
            minAngle: 15,  // 只有扇形角度大于15度才显示标签
            formatter: (params) => {
              // 根据层级调整标签格式
              if (params.depth === 1) {
                return `{a|${params.name}}`;
              }
              return params.name;
            },
            rich: {
              a: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
                textShadowColor: '#000',
                textShadowBlur: 4
              }
            }
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#030409',
            borderRadius: 5,
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.4)'
          },
          levels: [
            {},
            {
              r0: 0,
              r: '45%',  // 中心圆盘比例调整为 45%，相比初始的 30% 增加了 50% 的半径占比
              itemStyle: {
                borderWidth: 5,  // 略微增加边框厚度以匹配更大的体积
                borderColor: '#030409',
                shadowBlur: 20,  // 增加阴影深度，使其更具立体感
                shadowColor: 'rgba(0, 0, 0, 0.6)'
              },
              label: {
                align: 'center',
                fontSize: 18,  // 字体随面积同步增大
                fontWeight: 'bold'
              }
            },
            {
              r0: '45%',
              r: '75%',  // 中间层级起始位置同步平移
              itemStyle: {
                borderWidth: 3,
                borderColor: '#030409'
              },
              label: {
                align: 'right',
                fontSize: 13
              }
            },
            {
              r0: '75%',
              r: '95%',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#030409'
              },
              label: {
                position: 'outside',
                fontSize: 12,
                silent: false
              }
            }
          ],
          // 动画配置
          animationType: 'expansion',
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        }
      };
      
      this.chartInstance.setOption(option);
      
      // 添加点击事件监听
      this.chartInstance.on('click', (params) => {
        if (params.data && params.data.type !== 'root') {
          this.$emit('node-click', params.data);
          
          // 点击后高亮该节点
          this.chartInstance.dispatchAction({
            type: 'sunburstRootToNode',
            targetNodeId: params.data.id
          });
        }
      });
      
      // 添加双击重置功能
      this.chartInstance.on('dblclick', () => {
        this.chartInstance.dispatchAction({
          type: 'sunburstRootToNode',
          targetNodeId: null
        });
      });
      
      window.addEventListener('resize', this.handleResize);
    },
    
    // 图例高亮交互
    highlightLegend(name, isHighlight) {
      if (!this.chartInstance) return;
      
      if (isHighlight) {
        this.chartInstance.dispatchAction({
          type: 'highlight',
          name: name
        });
      } else {
        this.chartInstance.dispatchAction({
          type: 'downplay',
          name: name
        });
      }
    },
    
    // 聚焦到指定节点
    focusOnNode(name) {
      if (!this.chartInstance) return;
      
      // 找到对应的数据节点
      const targetNode = this.data.find(d => d.name === name);
      if (targetNode && targetNode.id) {
        this.chartInstance.dispatchAction({
          type: 'sunburstRootToNode',
          targetNodeId: targetNode.id
        });
      }
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
  gap: 12px;
  margin-top: 15px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.legend-item {
  color: #83bff6;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.legend-item:hover {
  background: rgba(0, 234, 255, 0.1);
  border-color: rgba(0, 234, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 234, 255, 0.3);
}

.legend-item:hover span {
  color: #00eaff;
  font-weight: bold;
}

.legend-item i {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.legend-item:hover i {
  transform: scale(1.2);
  box-shadow: 0 0 12px currentColor !important;
}

/* 添加脉冲动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.legend-item:active {
  animation: pulse 0.5s ease;
}
</style>