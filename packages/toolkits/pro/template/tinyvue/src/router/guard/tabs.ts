import { useTabStore } from "@/store";
import { Router } from "vue-router";

export const setupTabsGuard = (router:Router) => {
  router.beforeEach((to, from, next) => {
    const tabStore = useTabStore();
    if (tabStore.has(to.meta.locale ?? '')) {
      tabStore.set(to.meta.locale!);
      next();
      return;
    }
    tabStore.add({name: to.meta.locale!, link: to.fullPath});
    tabStore.set(to.meta.locale!);
    next();
  })
}
