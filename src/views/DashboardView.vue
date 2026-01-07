<template>
  <dv-full-screen-container class="bg-container">
    <div class="top-header">
      <dv-decoration-8 style="width:300px;height:50px;" />
      <div class="title-text">教育行为深度可视分析平台</div>
      <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
    </div>

    <div class="main-content">
      
      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>📊 基础描述性分析</h3>
          <CommonChart :options="charts.basicDescriptive" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>⏱️ 答题耗时分布 (1-9s)</h3>
          <CommonChart :options="charts.timeDistribution" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>🏫 班级/专业对比</h3>
          <CommonChart :options="charts.classComparison" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>🎓 学生能力画像</h3>
          <CommonChart :options="charts.studentPerformance" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>🌙 24小时学习行为</h3>
          <CommonChart :options="charts.temporalPatterns" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>🧩 题目难度与热度</h3>
          <CommonChart :options="charts.questionDifficulty" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>🛠️ 学习方法效率</h3>
          <CommonChart :options="charts.learningMethod" />
        </div>
      </dv-border-box-12>

      <dv-border-box-12 class="grid-item">
        <div class="chart-box">
          <h3>📈 学习进步轨迹</h3>
          <CommonChart :options="charts.learningTrajectory" />
        </div>
      </dv-border-box-12>

    </div>
  </dv-full-screen-container>
</template>

<script>
import CommonChart from '../components/CommonChart.vue';

export default {
  name: 'DashboardView', 
  components: { CommonChart },
  data() {
    return {
      // 这里存放所有图表的 ECharts 配置项 (Option)
      charts: {
        basicDescriptive: {},
        timeDistribution: {},
        classComparison: {},
        studentPerformance: {},
        temporalPatterns: {},
        questionDifficulty: {},
        learningMethod: {},
        learningTrajectory: {}
      }
    };
  },
  mounted() {
    this.initChartData();
  },
  methods: {
    // 模拟加载数据并生成 Option
    initChartData() {
      // ⚠️ 注意：这里你需要根据 outputs/data_analysis/ 中的 CSV/JSON 数据
      // 转换为 ECharts 的 option 格式。以下为核心逻辑示例：

      // 1. 基础分析示例
      this.charts.basicDescriptive = {
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
                { value: 1048, name: '通过' },
                { value: 735, name: '错误' },
                { value: 580, name: '编译失败' }
            ],
            label: { color: '#fff' }
        }]
      };

      // 2. 时间分布 (体现 1-9秒分析)
      this.charts.timeDistribution = {
        xAxis: { type: 'category', data: ['1s', '2s', '3s', '4s', '5s', '>9s'], axisLabel: { color: '#fff'} },
        yAxis: { type: 'value', axisLabel: { color: '#fff'} },
        series: [{
          data: [120, 200, 150, 80, 70, 110], // 填入清洗后的数据
          type: 'bar',
          itemStyle: { color: '#37a2da' }
        }]
      };
      
      // ... 初始化其他6个图表配置 ...
    }
  }
};
</script>

<style lang="less" scoped>
.bg-container {
  background-image: url('https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/e6e73715c0a373534b41312388656d0d.png'); // 示例深色背景
  background-size: cover;
  color: #fff;
}

.top-header {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .title-text {
    font-size: 32px;
    font-weight: bold;
    margin: 0 20px;
    color: #bbf;
    text-shadow: 0 0 10px #00eaff;
  }
}

.main-content {
  padding: 20px;
  height: calc(100% - 80px);
  display: grid;
  // 布局：4列 x 2行
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
}

.grid-item {
  width: 100%;
  height: 100%;
}

.chart-box {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  h3 {
    margin: 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #00eaff;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .chart-container {
    flex: 1; // 填满剩余空间
  }
}
</style>
