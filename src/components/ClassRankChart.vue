<template>
  <div class="rank-container">
    <div class="rank-title">
      <dv-decoration-3 style="width:200px;height:30px;" />
      <span class="title-text">各班级答题总量排名</span>
    </div>
    
    <dv-scroll-ranking-board 
      :config="rankConfig" 
      style="width:100%;height:300px" 
    />
  </div>
</template>

<script>
export default {
  name: 'ClassRankChart',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    rankConfig() {
      return {
        data: this.data,
        unit: '次',
        rowNum: 6, // 每次显示 6 行
        waitTime: 3000, // 轮播间隔
        carousel: 'single', // 单条轮播
        sort: true // 自动排序
      };
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
