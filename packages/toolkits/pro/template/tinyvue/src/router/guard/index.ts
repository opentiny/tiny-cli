import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {

}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  if(import.meta.env.VITE_USE_MOCK) setupPermissionGuard(router);
}
