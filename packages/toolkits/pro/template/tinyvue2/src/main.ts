import Vue from 'vue';
import { PiniaVuePlugin } from 'pinia';
import i18n from '@/locale';
import directive from './directive';
import App from './App.vue';
import router from './router';
import '@/api/interceptor';
import '@/assets/style/global.less';
import { pinia } from './stores/pinia';
import 'echarts4/map/js/china.js';
import chinaMap from './assets/china.json';
// import * as echarts4 from 'echarts4';
import { registerMap } from 'echarts';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import * as icons from '@opentiny/vue-icon';
import VueRouter from 'vue-router';

// 全局注册所有图标组件
Object.keys(icons).forEach((key) => {
  Vue.component(key, icons[key]);
});

registerMap('china', chinaMap as any);

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);
Vue.component('Breadcrumb', Breadcrumb);
Vue.use(directive);

new Vue({
  router,
  pinia,
  render: (h) => h(App),
  i18n: i18n({ locale: 'zhCN' }),
}).$mount('#app');
