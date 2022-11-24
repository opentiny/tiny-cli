export default {
  path: 'board',
  name: 'Board',
  id: 'Board',
  label: 'Board',
  component: () => import('@/views/board/index.vue'),
  meta: {
    locale: 'menu.board',
    icon: 'icon-check-circle',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: 'work',
      name: 'Work',
      id: 'Work',
      label: 'Work',
      component: () => import('@/views/board/work/index.vue'),
      meta: {
        locale: 'menu.board.work',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
