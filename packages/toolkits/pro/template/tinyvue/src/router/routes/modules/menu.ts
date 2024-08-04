import { RoleType } from '@/types/roleType';

export default {
  path: 'menu',
  name: 'Menu',
  id: 'Menu',
  label: 'Menu',
  component: () => import('@/views/menu/index.vue'),
  meta: {
    locale: 'menu.menu',
    requiresAuth: true,
    order: 9,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'allMenu',
      name: 'AllMenu',
      id: 'AllMenu',
      label: 'AllMenu',
      component: () => import('@/views/menu/info/index.vue'),
      meta: {
        locale: 'menu.menu.info',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
