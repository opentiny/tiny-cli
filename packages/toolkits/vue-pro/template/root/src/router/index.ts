/* eslint-disable prefer-template */
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import DefaultLayout from '@/layout/default-layout.vue';
import appRoutes from './routes';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: import.meta.env.VITE_CONTEXT + 'board/work',
    },
    {
      path: import.meta.env.VITE_CONTEXT + 'board/work',
      name: 'Board',
      component: () => import('@/views/board/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'root',
      path: import.meta.env.VITE_CONTEXT,
      component: DefaultLayout,
      children: appRoutes,
    },
    {
      path: import.meta.env.VITE_CONTEXT + ':pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
