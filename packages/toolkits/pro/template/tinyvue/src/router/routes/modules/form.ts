import { RoleType } from '@/types/roleType';

export default {
  path: 'form',
  name: 'Form',
  id: 'Form',
  label: 'menu.form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.form',
    requiresAuth: true,
    order: 3,
    roles: [RoleType.admin],
  },
  children: [
    {
      path: 'base',
      name: 'Base',
      id: 'Base',
      label: 'menu.form.base',
      component: () => import('@/views/form/base/index.vue'),
      meta: {
        locale: 'menu.form.base',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
    {
      path: 'step',
      name: 'Step',
      id: 'Step',
      label: 'menu.form.step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: [RoleType.admin],
      },
    },
  ],
};
