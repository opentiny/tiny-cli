<template>
  <div class="menu-router">
    <tiny-tree-menu
      ref="tree"
      :data="MenuData"
      :show-filter="false"
      node-key="id"
      wrap
      @current-change="currentChange"
    >
    </tiny-tree-menu>
  </div>
</template>

<script lang="ts" setup>

import {ref, onMounted, watch, computed} from 'vue';
import {TreeMenu as tinyTreeMenu} from '@opentiny/vue';
import {useMenuStore} from "@/store/modules/router";
import router from "@/router";
import {ITreeNodeData} from '@/router/guard/menu';

const menuStore = useMenuStore();
const rawMenuData = menuStore.menuList;
type SideMenuData = (
  ITreeNodeData &
  { meta: { url: string } }
  )[]

const filtter = (treeNodeDatas: ITreeNodeData[]) => {
  const menus: SideMenuData = [];
  for (let i = 0; i < treeNodeDatas.length; i += 1) {
    const treeNodeData = treeNodeDatas[i];
    const url = treeNodeData.url!;
    delete treeNodeData.url;
    menus.push(
      {
        ...treeNodeData,
        meta: {
          url,
        },
        children: [...filtter(treeNodeData.children ?? [])]
      }
    )
  }
  return menus;
}

const MenuData = ref<SideMenuData>(filtter(rawMenuData))

const currentChange = (data: any) => {
  router.replace({name: data.label})
};

const tree = ref();
const expandeArr = ref();
/**
 * 监听路由变化高亮当前菜单
 */
onMounted(() => {
  watch(
    () => router.currentRoute.value.path,
    (newValue: string) => {
      const menuKey = newValue
        .replace(/^.*\//, '')
        .replace(/^[a-z]/, (s: string) => s.toUpperCase());
      expandeArr.value = [menuKey];
      tree.value.setCurrentKey(menuKey);
    },
    { immediate: true },
  );
});
</script>

<style scoped>

</style>
