<template>
  <div class="group-container">
    <div class="sub-title">班级平均正确率 (Top 表现)</div>
    <div ref="capsuleRef" style="width:100%;height:200px"></div>
    
    <div class="sub-title" style="margin-top:20px">班级平均答题规模</div>
    <div ref="barRef" style="width: 100%; height: 250px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ClassGroupChart',
  props: ['data'],
  data() {
    return {
      capsuleChart: null
    };
  },
  computed: {
    capsuleChartData() {
      // 提取正确率最高的前 5 个班级进行展示
      const topData = [...this.data]
        .sort((a, b) => b.平均正确率 - a.平均正确率)  // 简化排序逻辑
        .slice(0, 5)
        .map(item => ({
          name: item.班级,
          value: Number((item.平均正确率 * 100).toFixed(2)),  // 转换为百分比
          actualRate: item.平均正确率  // 保存原始正确率
        }));
      return topData;
    }
  },
  watch: {
    data: {
      handler() { 
        this.renderCapsuleChart();
        this.renderBarChart(); 
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderCapsuleChart();
      this.renderBarChart();
    });
  },
  methods: {
    renderCapsuleChart() {
      // 销毁之前的实例
      if (this.capsuleChart) {
        this.capsuleChart.dispose();
      }
      
      this.capsuleChart = echarts.init(this.$refs.capsuleRef);
      
      this.capsuleChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            // 查找完整数据项以显示完整的班级统计数据
            const fullItem = this.data.find(d => d.班级 === params.name);
            if (fullItem) {
              return `${fullItem.班级}<br/>` +
                     `正确率: ${(fullItem.平均正确率 * 100).toFixed(2)}%<br/>` +
                     `答题数: ${fullItem.平均答题次数.toFixed(1)}<br/>` +
                     `用时: ${fullItem.平均用时.toFixed(2)}s`;
            }
            return params.name + '<br/>' + params.value + '%';
          }
        },
        grid: { top: '10%', bottom: '15%', left: '5%', right: '5%' },
        xAxis: {
          type: 'value',
          max: 100,
          axisLabel: { color: '#83bff6' },
          splitLine: { show: false }
        },
        yAxis: { 
          type: 'category', 
          data: this.capsuleChartData.map(item => item.name),
          axisLabel: { 
            color: '#83bff6',
            interval: 0  // 显示所有标签
          }
        },
        series: [{
          name: '平均正确率',
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#e062ae' },
              { offset: 1, color: '#fb7293' }
            ])
          },
          data: this.capsuleChartData.map(item => ({
            value: item.value,
            name: item.name
          }))
        }]
      });
    },
    
    renderBarChart() {
      const chart = echarts.init(this.$refs.barRef);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            // 使用班级名称匹配数据，而不是 dataIndex
            const className = params[0].name;
            const classItem = this.data.find(d => d.班级 === className);
            if (classItem) {
              // 根据数据文档说明书，显示完整的班级统计数据
              return `${classItem.班级}<br/>` +
                     `正确率: ${(classItem.平均正确率 * 100).toFixed(2)}%<br/>` +
                     `答题数: ${classItem.平均答题次数.toFixed(1)}<br/>` +
                     `用时: ${classItem.平均用时.toFixed(2)}s`;
            }
            return params[0].name + '<br/>' + params[0].value;
          }
        },
        grid: { top: '10%', bottom: '15%', left: '15%' },
        xAxis: { type: 'value', axisLabel: { color: '#83bff6' }, splitLine: { show: false } },
        yAxis: { 
          type: 'category', 
          data: this.data.map(item => item.班级),
          axisLabel: { color: '#83bff6' }
        },
        series: [{
          name: '平均答题次数',
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#188df0' },
              { offset: 1, color: '#83bff6' }
            ])
          },
          data: this.data.map(item => Number(item.平均答题次数.toFixed(1)))
        }]
      });
    }
  },
  beforeDestroy() {
    if (this.capsuleChart) {
      this.capsuleChart.dispose();
    }
  }
};
</script>

<style scoped>
.group-container { padding: 15px; }
.sub-title { color: #00eaff; font-size: 14px; font-weight: bold; border-left: 4px solid #00eaff; padding-left: 10px; }
</style>
