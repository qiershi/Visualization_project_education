<template>
  <div class="method-container">
    <div class="chart-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <span class="title">学习方法覆盖率</span>
    </div>
    
    <dv-conical-column-chart 
      :config="config" 
      style="width:100%;height:280px;" 
    />
  </div>
</template>

<script>
export default {
  name: 'MethodConicalChart',
  props: ['data'],
  computed: {
    config() {
      return {
        data: this.data,
        showValue: true,
        img: [
          // 可以为每个柱子定义一个装饰图标，这里统一用一个或留空
        ],
        fontSize: 12,
        columnColor: 'rgba(0, 242, 255, 0.8)'
      };
    }
  }
};
</script>

<style scoped>
.method-container {
  padding: 10px;
  text-align: center;
}
.chart-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.title {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-left: -100px; /* 配合装饰位置调整 */
  z-index: 10;
}
</style>
