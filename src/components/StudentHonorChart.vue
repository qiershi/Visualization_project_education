<template>
  <div class="student-honor">
    <div class="honor-header">
      <dv-decoration-7 style="width:250px;height:30px;color:#fff;">学霸综合表现榜</dv-decoration-7>
    </div>
    
    <dv-scroll-board :config="boardConfig" style="width:100%;height:280px;" />
  </div>
</template>

<script>
export default {
  name: 'StudentHonorChart',
  props: {
    topStudents: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    boardConfig() {
      const rows = this.topStudents.map(s => [
        `<span style="color:#e7bc3c">No.${s.综合排名}</span>`,
        s.student_ID.substring(0, 8) + '...',
        s.班级,
        `${(s.正确率 * 100).toFixed(1)}%`,
        s.答题次数
      ]);
      
      return {
        header: ['排名', '学生ID', '班级', '正确率', '答题总数'],
        data: rows,
        columnWidth: [60, 120, 80, 80, 80],
        index: false,
        headerBGC: '#00275a',
        oddRowBGC: '#003a70',
        evenRowBGC: '#00275a',
        waitTime: 2500
      };
    }
  }
};
</script>

<style scoped>
.student-honor {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.honor-header {
  margin-bottom: 20px;
  text-align: center;
}
</style>