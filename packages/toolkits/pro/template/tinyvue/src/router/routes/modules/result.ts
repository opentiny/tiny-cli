export default {
  path: 'result',
  name: 'Result',
  id: 'Result',
  label: 'Result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    locale: 'menu.result',
    requiresAuth: true,
    order: 5,
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      id: 'Success',
      label: 'Success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'error',
      name: 'Error',
      id: 'Error',
      label: 'Error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
