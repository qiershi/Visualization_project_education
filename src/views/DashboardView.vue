<template>
<div class="dashboard-root">
  <dv-full-screen-container class="bg-container">
    <div class="top-header">
      <dv-decoration-8 style="width:300px;height:50px;" />
      <div class="title-text">教育行为深度可视分析平台</div>
      <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
    </div>

    <div class="main-content">
	<dv-border-box-12 class="grid-item">
		<div class="chart-box">
			<h3> 基础统计数据 </h3>
			<BasicKpi :stats="basicStats"/>
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-item">
		<div class="chart-box">
			<h3>答题状态分布 </h3>
			<StateAnalysis :data="stateData"/>			
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>短时间答题分布 </h3>
			<ShortTimeChart :data="shortTimeData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>班级答题数量分布 </h3>
			<ClassRankChart :data="classData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>学习方法分布 </h3>
			<MethodConicalChart :data="methodData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>班级对比数据 </h3>
			<ClassDetailChart :data="comparisonData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>学生表现数据 </h3>
			<StudentAnalysis :performanceData="performanceData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>学生分组统计 </h3>
			<ClassGroupChart :data="groupData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>小时活跃度 </h3>
			<HourlyActivityChart :data="activityData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>小时正确率 </h3>
			<HourlyAccuracyChart :data="accuracyData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>星期活跃度 </h3>
			<WeekdayRadarChart :data="weekActivityData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>题目难度分析 </h3>
			<QuestionAnalysis :difficultyData="difficultyData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>难度分组统计 </h3>
			<DifficultyGroupChart :data="difficultyGroupData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>学习进步轨迹 </h3>
			<LearningProgressChart :progressData="progressData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>周度学习进度 </h3>
			<WeeklyProgressChart :data="weeklyData" />
		</div>
	</dv-border-box-12>
	<dv-border-box-12 class="grid-box">
		<div class="chart-box">
			<h3>学习方法效率分析 </h3>
			<MethodEfficiencyChart :data="efficiencyData" />
		</div>
	</dv-border-box-12>

   </div>
  </dv-full-screen-container>
</div>
</template>

<script>
import { fetchBasicStatistics, fetchStateDistribution, fetchShortTimeDist, fetchClassDistribution, fetchMethodDistribution, fetchClassComparison, fetchStudentPerformance, fetchStudentGroupStats, fetchHourlyActivity, fetchHourlyAccuracy, fetchWeekdayActivity, fetchQuestionDifficulty, fetchDifficultyGroupStats, fetchLearningProgress, fetchWeeklyProgress, fetchLearningMethods  } from '../js/dataService.js';
import BasicKpi from '../components/BasicKpi.vue';
import StateAnalysis from '../components/StateAnalysis.vue';
import ShortTimeChart from '../components/ShortTimeChart.vue';
import ClassRankChart from '../components/ClassRankChart.vue';
import MethodConicalChart from '../components/MethodConicalChart.vue';
import ClassDetailChart from '../components/ClassDetailChart.vue';
import StudentAnalysis from '../components/StudentAnalysis.vue';
import ClassGroupChart from '../components/ClassGroupChart.vue';
import HourlyActivityChart from '../components/HourlyActivityChart.vue';
import HourlyAccuracyChart from '../components/HourlyAccuracyChart.vue';
import WeekdayRadarChart from '../components/WeekdayRadarChart.vue';
import QuestionAnalysis from '../components/QuestionAnalysis.vue';
import DifficultyGroupChart from '../components/DifficultyGroupChart.vue';
import LearningProgressChart from '../components/LearningProgressChart.vue';
import WeeklyProgressChart from '../components/WeeklyProgressChart.vue';
import MethodEfficiencyChart from '../components/MethodEfficiencyChart.vue';

export default {
	name: 'DashboardView', 
	components: { BasicKpi, StateAnalysis, ShortTimeChart, ClassRankChart, MethodConicalChart, ClassDetailChart, StudentAnalysis, ClassGroupChart, HourlyActivityChart, HourlyAccuracyChart, WeekdayRadarChart, QuestionAnalysis, DifficultyGroupChart, LearningProgressChart, WeeklyProgressChart, MethodEfficiencyChart },
	data() {
		return {
			basicStats: {} ,
			stateData: [], 
			shortTimeData: [],
			classData: [], 
			methodData: [],
			comparisonData: [], 
			performanceData: { topStudents: [], scatterData: [] }, 
			groupData: [],
			activityData: [], 
			accuracyData: [], 
			weekActivityData: [],
			difficultyData: { hardestQuestions: [], bubbleData: [] },
			difficultyGroupData: [], 
			progressData: [], 
			weeklyData: [], 
			efficiencyData: []
		};
	},
	async mounted() {
		try {
			this.stateData = await fetchStateDistribution();
			this.basicStats = await fetchBasicStatistics();
			this.shortTimeData = await fetchShortTimeDist();
			this.classData = await fetchClassDistribution();
			this.methodData = await fetchMethodDistribution();
			this.comparisonData = await fetchClassComparison();
			this.performanceData = await fetchStudentPerformance();
			this.groupData = await fetchStudentGroupStats();
			this.activityData = await fetchHourlyActivity();
			this.accuracyData = await fetchHourlyAccuracy();
			this.weekActivityData = await fetchWeekdayActivity();
			this.difficultyData = await fetchQuestionDifficulty();
			this.difficultyGroupData = await fetchDifficultyGroupStats();
			this.progressData = await fetchLearningProgress();
			this.weeklyData = await fetchWeeklyProgress();
			this.efficiencyData = await fetchLearningMethods();
		} catch (error) { 
			console.error("加载数据失败: ", error);
		}
	}
};
</script>

<style lang="less" scoped>
.bg {
  background-color: #030409;
  color: #fff;
}

.header {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.content {
  padding: 20px;
}

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
  height: 100%;
  display: grid;
  // 布局：4列 x 2行
  grid-template-columns: repeat(4, 1fr);
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

.dashboard-root {
  background-color: #000;
  /* 允许纵向滚动 */
  overflow-y: auto; 
  height: 100vh;
}
</style>
