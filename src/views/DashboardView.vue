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
              <div class="kpi-wrapper">
                <!-- 第一行: 总记录 & 整体正确率 -->
                <div class="kpi-main-row">
                  <div class="kpi-item main-item">
                    <dv-decoration-9 style="width:150px;height:150px;" :dur="5">
                      <div class="kpi-content" @click="showOverview">
                        <p>总记录</p>
                        <dv-digital-flop :config="flopConfig(basicStats.totalRecords, 22)" style="width:110px;height:35px;" />
                      </div>
                    </dv-decoration-9>
                  </div>
                  <div class="kpi-item main-item">
                    <div class="chart-title">整体正确率</div>
                    <dv-water-level-pond :config="waterConfig" style="width:120px;height:120px;" />
                  </div>
                </div>

                <!-- 第二行: 学生数 & 题目数 -->
                <div class="kpi-sub-row">
                  <div class="kpi-item sub-item">
                    <dv-decoration-11 style="width:160px;height:60px;">
                      <div class="sub-kpi-box">
                        <span class="label">学生数</span>
                        <dv-digital-flop :config="flopConfig(basicStats.totalStudents, 18)" style="width:70px;height:25px;" />
                        <span class="unit">人</span>
                      </div>
                    </dv-decoration-11>
                  </div>
                  <div class="kpi-item sub-item">
                    <dv-decoration-11 style="width:160px;height:60px;">
                      <div class="sub-kpi-box">
                        <span class="label">题目数</span>
                        <dv-digital-flop :config="flopConfig(basicStats.totalQuestions, 18)" style="width:70px;height:25px;" />
                        <span class="unit">道</span>
                      </div>
                    </dv-decoration-11>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>答题状态分布</h3>
              <StateAnalysis :data="stateData" @state-click="handleStateClick" />
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
                <h3>快速答题占比</h3>
                <ShortTimeChart :data="shortTimeData" :basicStats="basicStats" :compactMode="true" />
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
        <div class="module-grid grid-2">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>班级排名</h3>
              <ClassRankChart :data="classData" :comparisonData="comparisonData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>班级综合效能</h3>
              <ClassEfficiencyRadar :data="comparisonData" />
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
        <div class="module-grid grid-2">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>难度排行榜</h3>
              <QuestionAnalysis :difficultyData="difficultyData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>题目维度透视</h3>
              <QuestionParallelChart :data="difficultyData" />
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
              <KnowledgeSunburst :data="knowledgeSunburstData" @node-click="handleKnowledgeClick" />
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
        <div class="module-grid grid-2">
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>方法使用分布</h3>
              <MethodConicalChart :data="methodData" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>方法效率分析</h3>
              <MethodEfficiencyChart :data="efficiencyData" @method-click="handleMethodClick" />
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="module-card">
            <div class="chart-box">
              <h3>各解题方法效能图示</h3>
              <MethodCompareBubble :data="efficiencyData" />
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
    
    <!-- 数据概览弹窗 - 深度视觉重构版 -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content popup-overview-panel" @click.stop>
        <div class="popup-header">
          <div class="header-indicator"></div>
          <span>核心指标深度透视</span>
          <button class="close-btn" @click="closePopup">×</button>
        </div>
        <div class="popup-body">
          <div class="metrics-grid">
            <!-- 总记录 -->
            <div class="metric-card gold">
              <dv-decoration-2 style="width:100px;height:5px;" />
              <div class="metric-label">总答题记录</div>
              <div class="metric-value">
                <dv-digital-flop :config="flopConfig(basicStats.totalRecords, 28)" style="width:180px;height:40px;" />
              </div>
              <div class="metric-unit">RECORDS</div>
            </div>

            <!-- 参与学生 -->
            <div class="metric-card blue">
              <dv-decoration-2 style="width:100px;height:5px;" />
              <div class="metric-label">参与学生数</div>
              <div class="metric-value">
                <dv-digital-flop :config="flopConfig(basicStats.totalStudents, 28)" style="width:180px;height:40px;" />
              </div>
              <div class="metric-unit">STUDENTS</div>
            </div>

            <!-- 题目数量 -->
            <div class="metric-card green">
              <dv-decoration-2 style="width:100px;height:5px;" />
              <div class="metric-label">覆盖题目数</div>
              <div class="metric-value">
                <dv-digital-flop :config="flopConfig(basicStats.totalQuestions, 28)" style="width:180px;height:40px;" />
              </div>
              <div class="metric-unit">QUESTIONS</div>
            </div>

            <!-- 整体正确率 -->
            <div class="metric-card pink">
              <dv-decoration-2 style="width:100px;height:5px;" />
              <div class="metric-label">全站平均正确率</div>
              <div class="metric-value">
                <span class="custom-value">{{ basicStats.overallAccuracy }}<small>%</small></span>
              </div>
              <dv-percent-pond :config="{value: basicStats.overallAccuracy, colors: ['#e062ae', '#fb7293']}" style="width:100px;height:20px;margin-top:10px;" />
            </div>
          </div>
          
          <div class="bottom-decoration">
            <dv-decoration-10 style="width:100%;height:5px;" />
            <div class="timestamp">数据实时同步中 · {{ new Date().toLocaleDateString() }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 知识点放大弹窗 -->
    <div v-if="showKnowledgePopup" class="popup-overlay" @click="closeKnowledgePopup">
      <div class="popup-content popup-large-view" @click.stop>
        <div class="popup-header">
          <div class="header-title">
            <dv-decoration-11 style="width:200px;height:40px;">
              <span style="color:#00eaff;font-weight:bold;">知识点深度分析</span>
            </dv-decoration-11>
            <span class="node-name">{{ selectedKnowledgeNode ? selectedKnowledgeNode.name : '' }}</span>
          </div>
          <button class="close-btn" @click="closeKnowledgePopup">×</button>
        </div>
        <div class="popup-body horizontal-layout">
          <!-- 左侧：统计与标签 -->
          <div class="side-info-panel">
            <div class="stat-cards-vertical">
              <div class="stat-card-mini">
                <div class="stat-label">掌握程度</div>
                <div class="stat-value" :style="{color: '#fac858'}">{{ selectedKnowledgeNode ? selectedKnowledgeNode.掌握程度 : 'N/A' }}</div>
                <dv-decoration-3 style="width:100%;height:15px;" />
              </div>
              <div class="stat-card-mini">
                <div class="stat-label">平均正确率</div>
                <div class="stat-value" :style="{color: '#00eaff'}">{{ selectedKnowledgeNode ? selectedKnowledgeNode.正确率 + '%' : 'N/A' }}</div>
                <dv-decoration-3 style="width:100%;height:15px;" />
              </div>
            </div>

            <div class="tags-section" v-if="selectedKnowledgeNode && selectedKnowledgeNode.children">
              <div class="section-title">
                <dv-decoration-6 style="width:150px;height:20px;" />
                <span>包含子知识点</span>
              </div>
              <div class="sub-knowledge-tags-scroll">
                <span v-for="child in selectedKnowledgeNode.children" :key="child.name" class="kb-tag-premium">
                  <span class="tag-dot"></span>
                  <span class="tag-name">{{ child.name }}</span>
                  <span class="tag-score">{{ child.正确率 }}%</span>
                </span>
              </div>
            </div>
          </div>

          <!-- 右侧：核心图表 -->
          <div class="main-chart-panel">
            <div class="large-sunburst-wrapper">
              <div ref="largeSunburstRef" style="width: 100%; height: 650px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 状态分布放大弹窗 -->
    <div v-if="showStatePopup" class="popup-overlay" @click="closeStatePopup">
      <div class="popup-content popup-large" @click.stop>
        <div class="popup-header">
          <span>答题状态详情：{{ selectedStateNode ? selectedStateNode.name : '' }}</span>
          <button class="close-btn" @click="closeStatePopup">×</button>
        </div>
        <div class="popup-body">
          <div class="state-details">
            <div class="detail-item">
              <label>状态类型：</label>
              <span>{{ selectedStateNode ? selectedStateNode.name : 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>数量：</label>
              <span>{{ selectedStateNode ? selectedStateNode.value : 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>占比：</label>
              <span>{{ selectedStateNode ? ((selectedStateNode.value / stateData.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(2) + '%' : 'N/A' }}</span>
            </div>
          </div>
          <div class="large-state-container">
            <div ref="largeStateRef" style="width: 100%; height: 500px;"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 方法效率放大弹窗 -->
    <div v-if="showMethodPopup" class="popup-overlay" @click="closeMethodPopup">
      <div class="popup-content popup-large" @click.stop>
        <div class="popup-header">
          <span>学习方法掌握详情：{{ selectedMethodNode ? selectedMethodNode.name : '' }}</span>
          <button class="close-btn" @click="closeMethodPopup">×</button>
        </div>
        <div class="popup-body">
          <div class="method-details">
            <div class="detail-item">
              <label>方法名称：</label>
              <span>{{ selectedMethodNode ? selectedMethodNode.name : 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>正确率：</label>
              <span>{{ selectedMethodNode ? selectedMethodNode.value + '%' : 'N/A' }}</span>
            </div>
            <div class="detail-item">
              <label>方法类型：</label>
              <span>{{ selectedMethodNode ? (selectedMethodNode.name.includes('法') ? '解题方法' : selectedMethodNode.name.includes('思想') ? '思维方法' : '通用方法') : 'N/A' }}</span>
            </div>
          </div>
          <div class="large-method-container">
            <div ref="largeMethodRef" style="width: 100%; height: 500px;"></div>
          </div>
        </div>
      </div>
    </div>
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
import ClassEfficiencyRadar from '../components/ClassEfficiencyRadar.vue';
import MethodCompareBubble from '../components/MethodCompareBubble.vue';
import QuestionParallelChart from '../components/QuestionParallelChart.vue';
import * as echarts from 'echarts';

export default {
  name: 'DashboardView',
  components: { 
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
    KnowledgeSunburst,   
    MethodRadar,
    ClassEfficiencyRadar,
    MethodCompareBubble,
    QuestionParallelChart
  },
  data() {
    return {
      // 数据概览模块
      basicStats: {},
      stateData: [],
      showPopup: false,
      
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
      weeklyData: [],
      // 知识点放大弹窗相关
      showKnowledgePopup: false,
      selectedKnowledgeNode: null,
      largeSunburstChart: null,
      // 状态分布放大弹窗相关
      showStatePopup: false,
      selectedStateNode: null,
      largeStateChart: null,
      // 方法效率放大弹窗相关
      showMethodPopup: false,
      selectedMethodNode: null,
      largeMethodChart: null
    };
  },
  computed: {
    // 数字翻牌器配置
    flopConfig() {
      return (val, size = 20) => ({
        number: [val || 0],
        content: '{nt}',
        style: { fill: '#00eaff', fontSize: size, fontWeight: 'bold' }
      });
    },
    // 水位图配置
    waterConfig() {
      return {
        data: [this.basicStats.overallAccuracy || 0],
        shape: 'roundRect',
        waveHeight: 10,
        waveNum: 2
      };
    },
    // 胶囊图配置
    capsuleConfig() {
      const shortTimePercent = parseFloat(parseFloat(this.basicStats.shortTimePercent).toFixed(1)) || 0;
      const regularPercent = parseFloat((100 - shortTimePercent).toFixed(1));
      
      return {
        data: [
          { name: `快速答题 ${shortTimePercent}%`, value: shortTimePercent },
          { name: `常规答题 ${regularPercent}%`, value: regularPercent }
        ],
        colors: ['#e062ae', '#37a2da'],
        maxValue: 100,
        dataType: ['percent', 'percent'],
        unit: '%',
        // 不显示轴标签以节省空间
        axisLabel: {
          show: false
        },
        // 隐藏坐标轴刻度
        axisTick: {
          show: false
        },
        // 隐藏坐标轴线
        axisLine: {
          show: false
        },
        // 减少柱子宽度以适应紧凑空间
        columnWidth: 40,
        columnGap: 10
      };
    }
  },
  async mounted() {
    // 将echarts挂载到实例上
    this.$options.echarts = echarts;
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
    // 显示数据概览弹窗
    showOverview() {
      console.log('Show overview clicked');
      console.log('Basic stats:', this.basicStats);
      if (this.basicStats && Object.keys(this.basicStats).length > 0) {
        console.log('Showing popup with data:', this.basicStats);
        this.showPopup = true;
      } else {
        console.log('No data available yet');
      }
    },
    
    // 关闭数据概览弹窗
    closePopup() {
      this.showPopup = false;
    },
    
    // 处理知识点点击事件
    handleKnowledgeClick(node) {
      this.selectedKnowledgeNode = node;
      this.showKnowledgePopup = true;
      // 延迟渲染大图，确保DOM已更新
      this.$nextTick(() => {
        setTimeout(() => {
          this.renderLargeSunburst();
        }, 100);
      });
    },
    
    // 处理状态点击事件
    handleStateClick(node) {
      this.selectedStateNode = node;
      this.showStatePopup = true;
      // 延迟渲染大图，确保DOM已更新
      this.$nextTick(() => {
        setTimeout(() => {
          this.renderLargeStateChart();
        }, 100);
      });
    },
    
    // 处理方法点击事件
    handleMethodClick(node) {
      this.selectedMethodNode = node;
      this.showMethodPopup = true;
      // 延迟渲染大图，确保DOM已更新
      this.$nextTick(() => {
        setTimeout(() => {
          this.renderLargeMethodChart();
        }, 100);
      });
    },
    
    // 关闭知识点放大弹窗
    closeKnowledgePopup() {
      this.showKnowledgePopup = false;
      this.selectedKnowledgeNode = null;
      // 销毁大图表实例
      if (this.largeSunburstChart) {
        this.largeSunburstChart.dispose();
        this.largeSunburstChart = null;
      }
    },
    
    // 关闭状态分布放大弹窗
    closeStatePopup() {
      this.showStatePopup = false;
      this.selectedStateNode = null;
      // 销毁大图表实例
      if (this.largeStateChart) {
        this.largeStateChart.dispose();
        this.largeStateChart = null;
      }
    },
    
    // 关闭方法效率放大弹窗
    closeMethodPopup() {
      this.showMethodPopup = false;
      this.selectedMethodNode = null;
      // 销毁大图表实例
      if (this.largeMethodChart) {
        this.largeMethodChart.dispose();
        this.largeMethodChart = null;
      }
    },
    
    // 渲染放大后的知识分布图（增强美化版）
    renderLargeSunburst() {
      this.$nextTick(() => {
        if (!this.showKnowledgePopup || !this.selectedKnowledgeNode || !this.$refs.largeSunburstRef) return;
        
        if (this.largeSunburstChart) {
          this.largeSunburstChart.dispose();
        }
        
        const chart = this.largeSunburstChart = echarts.init(this.$refs.largeSunburstRef);
        
        // 创建选中节点及其子树的数据结构
        let displayData = [];
        if (this.selectedKnowledgeNode.children && this.selectedKnowledgeNode.children.length > 0) {
          displayData = [{
            name: this.selectedKnowledgeNode.name,
            children: this.selectedKnowledgeNode.children,
            itemStyle: { 
              color: this.selectedKnowledgeNode.color,
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }];
        } else {
          displayData = [{
            name: this.selectedKnowledgeNode.name,
            value: this.selectedKnowledgeNode.value || 1,
            itemStyle: { color: this.selectedKnowledgeNode.color },
            ...this.selectedKnowledgeNode
          }];
        }
        
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              if (params.data) {
                const mastery = params.data.掌握程度 || 0;
                const accuracy = params.data.正确率 || 0;
                return `<div style="padding: 10px;">
                  <div style="font-size: 16px; font-weight: bold; color: #00eaff; margin-bottom: 8px;">${params.name}</div>
                  <div style="font-size: 14px; color: #fff; margin-bottom: 4px;">
                    <span style="color: #fac858;">●</span> 掌握程度: <strong style="font-size:16px">${mastery}</strong>
                  </div>
                  <div style="font-size: 14px; color: #fff;">
                    <span style="color: #5470c6;">●</span> 正确率: <strong style="font-size:16px">${accuracy}%</strong>
                  </div>
                </div>`;
              }
              return '';
            },
            backgroundColor: 'rgba(0, 20, 40, 0.9)',
            borderColor: '#00eeff',
            borderWidth: 2,
            textStyle: { color: '#fff' },
            extraCssText: 'box-shadow: 0 0 20px rgba(0, 234, 255, 0.4); border-radius: 8px;'
          },
          series: {
            type: 'sunburst',
            data: displayData,
            radius: [0, '90%'],
            center: ['50%', '50%'],
            sort: undefined,
            emphasis: {
              focus: 'ancestor',
              itemStyle: {
                shadowBlur: 25,
                shadowColor: 'rgba(0, 234, 255, 0.7)',
                borderWidth: 2,
                borderColor: '#fff'
              }
            },
            label: {
              rotate: 'radial',
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 4
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#030409',
              borderRadius: 8
            },
            levels: [
              {},
              {
                r0: 0,
                r: '35%',
                itemStyle: { 
                  borderWidth: 5,
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.6)'
                },
                label: { 
                  align: 'center',
                  fontSize: 18,
                  fontWeight: 'bold'
                }
              },
              {
                r0: '35%',
                r: '70%',
                itemStyle: {
                  borderWidth: 3,
                  opacity: 0.95
                },
                label: {
                  align: 'right',
                  fontSize: 14
                }
              },
              {
                r0: '70%',
                r: '95%',
                itemStyle: {
                  borderWidth: 2,
                  opacity: 0.85
                },
                label: {
                  position: 'outside',
                  fontSize: 12,
                  color: '#83bff6'
                }
              }
            ],
            animationType: 'expansion',
            animationDuration: 1200,
            animationEasing: 'elasticOut'
          }
        };
        
        chart.setOption(option);
        
        const resizeHandler = () => chart.resize();
        window.addEventListener('resize', resizeHandler);
        
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', resizeHandler);
        });
      });
    },
    
    // 渲染放大后的状态分布图（旭日图）
    renderLargeStateChart() {
      this.$nextTick(() => {
        if (!this.showStatePopup || !this.selectedStateNode || !this.$refs.largeStateRef) return;
        
        // 如果已有实例，先销毁
        if (this.largeStateChart) {
          this.largeStateChart.dispose();
        }
        
        const chart = this.largeStateChart = echarts.init(this.$refs.largeStateRef);
        
        // 获取当前状态数据用于大图显示
        const stateData = this.stateData || [];
        
        // 构建旭日图数据结构 - 添加分类层级
        const sunburstData = [
          {
            name: '答题状态总览',
            children: stateData.map(item => ({
              name: item.state,
              value: item.count,
              itemStyle: {
                color: this.getStateColor(item.state)
              },
              label: {
                formatter: '{b}\n{c}'
              }
            }))
          }
        ];
        
        const option = {
          title: {
            text: `答题状态详情：${this.selectedStateNode.name}`,
            left: 'center',
            textStyle: { 
              color: '#00eaff', 
              fontSize: 20,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 234, 255, 0.5)',
              textShadowBlur: 10
            },
            top: 20
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              if (params.data && params.data.value) {
                const total = stateData.reduce((sum, item) => sum + item.count, 0);
                const percentage = ((params.data.value / total) * 100).toFixed(2);
                return `${params.name}<br/>数量: ${params.data.value}<br/>占比: ${percentage}%`;
              }
              return params.name;
            },
            backgroundColor: 'rgba(0,20,40,0.9)',
            borderColor: '#00eeff',
            borderWidth: 1,
            textStyle: {
              color: '#fff'
            }
          },
          series: [{
            name: '答题状态',
            type: 'sunburst',
            radius: [0, '85%'],
            center: ['50%', '55%'],
            data: sunburstData,
            sort: undefined,
            label: {
              rotate: 'radial',
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 2
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#030409',
              borderRadius: 5,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            levels: [
              {},
              {
                r0: 0,
                r: '30%',
                itemStyle: { 
                  borderWidth: 4,
                  borderColor: '#030409'
                },
                label: { 
                  align: 'center',
                  fontSize: 16,
                  fontWeight: 'bold'
                }
              },
              {
                r0: '30%',
                r: '85%',
                itemStyle: {
                  borderWidth: 2,
                  borderColor: '#030409'
                },
                label: {
                  align: 'right',
                  fontSize: 14
                }
              }
            ],
            emphasis: {
              focus: 'ancestor',
              itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 234, 255, 0.5)',
                borderWidth: 4,
                borderColor: '#00eaff'
              }
            }
          }]
        };
        
        chart.setOption(option);
        
        // 监听窗口大小变化
        const resizeHandler = () => chart.resize();
        window.addEventListener('resize', resizeHandler);
        
        // 在弹窗关闭时移除监听器
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', resizeHandler);
          if (this.largeStateChart) {
            this.largeStateChart.dispose();
          }
        });
      });
    },
    
    // 渲染放大后的学习方法效率图
    renderLargeMethodChart() {
      this.$nextTick(() => {
        if (!this.showMethodPopup || !this.selectedMethodNode || !this.$refs.largeMethodRef) return;
        
        // 如果已有实例，先销毁
        if (this.largeMethodChart) {
          this.largeMethodChart.dispose();
        }
        
        const chart = this.largeMethodChart = echarts.init(this.$refs.largeMethodRef);
        
        // 获取当前方法数据用于大图显示
        const methodData = this.efficiencyData || [];
        
        const option = {
          title: {
            text: `学习方法掌握详情：${this.selectedMethodNode.name}`,
            left: 'center',
            textStyle: { 
              color: '#00eaff', 
              fontSize: 18,
              fontWeight: 'bold'
            },
            top: 20
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
            data: methodData.map(item => ({
              value: item.accuracy,
              name: item.name,
              itemStyle: {
                color: this.getMethodColor(item.name),
                shadowBlur: 8,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            })),
            radius: [0, '85%'],
            sort: undefined,
            label: {
              rotate: 'radial',
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 2
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#030409',
              borderRadius: 5
            },
            levels: [
              {},
              {
                r0: 0,
                r: '45%',
                itemStyle: { 
                  borderWidth: 4,
                  borderColor: '#030409',
                  borderRadius: 7
                },
                label: { 
                  align: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#fff'
                }
              },
              {
                r0: '45%',
                r: '75%',
                label: { 
                  position: 'outside',
                  padding: [5, 0, 0, 0],
                  fontSize: 14,
                  color: '#fff',
                  textShadowColor: 'rgba(0, 0, 0, 0.8)',
                  textShadowBlur: 2
                },
                itemStyle: { 
                  borderWidth: 3,
                  borderColor: '#030409',
                  borderRadius: 5
                }
              }
            ],
            emphasis: {
              focus: 'ancestor',
              itemStyle: {
                shadowBlur: 15,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              }
            },
            animation: true
          }
        };
        
        chart.setOption(option);
        
        // 监听窗口大小变化
        const resizeHandler = () => chart.resize();
        window.addEventListener('resize', resizeHandler);
        
        // 在弹窗关闭时移除监听器
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', resizeHandler);
          if (this.largeMethodChart) {
            this.largeMethodChart.dispose();
          }
        });
      });
    },
    
    // 根据方法获取颜色
    getMethodColor(method) {
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
      if (!colorMap[method]) {
        let hash = 0;
        for (let i = 0; i < method.length; i++) {
          hash = method.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const colors = [
          '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
          '#5470c6', '#fac858', '#ee6666', '#91cc75', '#72c1d3'
        ];
        
        return colors[Math.abs(hash) % colors.length];
      }
      
      return colorMap[method];
    },
    
    // 根据状态获取颜色
    getStateColor(state) {
      const colorMap = {
        '正确': '#5470c6',
        '错误': '#ee6666',
        '部分正确': '#fac858',
        '未作答': '#91cc75',
        '超时未答': '#72c1d3',
        '格式错误': '#f9c440',
        '计算错误': '#f2838f',
        '概念错误': '#8378ea',
        '理解错误': '#a0a7e6',
        '粗心错误': '#ff9c6e'
      };
      return colorMap[state] || this.getDefaultColorByIndex(state);
    },
    
    // 根据索引获取默认颜色
    getDefaultColorByIndex(state) {
      // 为未知状态生成一致的颜色
      let hash = 0;
      for (let i = 0; i < state.length; i++) {
        hash = state.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      const colors = [
        '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
        '#5470c6', '#fac858', '#ee6666', '#91cc75', '#72c1d3'
      ];
      
      return colors[Math.abs(hash) % colors.length];
    },
    
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

/* 核心指标总览样式 */
.kpi-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 280px;
  padding: 10px 0;
  gap: 15px;
}

.kpi-main-row {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.kpi-sub-row {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 5px;
}

.kpi-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-kpi-box {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #83bff6;
  font-size: 14px;
}

.sub-kpi-box .unit {
  font-size: 12px;
  opacity: 0.8;
}

.chart-title {
  margin-bottom: 10px;
  color: #00eaff;
  font-weight: bold;
}

.kpi-content {
  cursor: pointer;
}

.kpi-content:hover {
  opacity: 0.8;
}

/* 弹窗遮罩层 - 核心定位修复 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85); /* 调深背景 */
  backdrop-filter: blur(8px); /* 磨砂玻璃效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* 确保在最上层 */
}

/* 弹窗内容基础容器 */
.popup-content {
  background: linear-gradient(135deg, #0a1222, #1a2a4a);
  border: 1px solid #00eeff;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 234, 255, 0.3);
  max-width: 95vw;
  max-height: 95vh;
  padding: 30px;
  color: white;
  position: relative;
  overflow-y: auto;
  animation: popupFadeIn 0.3s ease-out;
}

@keyframes popupFadeIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 234, 255, 0.3);
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 234, 255, 0.5);
  color: #00eaff;
  font-size: 28px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  z-index: 10;
}

.close-btn:hover {
  background: #ff4d4f;
  color: #fff;
  border-color: #ff4d4f;
  transform: rotate(90deg);
}

/* 数据概览弹窗专用宽度扩展 */
.popup-overview-panel {
  width: 650px !important;
}

.header-indicator {
  width: 15px;
  height: 15px;
  background: #00eaff;
  margin-right: 15px;
  box-shadow: 0 0 10px #00eaff;
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.metric-card {
  height: 160px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  opacity: 0.5;
}

.metric-card.gold::before { background: #fac858; box-shadow: 0 0 10px #fac858; }
.metric-card.blue::before { background: #5470c6; box-shadow: 0 0 10px #5470c6; }
.metric-card.green::before { background: #91cc75; box-shadow: 0 0 10px #91cc75; }
.metric-card.pink::before { background: #fb7293; box-shadow: 0 0 10px #fb7293; }

.metric-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(1.02);
  border-color: rgba(0, 234, 255, 0.3);
}

.metric-label {
  font-size: 14px;
  color: #83bff6;
  margin: 15px 0 5px;
}

.metric-value {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.custom-value {
  font-size: 32px;
  font-weight: bold;
  color: #fb7293;
  text-shadow: 0 0 15px rgba(251, 114, 147, 0.5);
}

.custom-value small {
  font-size: 16px;
  margin-left: 2px;
}

.metric-unit {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 2px;
  font-family: 'Courier New', Courier, monospace;
}

.bottom-decoration {
  margin-top: 30px;
  text-align: center;
}

.timestamp {
  font-size: 12px;
  color: rgba(0, 234, 255, 0.5);
  margin-top: 10px;
  font-style: italic;
}

/* 兼容之前的样式 */
.popup-header span {
  font-size: 18px;
  font-weight: bold;
  color: #00eaff;
  flex: 1;
}

.close-btn {
  background: none;
  border: none;
  color: #00eaff;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-body p {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
}

.popup-large {
  width: 80vw;
  height: 80vh;
  max-width: 1200px;
  max-height: 800px;
}

.knowledge-details {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #00eeff;
}

.detail-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.detail-item label {
  font-weight: bold;
  color: #00eaff;
  min-width: 100px;
}

.detail-item span {
  color: #fff;
  flex: 1;
}

.sub-knowledge-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 20px;
  flex: 1;
}

.sub-knowledge-list li {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(0, 238, 255, 0.3);
}

.sub-detail {
  color: #83bff6;
  font-size: 12px;
}

.large-sunburst-container {
  height: 500px;
  width: 100%;
}

.state-details {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #00eeff;
}

.large-state-container {
  height: 500px;
  width: 100%;
}

.method-details {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #00eeff;
}

.large-method-container {
  height: 500px;
  width: 100%;
}

.kpi-item {
  text-align: center;
  color: #fff;
}

.kpi-content p {
  margin: 0;
  font-size: 14px;
  color: #83bff6;
}

.chart-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: #00eaff;
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

/* 弹窗高级布局样式 */
.popup-large-view {
  width: 1200px !important;
  max-width: 95vw;
  background: linear-gradient(135deg, #0a1222, #162a4a) !important;
  border: 1px solid #00eeff !important;
  box-shadow: 0 0 40px rgba(0, 234, 255, 0.3) !important;
}

.horizontal-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  padding: 10px 0;
}

/* 左侧面板 */
.side-info-panel {
  width: 350px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.stat-cards-vertical {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-card-mini {
  background: rgba(255, 255, 255, 0.05);
  border-left: 4px solid #00eaff;
  border-radius: 4px 12px 12px 4px;
  padding: 15px 20px;
  backdrop-filter: blur(5px);
  transition: all 0.3s;
}

.stat-card-mini:hover {
  background: rgba(0, 234, 255, 0.1);
  transform: translateX(5px);
}

.stat-card-mini .stat-label {
  font-size: 14px;
  color: #83bff6;
  margin-bottom: 5px;
}

.stat-card-mini .stat-value {
  font-size: 28px;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
}

/* 标签区域滚动优化 */
.tags-section {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #00eaff;
  font-weight: bold;
}

.sub-knowledge-tags-scroll {
  max-height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;
}

.sub-knowledge-tags-scroll::-webkit-scrollbar {
  width: 4px;
}

.sub-knowledge-tags-scroll::-webkit-scrollbar-thumb {
  background: #00eaff;
  border-radius: 2px;
}

/* 标签精品样式 */
.kb-tag-premium {
  background: rgba(0, 234, 255, 0.05);
  border: 1px solid rgba(0, 234, 255, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
}

.kb-tag-premium:hover {
  background: rgba(0, 234, 255, 0.15);
  border-color: #00eaff;
  box-shadow: 0 0 15px rgba(0, 234, 255, 0.2);
}

.tag-dot {
  width: 8px;
  height: 8px;
  background: #00eaff;
  border-radius: 50%;
  box-shadow: 0 0 8px #00eaff;
}

.tag-name {
  flex: 1;
  margin-left: 12px;
  color: #fff;
  font-size: 14px;
}

.tag-score {
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 8px;
  border-radius: 4px;
  color: #fac858;
  font-size: 12px;
  font-family: 'Courier New', Courier, monospace;
}

/* 右侧面板 */
.main-chart-panel {
  flex: 1;
  min-width: 0;
  background: radial-gradient(circle at center, rgba(0, 234, 255, 0.05) 0%, transparent 70%);
  border-radius: 20px;
  overflow: hidden;
}

.large-sunburst-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1200px) {
  .popup-large-view {
    width: 95vw !important;
  }
  .horizontal-layout {
    flex-direction: column;
  }
  .side-info-panel {
    width: 100%;
    flex-direction: row;
  }
  .stat-cards-vertical {
    flex-direction: row;
    width: 50%;
  }
}

/* 恢复滚动条美化 */
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

/* 恢复加载动画 */
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

.module-section:nth-child(1) { animation-delay: 0.1s; }
.module-section:nth-child(2) { animation-delay: 0.2s; }
.module-section:nth-child(3) { animation-delay: 0.3s; }
.module-section:nth-child(4) { animation-delay: 0.4s; }
.module-section:nth-child(5) { animation-delay: 0.5s; }
.module-section:nth-child(6) { animation-delay: 0.6s; }
.module-section:nth-child(7) { animation-delay: 0.7s; }
</style>