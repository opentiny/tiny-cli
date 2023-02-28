export default {
  path: 'form',
  name: 'Form',
  id: 'Form',
  label: 'Form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.form',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'base',
      name: 'Base',
      id: 'Base',
      label: 'Base',
      component: () => import('@/views/form/base/index.vue'),
      meta: {
        locale: 'menu.form.base',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'step',
      name: 'Step',
      id: 'Step',
      label: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
