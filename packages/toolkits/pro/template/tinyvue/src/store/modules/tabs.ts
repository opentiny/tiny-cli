import { defineStore } from "pinia";

type Tab = {
  name: string;
  link: string;
}

export const useTabStore = defineStore('tabs', {
  state(){
    return {
      data: [] as Tab[],
      current: {} as Tab,
    }
  },
  actions: {
    add(item: Tab) {
      if (!item.name){
        return {...item};
      }
      if (!this.has(item.name)){
        this.data.push(item)
      }
      this.current = item;
      return {...item};
    },
    set(name: string){
      this.current = this.getByName(name)[0] ?? null;
      return this.current;
    },
    has(name: string){
      return this.data.some((tab) => tab.name === name)
    },
    getByName(name: string){
      return this.data.filter((tab) => tab.name === name);
    },
    getByLink(link: string) {
      return this.data.filter((tab) => tab.link === link);
    },
    delByLink(link: string){
      if (this.data.length === 1){
        return;
      }
      const idx = this.data.findIndex((tab) => tab.link === link);
      if (idx === -1) {
        return;
      }
      const hasNext = idx < this.data.length-1;
      if (hasNext) {
        this.current = this.data[idx+1];
      } else {
        const hasPrev = idx > 0;
        if (hasPrev){
          this.current = this.data[idx-1];
        }
      }
      this.data.splice(idx, 1);
    },
  }
})
