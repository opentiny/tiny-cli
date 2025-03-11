import { createApp } from 'vue';
import { registerMap } from 'echarts';
import { HwcClient } from '@opentiny/hwc-client';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import App from './App.vue';
import '@/api/interceptor';
import '@/assets/style/global.less';
import config from '../hwc-exports.json';
import chinaMap from './assets/china.json';

registerMap('china', chinaMap as any);
const app = createApp(App);

// 增加华为云相关配置
HwcClient.configure({
  ...config.hwcConfig,
  accessKey: '',
  secretKey: '',
});

app.use(router);
app.use(store);
app.use(i18n({ locale: localStorage.getItem('tiny-locale') }));
app.use(globalComponents);
app.use(directive);

app.mount('#app');
