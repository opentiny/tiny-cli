export default {
  path: 'user',
  name: 'User',
  id: 'User',
  label: 'User',
  component: () => import('@/views/user/index.vue'),
  meta: {
    locale: 'menu.user',
    requiresAuth: true,
    order: 7,
    roles: ['admin', 'user'],
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      id: 'Info',
      label: 'Info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      id: 'Setting',
      label: 'Setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
  ],
};
