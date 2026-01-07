import Vue from 'vue';
import App from './App.vue';
import DataV from '@jiaminghi/data-view';

// 注册 DataV
Vue.use(DataV);

new Vue({
  render: h => h(App),
}).$mount('#app');
