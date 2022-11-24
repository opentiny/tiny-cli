import { createApp } from 'vue';
import { HwcClient } from '@opentiny/hwc-client';
import globalComponents from '@/components';
import router from './router';
import i18n from './locale';
import { setupProdMockServer } from './mockProdServer';
import './mock';
import App from './App.vue';
import '@/api/interceptor';
import '@/assets/style/global.less';
import config from '../hwc-exports.json';

setupProdMockServer();

const app = createApp(App);

// 增加华为云相关配置
HwcClient.configure({
  ...config.hwcConfig,
  accessKey: '',
  secretKey: '',
});

app.use(router);
app.use(i18n({ locale: 'zhCN' }));
app.use(globalComponents);

app.mount('#app');
