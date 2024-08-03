import { RoleType } from '@/types/roleType';

export default {
  path: 'role',
  name: 'Role',
  id: 'Role',
  label: 'Role',
  component: () => import('@/views/role/index.vue'),
  meta: {
    locale: 'menu.role',
    requiresAuth: true,
    order: 9,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'allRole',
      name: 'AllRole',
      id: 'AllRole',
      label: 'AllRole',
      component: () => import('@/views/role/info/index.vue'),
      meta: {
        locale: 'menu.role.info',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
