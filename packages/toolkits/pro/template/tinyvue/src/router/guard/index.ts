import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupPermissionGuard from './permission';
import {setupMenuGuard} from './menu';

function setupPageGuard(router: Router) {
  setupMenuGuard(router);
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  // if(import.meta.env.VITE_USE_MOCK) setupPermissionGuard(router);
}
