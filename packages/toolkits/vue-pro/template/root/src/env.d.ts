/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

declare module '@huawei/tiny-vue-locale';
declare module '@huawei/tiny-vue';
declare module '@huawei/tiny-vue-icon';
declare module '@huawei/tiny-vue-theme/theme-tool.js';
declare module '@huawei/tiny-vue-theme/theme';
