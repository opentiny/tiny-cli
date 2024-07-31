import { RoleType } from '@/types/roleType';

export default {
  path: 'userManager',
  name: 'UserManager',
  id: 'UserManager',
  label: 'UserManager',
  component: () => import('@/views/userManager/index.vue'),
  meta: {
    locale: 'menu.userManager',
    requiresAuth: true,
    order: 9,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'allInfo',
      name: 'AllInfo',
      id: 'AllInfo',
      label: 'AllInfo',
      component: () => import('@/views/userManager/info/index.vue'),
      meta: {
        locale: 'menu.userManager.info',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'allSetting',
      name: 'AllSetting',
      id: 'AllSetting',
      label: 'AllSetting',
      component: () => import('@/views/userManager/setting/index.vue'),
      meta: {
        locale: 'menu.userManager.setting',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'userAdd',
      name: 'UserAdd',
      id: 'UserAdd',
      label: 'UserAdd',
      component: () => import('@/views/userManager/useradd/index.vue'),
      meta: {
        locale: 'menu.userManager.useradd',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
