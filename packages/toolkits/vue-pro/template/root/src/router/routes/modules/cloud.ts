export default {
  path: 'cloud',
  name: 'Cloud',
  id: 'Cloud',
  label: 'Cloud',
  component: () => import('@/views/cloud/index.vue'),
  meta: {
    locale: 'menu.cloud',
    requiresAuth: true,
    order: 8,
  },
  children: [
    {
      path: 'hello',
      name: 'Hello',
      id: 'Hello',
      label: 'Hello',
      component: () => import('@/views/cloud/hello/index.vue'),
      meta: {
        locale: 'menu.cloud.hello',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'contracts',
      name: 'Contracts',
      id: 'Contracts',
      label: 'Contracts',
      component: () => import('@/views/cloud/contracts/index.vue'),
      meta: {
        locale: 'menu.cloud.contracts',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
