/// <reference types="vite/client" />

export {};

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue/types/vue' {
  interface Vue {
    $echarts: any;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

declare module '@opentiny/vue-locale';
declare module '@opentiny/vue';
declare module '@opentiny/vue-icon';
declare module '@opentiny/vue-theme/theme-tool.js';
declare module '@opentiny/vue-theme/theme';
declare module 'query-string';
declare const BUILD_TOOLS: string;
declare interface NodeRequire {
  context: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string) => string;
    $tm: (key: string) => [] | { [p: string]: any };
  }
}
