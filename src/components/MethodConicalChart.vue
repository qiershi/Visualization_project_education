<template>
  <div class="conical-container">
    <dv-conical-column-chart :config="config" style="width:100%;height:320px;" />
  </div>
</template>

<script>
export default {
  name: 'MethodConicalChart',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    config() {
      return {
        data: this.data,
        showValue: true,
        columnColor: 'rgba(0, 234, 255, 0.4)',
        textColor: '#83bff6',
        fontSize: 12
      };
    }
  }
};
</script>

<style scoped>
.conical-container {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
