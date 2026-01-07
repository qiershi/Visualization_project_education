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


    </div>
  </dv-full-screen-container>
</template>

<script>
import { fetchBasicStatistics, fetchStateDistribution  } from '../js/dataService.js';
import BasicKpi from '../components/BasicKpi.vue';
import StateAnalysis from '../components/StateAnalysis.vue';

export default {
	name: 'DashboardView', 
	components: { BasicKpi, StateAnalysis },
	data() {
		return {
			basicStats: {} ,
			stateData: []
		};
	},
	async mounted() {
		try {
			this.stateData = await fetchStateDistribution();
			this.basicStats = await fetchBasicStatistics();
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
