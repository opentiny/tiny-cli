import { RoleType } from '@/types/roleType';

export default {
  path: 'permission',
  name: 'Permission',
  id: 'Permission',
  label: 'Permission',
  component: () => import('@/views/permission/index.vue'),
  meta: {
    locale: 'menu.Permission',
    requiresAuth: true,
    order: 9,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'allPermission',
      name: 'AllPermission',
      id: 'AllPermission',
      label: 'AllPermission',
      component: () => import('@/views/permission/info/index.vue'),
      meta: {
        locale: 'menu.permission.info',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
