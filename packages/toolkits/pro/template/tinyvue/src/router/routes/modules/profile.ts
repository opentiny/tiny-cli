export default {
  path: 'profile',
  name: 'Profile',
  id: 'Profile',
  label: 'Profile',
  component: () => import('@/views/profile/index.vue'),
  meta: {
    locale: 'menu.Profile',
    requiresAuth: true,
    order: 4,
  },
  children: [
    {
      path: 'detail',
      name: 'Detail',
      id: 'Detail',
      label: 'Detail',
      component: () => import('@/views/profile/detail/index.vue'),
      meta: {
        locale: 'menu.profile.detail',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
