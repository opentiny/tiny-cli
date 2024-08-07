import { defineStore } from "pinia";
import { getRoleMenu } from "@/api/menu";
import useUserStore from "./user";

export const useMenuStore = defineStore('menu', {
  state() {
    return {
      menuList: [] as any[]
    }
  },
  actions: {
    async getMenuList(){
      const userStore = useUserStore();
      if (!userStore.email){
        return [];
      }
      const {data} = await getRoleMenu(userStore.email)
      this.menuList = data;
      return data;
    }
  }
})
