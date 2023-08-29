import { RoleType } from '@/types/roleType';

export default {
  path: 'result',
  name: 'Result',
  id: 'Result',
  label: 'menu.result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    locale: 'menu.result',
    requiresAuth: true,
    order: 5,
    roles: [RoleType.admin, RoleType.user],
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      id: 'Success',
      label: 'menu.result.success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'error',
      name: 'Error',
      id: 'Error',
      label: 'menu.result.error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: [RoleType.admin, RoleType.user],
      },
    },
  ],
};
