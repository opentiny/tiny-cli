export default {
  path: 'list',
  name: 'List',
  id: 'List',
  label: 'List',
  component: () => import('@/views/list/index.vue'),
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      path: 'table', // The midline path complies with SEO specifications
      name: 'Table',
      id: 'Table',
      label: 'Table',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
