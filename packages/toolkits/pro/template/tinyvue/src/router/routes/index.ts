import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob ? import.meta.glob('./modules/*.ts', { eager: true }) : require.context('./module', false, /\.ts$/, 'sync')
const appRoutes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const defaultModule = modules[key].default;
  if (!defaultModule) return;
  const moduleList = Array.isArray(defaultModule)
    ? [...defaultModule]
    : [defaultModule];
  appRoutes.push(...moduleList);
});

export default appRoutes;
