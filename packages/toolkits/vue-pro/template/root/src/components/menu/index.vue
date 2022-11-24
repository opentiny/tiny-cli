<template>
  <div class="menu-router">
    <tiny-tree-menu
      ref="tree"
      :data="treeData"
      :show-filter="false"
      node-key="id"
      :default-expanded-keys="[expandeArr]"
      @current-change="currentChange"
    >
      <template #default="slotScope">
        <span v-for="(item, index) in routerTitle" :key="index">
          <span v-if="slotScope.label === item.value">
            <component :is="item.icon"></component>
            &nbsp;{{ $t(item.name) }}
          </span>
        </span>
      </template>
    </tiny-tree-menu>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch, ref } from 'vue';
  import { RouteRecordNormalized } from 'vue-router';
  import { IconDesktopView, IconDownloadCloud } from '@huawei/tiny-vue-icon';
  import { TreeMenu as tinyTreeMenu } from '@huawei/tiny-vue';
  import router from '@/router';

  // icon图标
  const iconDesktopView = IconDesktopView();
  const iconDownloadCloud = IconDownloadCloud();
  const expandeArr = ref();
  const tree = ref();
  const routerTitle = [
    {
      value: 'Board',
      name: 'menu.board',
      icon: iconDesktopView,
    },
    {
      value: 'Work',
      name: 'menu.work',
      icon: null,
    },
    {
      value: 'Cloud',
      name: 'menu.cloud',
      icon: iconDownloadCloud,
    },
    {
      value: 'Hello',
      name: 'menu.cloud.hello',
      icon: null,
    },
    {
      value: 'Contracts',
      name: 'menu.cloud.contracts',
      icon: null,
    },
  ];

  // 获取路由数据
  const appRoute = computed(() => {
    return router
      .getRoutes()
      .find((el) => el.name === 'root') as RouteRecordNormalized;
  });
  const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children));
  copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
    return (a.meta.order || 0) - (b.meta.order || 0);
  });

  let treeData = ref(copyRouter);

  /**
   * 监听路由变化高亮当前菜单
   */
  watch(
    () => router.currentRoute.value.path,
    (newValue) => {
      let data = newValue.split('/');
      let result = data.pop();;
      const characters = [...result];
      characters[0] = characters[0].toUpperCase();
      expandeArr.value = characters.join('');
      setTimeout(() => {
        tree.value.$refs.tree.setCurrentNode({ id: expandeArr.value });
      }, 0);
    },
    { immediate: true }
  );

  const currentChange = (data: any) => {
    const filter = ['Board', 'Cloud'];
    if (filter.indexOf(data.id) === -1) {
      router.push({ name: data.id });
    }
  };
</script>

<style lang="less" scoped></style>
