<template>
  <div class="dashboard-root">
    <!-- 头部区域 -->
    <header class="top-header">
      <dv-decoration-8 style="width:300px;height:50px;" />
      <div class="title-text">教育行为深度可视分析平台</div>
      <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      
      <!-- 模块1: 数据概览 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>📊 数据概览</span>
        </h2>
        <div class="module-grid grid-2">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>核心指标总览</h3>
              <BasicKpi :stats="basicStats"/>
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>答题状态分布</h3>
              <StateAnalysis :data="stateData"/>
            </div>
          </dv-border-box-12>
        </div>
      </section>

      <!-- 模块2: 时间行为分析 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>⏰ 时间行为分析</span>
        </h2>
        <div class="time-behavior-grid">
          <div class="time-row">
            <dv-border-box-12 class="module-card">
              <div class="chart-box">
                <h3>24小时活跃度</h3>
                <HourlyActivityChart :data="activityData" />
              </div>
            </dv-border-box-12>
            <dv-border-box-12 class="module-card">
              <div class="chart-box">
                <h3>24小时正确率</h3>
                <HourlyAccuracyChart :data="accuracyData" />
              </div>
            </dv-border-box-12>
          </div>
          <div class="time-row">
            <dv-border-box-12 class="module-card">
              <div class="chart-box">
                <h3>周活跃周期</h3>
                <WeekdayRadarChart :data="weekActivityData" />
              </div>
            </dv-border-box-12>
            <dv-border-box-12 class="module-card">
              <div class="chart-box">
                <h3>快速答题趋势</h3>
                <ShortTimeChart :data="shortTimeData" />
              </div>
            </dv-border-box-12>
          </div>
        </div>
      </section>

      <!-- 模块3: 班级分析 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>🏫 班级分析</span>
        </h2>
        <div class="module-grid grid-3">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>班级排名</h3>
              <ClassRankChart :data="classData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>班级对比详情</h3>
              <ClassDetailChart :data="comparisonData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>班级表现统计</h3>
              <ClassGroupChart :data="groupData" />
            </div>
          </dv-border-box-12>
        </div>
      </section>

      <!-- 模块4: 学生分析 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>👨‍🎓 学生分析</span>
        </h2>
        <div class="module-grid grid-2">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>学霸综合表现榜</h3>
              <StudentHonorChart :topStudents="performanceData.topStudents" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>学习行为分布</h3>
              <StudentBehaviorChart :scatterData="performanceData.scatterData" />
            </div>
          </dv-border-box-12>
        </div>
      </section>

      <!-- 模块5: 题目分析 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>📝 题目分析</span>
        </h2>
        <div class="module-grid grid-3">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>难度排行榜</h3>
              <QuestionAnalysis :difficultyData="difficultyData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>难度等级评估</h3>
              <DifficultyGroupChart :data="difficultyGroupData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>知识点掌握分布</h3>
              <KnowledgeSunburst :data="knowledgeSunburstData" />
            </div>
          </dv-border-box-12>
        </div>
      </section>

      <!-- 模块6: 学习方法分析 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>🎯 学习方法分析</span>
        </h2>
        <div class="module-grid grid-3">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>方法使用分布</h3>
              <MethodConicalChart :data="methodData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>方法效率分析</h3>
              <MethodEfficiencyChart :data="efficiencyData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>学习方法多维评估</h3>
              <MethodRadar :data="methodRadarData" />
            </div>
          </dv-border-box-12>
        </div>
      </section>

      <!-- 模块7: 学习轨迹分析 -->
      <section class="module-section">
        <h2 class="module-title">
          <dv-decoration-3 style="width:200px;height:30px;" />
          <span>📈 学习轨迹分析</span>
        </h2>
        <div class="module-grid grid-2">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>学习进步象限</h3>
              <LearningProgressChart :progressData="progressData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>周度学情演变</h3>
              <WeeklyProgressChart :data="weeklyData" />
            </div>
          </dv-border-box-12>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
import { 
  fetchBasicStatistics, 
  fetchStateDistribution, 
  fetchShortTimeDist, 
  fetchClassDistribution, 
  fetchMethodDistribution, 
  fetchClassComparison, 
  fetchStudentPerformance, 
  fetchStudentGroupStats, 
  fetchHourlyActivity, 
  fetchHourlyAccuracy, 
  fetchWeekdayActivity, 
  fetchQuestionDifficulty, 
  fetchDifficultyGroupStats, 
  fetchLearningProgress, 
  fetchWeeklyProgress, 
  fetchLearningMethods, 
  fetchKnowledgeSunburst,  
  fetchMethodRadar
} from '../js/dataService.js';

// 导入所有组件
import BasicKpi from '../components/BasicKpi.vue';
import StateAnalysis from '../components/StateAnalysis.vue';
import ShortTimeChart from '../components/ShortTimeChart.vue';
import ClassRankChart from '../components/ClassRankChart.vue';
import MethodConicalChart from '../components/MethodConicalChart.vue';
import ClassDetailChart from '../components/ClassDetailChart.vue';
import ClassGroupChart from '../components/ClassGroupChart.vue';
import HourlyActivityChart from '../components/HourlyActivityChart.vue';
import HourlyAccuracyChart from '../components/HourlyAccuracyChart.vue';
import WeekdayRadarChart from '../components/WeekdayRadarChart.vue';
import QuestionAnalysis from '../components/QuestionAnalysis.vue';
import DifficultyGroupChart from '../components/DifficultyGroupChart.vue';
import LearningProgressChart from '../components/LearningProgressChart.vue';
import WeeklyProgressChart from '../components/WeeklyProgressChart.vue';
import MethodEfficiencyChart from '../components/MethodEfficiencyChart.vue';
import StudentHonorChart from '../components/StudentHonorChart.vue';
import StudentBehaviorChart from '../components/StudentBehaviorChart.vue';
import KnowledgeSunburst from '../components/KnowledgeSunburst.vue';
import MethodRadar from '../components/MethodRadar.vue';

export default {
  name: 'DashboardView',
  components: { 
    BasicKpi, 
    StateAnalysis, 
    ShortTimeChart, 
    ClassRankChart, 
    MethodConicalChart, 
    ClassDetailChart, 
    ClassGroupChart, 
    HourlyActivityChart, 
    HourlyAccuracyChart, 
    WeekdayRadarChart, 
    QuestionAnalysis, 
    DifficultyGroupChart, 
    LearningProgressChart, 
    WeeklyProgressChart, 
    MethodEfficiencyChart,
    StudentHonorChart,
    StudentBehaviorChart ,
    KnowledgeSunburst,   // 添加新组件
    MethodRadar          // 添加新组件
  },
  data() {
    return {
      // 数据概览模块
      basicStats: {},
      stateData: [],
      
      // 时间行为分析模块
      shortTimeData: [],
      activityData: [],
      accuracyData: [],
      weekActivityData: [],
      
      // 班级分析模块
      classData: [],
      comparisonData: [],
      groupData: [],
      
      // 学生分析模块
      performanceData: { topStudents: [], scatterData: [] },
      
      // 题目分析模块
      difficultyData: { hardestQuestions: [], bubbleData: [] },
      difficultyGroupData: [],
      
      // 学习方法分析模块
      methodData: [],
      efficiencyData: [],
      // ... 其他数据
      knowledgeSunburstData: [],
      methodRadarData: [],
      // 学习轨迹分析模块
      progressData: [],
      weeklyData: []
    };
  },
  async mounted() {
    try {
      console.log('🔍 开始加载数据...');
      
      // 并行加载所有数据以提高性能
      const loadPromises = [
        this.loadBasicStats(),
        this.loadStateData(),
        this.loadTimeBehaviorData(),
        this.loadClassAnalysisData(),
        this.loadStudentData(),
        this.loadQuestionData(),
        this.loadMethodData(),
        this.loadLearningTrajectoryData(),
         this.loadNewAnalysisData()  
      ];
      
      await Promise.all(loadPromises);
      console.log('✅ 所有数据加载完成');
      
    } catch (error) { 
      console.error("❌ 加载数据失败: ", error);
    }
  },
  methods: {
    // 加载基础统计数据
    async loadBasicStats() {
      this.basicStats = await fetchBasicStatistics();
      console.log('✅ 基础统计数据加载完成');
    },
    
    // 加载答题状态数据
    async loadStateData() {
      this.stateData = await fetchStateDistribution();
      console.log('✅ 答题状态数据加载完成');
    },
    
    // 加载时间行为数据
    async loadTimeBehaviorData() {
      const [shortTime, activity, accuracy, weekActivity] = await Promise.all([
        fetchShortTimeDist(),
        fetchHourlyActivity(),
        fetchHourlyAccuracy(),
        fetchWeekdayActivity()
      ]);
      this.shortTimeData = shortTime;
      this.activityData = activity;
      this.accuracyData = accuracy;
      this.weekActivityData = weekActivity;
      console.log('✅ 时间行为数据加载完成');
    },
    
    // 加载班级分析数据
    async loadClassAnalysisData() {
      const [classData, comparisonData, groupData] = await Promise.all([
        fetchClassDistribution(),
        fetchClassComparison(),
        fetchStudentGroupStats()
      ]);
      this.classData = classData;
      this.comparisonData = comparisonData;
      this.groupData = groupData;
      console.log('✅ 班级分析数据加载完成');
    },
    
    // 加载学生数据
    async loadStudentData() {
      this.performanceData = await fetchStudentPerformance();
      console.log('✅ 学生数据加载完成');
    },
    
    // 加载题目数据
    async loadQuestionData() {
      const [difficultyData, groupStats] = await Promise.all([
        fetchQuestionDifficulty(),
        fetchDifficultyGroupStats()
      ]);
      this.difficultyData = difficultyData;
      this.difficultyGroupData = groupStats;
      console.log('✅ 题目数据加载完成');
    },
    
    // 加载学习方法数据
    async loadMethodData() {
      const [methodData, efficiencyData] = await Promise.all([
        fetchMethodDistribution(),
        fetchLearningMethods()
      ]);
      this.methodData = methodData;
      this.efficiencyData = efficiencyData;
      console.log('✅ 学习方法数据加载完成');
    },
    async loadNewAnalysisData() {
      const [sunburstData, radarData] = await Promise.all([
        fetchKnowledgeSunburst(),
        fetchMethodRadar()
      ]);
      this.knowledgeSunburstData = sunburstData;
      this.methodRadarData = radarData;
      console.log('✅ 新增分析数据加载完成');
    },
    // 加载学习轨迹数据
    async loadLearningTrajectoryData() {
      const [progressData, weeklyData] = await Promise.all([
        fetchLearningProgress(),
        fetchWeeklyProgress()
      ]);
      this.progressData = progressData;
      this.weeklyData = weeklyData;
      console.log('✅ 学习轨迹数据加载完成');
    }
  }
};
</script>

<style lang="less" scoped>
.dashboard-root {
  background: linear-gradient(135deg, #0c0c1d 0%, #161632 100%);
  min-height: 100vh;
  overflow-y: auto;
  color: #fff;
  font-family: 'Microsoft YaHei', sans-serif;
  position: relative;
}

/* 头部样式 */
.top-header {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, rgba(0, 21, 41, 0.9) 0%, rgba(0, 42, 82, 0.9) 100%);
  border-bottom: 2px solid rgba(0, 234, 255, 0.3);
  box-shadow: 0 5px 15px rgba(0, 234, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  .title-text {
    font-size: 32px;
    font-weight: bold;
    margin: 0 40px;
    color: #00eaff;
    text-shadow: 0 0 15px rgba(0, 234, 255, 0.7),
                 0 0 30px rgba(0, 234, 255, 0.3);
    background: linear-gradient(90deg, #00eaff, #00b3ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
  }
}

/* 主内容区域 */
.main-content {
  padding: 30px;
  max-width: 2400px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
}

/* 模块样式 */
.module-section {
  margin-bottom: 40px;
  padding: 25px;
  background: rgba(10, 15, 35, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(0, 234, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 234, 255, 0.4);
    box-shadow: 0 12px 40px rgba(0, 234, 255, 0.1);
  }
}

.module-title {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(0, 234, 255, 0.3);
  
  span {
    margin-left: 15px;
    font-size: 24px;
    font-weight: bold;
    color: #00eaff;
    text-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
  }
}

/* 通用网格布局系统 */
.module-grid {
  display: grid;
  gap: 25px;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* 时间行为分析 - 专门的2x2网格布局 */
.time-behavior-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.time-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

/* 卡片样式 */
.module-card {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 234, 255, 0.2);
  }
}

.chart-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  h3 {
    margin: 0 0 20px 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #83bff6;
    font-size: 18px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    border-left: 4px solid #00eaff;
    padding-left: 15px;
  }
  
  .chart-container {
    flex: 1;
    min-height: 0;
  }
}

/* 占位符样式 */
.placeholder-text {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #83bff6;
  font-size: 16px;
  font-style: italic;
  background: rgba(0, 0, 0, 0.3);
  border: 2px dashed rgba(131, 191, 246, 0.3);
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 1600px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .time-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1200px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }
  
  .time-row {
    grid-template-columns: 1fr;
  }
  
  .top-header .title-text {
    font-size: 24px;
    margin: 0 20px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }
  
  .module-section {
    padding: 15px;
    margin-bottom: 25px;
  }
}

/* 滚动条美化 */
.dashboard-root::-webkit-scrollbar {
  width: 10px;
}

.dashboard-root::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.dashboard-root::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00eaff, #00b3ff);
  border-radius: 5px;
}

.dashboard-root::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #00b3ff, #0088cc);
}

/* 加载动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.module-section {
  animation: fadeIn 0.5s ease-out forwards;
}

/* 为每个模块添加延迟动画 */
.module-section:nth-child(1) { animation-delay: 0.1s; }
.module-section:nth-child(2) { animation-delay: 0.2s; }
.module-section:nth-child(3) { animation-delay: 0.3s; }
.module-section:nth-child(4) { animation-delay: 0.4s; }
.module-section:nth-child(5) { animation-delay: 0.5s; }
.module-section:nth-child(6) { animation-delay: 0.6s; }
.module-section:nth-child(7) { animation-delay: 0.7s; }
</style>