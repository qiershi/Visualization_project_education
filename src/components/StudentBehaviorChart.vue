<template>
  <div class="behavior-chart">
    <div class="chart-header">
      <dv-decoration-5 style="width:300px;height:30px;" />
      <span class="title">学习行为分布分析</span>
    </div>
    
    <div ref="scatterRef" style="width:100%;height:300px;"></div>
    
    <!-- 简化的统计摘要 -->
    <div class="stats-section" :class="{ 'stats-collapsed': !showStats }">
      <div class="stats-header" @click="toggleStats">
        <span class="stats-title">
          <i :class="['iconfont', showStats ? 'icon-collapse' : 'icon-expand']"></i>
          学生分类统计
        </span>
        <span class="stats-toggle">{{ showStats ? '收起' : '展开' }}</span>
      </div>
      
      <div class="stats-content" v-show="showStats">
        <div class="stats-summary">
          <div class="summary-item" v-for="(category, index) in categoryStats" :key="index"
               :style="{ borderLeftColor: category.color }">
            <div class="category-color" :style="{ backgroundColor: category.color }"></div>
            <div class="category-info">
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{ category.count }} 人</span>
              <span class="category-percent">{{ category.percent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      showStats: true,
      students: [],
      categoryStats: []
    };
  },
  watch: {
    scatterData: {
      handler() { 
        this.processData();
        this.renderScatter();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.renderScatter();
    // 加载图标字体
    this.loadIcons();
  },
  methods: {
    // 处理数据，生成学生列表和分类统计
    processData() {
      this.students = this.scatterData.map(item => {
        const [intensity, accuracy, count, id] = item;
        const category = this.categorizeStudent(intensity, accuracy);
        return {
          id,
          intensity,
          accuracy,
          count,
          category,
          type: this.getCategoryName(category)
        };
      });
      
      // 按分类统计
      this.calculateCategoryStats();
    },
    
    // 计算各类统计信息
    calculateCategoryStats() {
      const total = this.students.length;
      const categories = [0, 1, 2, 3];
      
      this.categoryStats = categories.map(category => {
        const studentsInCategory = this.students.filter(s => s.category === category);
        const count = studentsInCategory.length;
        const percent = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
        
        return {
          id: category,
          name: this.getCategoryName(category),
          count,
          percent,
          color: this.getCategoryColor(category)
        };
      }).sort((a, b) => b.count - a.count); // 按人数降序排列
    },
    
    // 简单聚类函数
    categorizeStudent(x, y) {
      const midX = 10;
      const midY = 30;
      
      if (x <= midX && y >= midY) return 0; // 卓越型
      if (x > midX && y >= midY) return 1; // 拖延型
      if (x > midX && y < midY) return 2; // 探索型
      return 3; // 常规型
    },
    
    // 获取对应类型的颜色
    getCategoryColor(category) {
      const colors = [
        '#52c41a', // 卓越型 - 绿色
        '#1890ff', // 拖延型 - 蓝色
        '#fa8c16', // 探索型 - 橙色
        '#8c8c8c'  // 常规型 - 灰色
      ];
      return colors[category] || colors[3];
    },
    
    // 获取对应类型的名称
    getCategoryName(category) {
      const names = [
        '卓越型(高效低时)',
        '拖延型(高效高时)',
        '探索型(低效高时)',
        '常规型(低效低时)'
      ];
      return names[category] || names[3];
    },
    
    // 切换统计表格显示
    toggleStats() {
      this.showStats = !this.showStats;
    },
    
    // 加载图标（如果项目中没有图标字体，可以使用简单的Unicode字符）
    loadIcons() {
      // 如果项目中已有图标字体，可以移除这部分
      // 这里使用简单的Unicode字符代替
      const style = document.createElement('style');
      style.textContent = `
        .iconfont {
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
        }
        .icon-collapse:before { content: "▼"; font-size: 10px; }
        .icon-expand:before { content: "▶"; font-size: 10px; }
      `;
      document.head.appendChild(style);
    },
    
    renderScatter() {
      if (!this.$refs.scatterRef) return;
      
      const chart = echarts.init(this.$refs.scatterRef);
      
      // 预处理数据，添加分类信息
      const processedData = this.scatterData.map(item => {
        const [x, y, count, id] = item;
        const category = this.categorizeStudent(x, y);
        return {
          value: [x, y, count, id, this.getCategoryName(category)],
          itemStyle: {
            color: this.getCategoryColor(category)
          }
        };
      });
      
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
        legend: {
          top: 30,
          data: [
            { name: '卓越型(高效低时)', itemStyle: { color: '#52c41a' } },
            { name: '拖延型(高效高时)', itemStyle: { color: '#1890ff' } },
            { name: '探索型(低效高时)', itemStyle: { color: '#fa8c16' } },
            { name: '常规型(低效低时)', itemStyle: { color: '#8c8c8c' } }
          ],
          textStyle: { color: '#83bff6' }
        },
        tooltip: {
          trigger: 'item',
          formatter: (param) => {
            const data = param.data.value || param.data;
            return `
              <div style="padding:5px;">
                <div><b>学生ID:</b> ${data[3]}</div>
                <div><b>学习强度:</b> ${data[0].toFixed(2)}</div>
                <div><b>正确率:</b> ${data[1].toFixed(1)}%</div>
                <div><b>答题次数:</b> ${data[2]}</div>
                <div><b>类型:</b> ${data[4] || '未分类'}</div>
              </div>
            `;
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#00eaff',
          borderWidth: 1,
          textStyle: { color: '#fff' }
        },
        grid: { 
          top: '25%', 
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
          name: '学习行为分布',
          symbolSize: (data) => {
            const value = data.value || data;
            const count = value[2] || 0;
            const size = Math.sqrt(count) / 2;
            return Math.max(5, Math.min(size, 20));
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              borderWidth: 2
            }
          },
          data: processedData
        }]
      };
      
      chart.setOption(option);
      
      // 响应式调整
      const resizeHandler = () => chart.resize();
      window.addEventListener('resize', resizeHandler);
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeHandler);
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

/* 统计摘要样式 */
.stats-section {
  margin-top: 20px;
  background: rgba(0, 20, 40, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stats-collapsed {
  max-height: 40px;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(0, 40, 80, 0.8);
  cursor: pointer;
  color: #00eaff;
  font-weight: bold;
}

.stats-header:hover {
  background: rgba(0, 60, 120, 0.8);
}

.stats-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats-toggle {
  font-size: 12px;
  color: #83bff6;
  font-weight: normal;
}

.stats-content {
  padding: 15px;
}

/* 统计摘要样式 */
.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.summary-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: rgba(0, 30, 60, 0.5);
  border-radius: 4px;
  border-left: 4px solid;
}

.category-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
}

.category-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.category-name {
  font-size: 12px;
  color: #fff;
  margin-bottom: 2px;
}

.category-count {
  font-size: 14px;
  font-weight: bold;
  color: #00eaff;
}

.category-percent {
  font-size: 11px;
  color: #83bff6;
}
</style>