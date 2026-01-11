<template>
  <div class="kpi-wrapper">
    <div class="kpi-item">
      <dv-decoration-9 style="width:150px;height:150px;" :dur="5">
        <div class="kpi-content" @click="showOverview">
          <p>总记录</p>
          <dv-digital-flop :config="flopConfig(stats.totalRecords)" style="width:100px;height:30px;" />
        </div>
      </dv-decoration-9>
    </div>

    <div class="kpi-item">
      <div class="chart-title">整体正确率</div>
      <dv-water-level-pond :config="waterConfig" style="width:120px;height:120px;" />
    </div>

    <div class="kpi-item">
      <div class="chart-title">快速答题(1-9s)占比</div>
      <dv-capsule-chart :config="capsuleConfig" style="width:200px;height:120px;" />
    </div>

    <!-- 数据概览弹窗 -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <span>数据概览</span>
          <button class="close-btn" @click="closePopup">×</button>
        </div>
        <div class="popup-body">
          <p>• 总答题记录: {{ stats.totalRecords }} 条</p>
          <p>• 参与学生数: {{ stats.totalStudents }} 人</p>
          <p>• 题目数量: {{ stats.totalQuestions }} 道</p>
          <p>• 整体正确率: {{ stats.overallAccuracy }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicKpi',
  props: {
    stats: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 数字翻牌器配置
    flopConfig() {
      return (val) => ({
        number: [val || 0],
        content: '{nt}',
        style: { fill: '#00eaff', fontSize: 20, fontWeight: 'bold' }
      });
    },
    // 水位图配置
    waterConfig() {
      return {
        data: [this.stats.overallAccuracy || 0],
        shape: 'roundRect',
        waveHeight: 10,
        waveNum: 2
      };
    },
    // 简单对比配置
    capsuleConfig() {
      return {
        data: [
          { name: '快速答题', value: parseFloat(this.stats.shortTimePercent) || 0 },
          { name: '常规答题', value: 100 - (parseFloat(this.stats.shortTimePercent) || 0) }
        ],
        colors: ['#e062ae', '#37a2da'],
        unit: '%'
      };
    }
  }
};
</script>

<style scoped>
.kpi-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
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
</style>
