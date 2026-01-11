<template>
  <div class="rank-container">
    <div class="rank-title">
      <dv-decoration-3 style="width:200px;height:30px;" />
      <span class="title-text">各班级答题总量排名</span>
    </div>
    
    <div 
      class="rank-wrapper"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      <dv-scroll-ranking-board 
        :config="rankConfig" 
        style="width:100%;height:300px" 
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassRankChart',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    comparisonData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentHoveredClass: null,
      tooltipVisible: false,
      isMouseOver: false,
    };
  },
  computed: {
    rankConfig() {
      // 将比较数据转换为以班级名为键的对象，便于查找
      const comparisonMap = {};
      this.comparisonData.forEach(item => {
        comparisonMap[item.class] = item;
      });
      
      // 为每个排名数据项添加标题提示
      const enhancedData = this.data.map(item => {
        const classInfo = comparisonMap[item.name];
        let tips = `${item.name}`;
        if (classInfo) {
          tips += `\n正确率: ${(classInfo.平均正确率 * 100).toFixed(1)}%\n平均得分: ${classInfo.平均得分.toFixed(3)}`;
        }
        
        return {
          ...item,
          // 保存班级详细信息用于提示
          tips: tips
        };
      });
      
      return {
        data: enhancedData,
        unit: '次',
        rowNum: 6, // 每次显示 6 行
        waitTime: 3000, // 轮播间隔
        carousel: 'single', // 单条轮播
        sort: true, // 自动排序
        // 配置自定义HTML标签
        dataFilter: (item) => {
          return item;
        }
      };
    }
  },
  mounted() {
  },
  beforeDestroy() {
    this.hideTooltip();
  },
  methods: {
    handleMouseEnter() {
      // 鼠标进入组件区域
      this.isMouseOver = true;
    },
    handleMouseLeave() {
      // 鼠标离开组件区域
      this.isMouseOver = false;
      this.hideTooltip();
    },
    handleMouseMove(event) {
      if (!this.isMouseOver) return;
      
      // 获取鼠标位置相对于组件的坐标
      const rect = event.target.getBoundingClientRect();
      const y = event.clientY - rect.top;
      
      // 计算大概的行高度，以便确定鼠标悬停在哪一行
      const rowHeight = rect.height / 6; // 假设有6行
      const rowIndex = Math.floor(y / rowHeight);
      
      if (rowIndex >= 0 && rowIndex < this.data.length) {
        const hoveredItem = this.data[rowIndex];
        const classInfo = this.comparisonData.find(info => info.class === hoveredItem.name);
        
        if (classInfo) {
          this.showTooltip(event, classInfo);
        } else {
          this.hideTooltip();
        }
      } else {
        this.hideTooltip();
      }
    },
    showTooltip(event, classInfo) {
      // 移除现有的tooltip
      this.hideTooltip();
      
      // 创建tooltip元素
      const tooltip = document.createElement('div');
      tooltip.id = 'class-rank-tooltip';
      tooltip.innerHTML = `
        <div class="tooltip-content">
          <div>正确率: ${(classInfo.平均正确率 * 100).toFixed(1)}%</div>
          <div>平均得分: ${classInfo.平均得分.toFixed(3)}</div>
        </div>
      `;
      
      // 添加样式
      Object.assign(tooltip.style, {
        position: 'fixed',
        zIndex: '9999',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        pointerEvents: 'none',
        border: '1px solid #00eaff',
        boxShadow: '0 0 10px rgba(0, 234, 255, 0.5)'
      });
      
      document.body.appendChild(tooltip);
      
      // 定位tooltip
      tooltip.style.left = event.clientX + 10 + 'px';
      tooltip.style.top = event.clientY + 10 + 'px';
    },
    hideTooltip() {
      const existingTooltip = document.getElementById('class-rank-tooltip');
      if (existingTooltip) {
        existingTooltip.remove();
      }
    }
  }
};
</script>

<style scoped>
.rank-container {
  padding: 15px;
  color: #fff;
}
.rank-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.title-text {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #00eaff;
}
/* 修改 DataV 默认样式，使其更符合深色大屏 */
:deep(.info-name) {
  color: #83bff6 !important;
}
:deep(.ranking-value) {
  color: #ff9f7f !important;
}
</style>
