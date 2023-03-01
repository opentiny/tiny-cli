<template>
  <div class="menu-router">
    <tiny-tree-menu
      ref="tree"
      :data="treeData"
      :show-filter="false"
      node-key="id"
      wrap
      :default-expanded-keys="[expandeArr]"
      @current-change="currentChange"
    >
      <template #default="slotScope">
        <template v-for="(item, index) in routerTitle" :key="index">
          <span v-if="slotScope.label === item.value" class="menu-title">
            <component :is="item.icon"></component>&nbsp;
            <span :class="item.bold">{{ $t(item.name) }}</span>
          </span>
        </template>
      </template>
    </tiny-tree-menu>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watch, ref } from 'vue';
  import { RouteRecordNormalized } from 'vue-router';
  import {
    IconDownloadCloud,
    IconFiles,
    IconSetting,
    IconSuccessful,
    IconCueL,
    IconUser,
    IconFiletext,
    IconDesktopView,
  } from '@opentiny/vue-icon';
  import router from '@/router';
  import { TreeMenu as tinyTreeMenu } from '@opentiny/vue';
  import { useUserStore } from '@/store';

  // icon图标
  const iconDownloadCloud = IconDownloadCloud();
  const iconFiles = IconFiles();
  const iconSetting = IconSetting();
  const iconSuccessful = IconSuccessful();
  const iconCueL = IconCueL();
  const iconUser = IconUser();
  const iconFiletext = IconFiletext();
  const iconDesktopView = IconDesktopView();
  const tree = ref();
  const expandeArr = ref();
  const routerTitle = [
    {
      value: 'Board',
      name: 'menu.board',
      icon: iconDesktopView,
      bold: 'main-title',
    },
    {
      value: 'Home',
      name: 'menu.home',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Work',
      name: 'menu.work',
      icon: null,
      bold: 'title',
    },
    {
      value: 'List',
      name: 'menu.list',
      icon: iconFiles,
      bold: 'main-title',
    },
    {
      value: 'Table',
      name: 'menu.list.searchTable',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Form',
      name: 'menu.form',
      icon: iconSetting,
      bold: 'main-title',
    },
    {
      value: 'Base',
      name: 'menu.form.base',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Step',
      name: 'menu.form.step',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Profile',
      name: 'menu.profile',
      icon: iconFiletext,
      bold: 'main-title',
    },
    {
      value: 'Detail',
      name: 'menu.profile.detail',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Result',
      name: 'menu.result',
      icon: iconSuccessful,
      bold: 'main-title',
    },
    {
      value: 'Success',
      name: 'menu.result.success',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Error',
      name: 'menu.result.error',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Cloud',
      name: 'menu.cloud',
      icon: iconDownloadCloud,
      bold: 'main-title',
    },
    {
      value: 'Hello',
      name: 'menu.cloud.hello',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Contracts',
      name: 'menu.cloud.contracts',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Exception',
      name: 'menu.exception',
      icon: iconCueL,
      bold: 'main-title',
    },
    {
      value: '403',
      name: 'menu.exception.403',
      icon: null,
      bold: 'title',
    },
    {
      value: '404',
      name: 'menu.exception.404',
      icon: null,
      bold: 'title',
    },
    {
      value: '500',
      name: 'menu.exception.500',
      icon: null,
      bold: 'title',
    },
    {
      value: 'User',
      name: 'menu.user',
      icon: iconUser,
      bold: 'main-title',
    },
    {
      value: 'Info',
      name: 'menu.user.info',
      icon: null,
      bold: 'title',
    },
    {
      value: 'Setting',
      name: 'menu.user.setting',
      icon: null,
      bold: 'title',
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

  const userStore = useUserStore();
  const role = computed(() => userStore.role);
  let treeData = ref(copyRouter);

  watch(
    role,
    (newValue, oldValue) => {
      if (newValue === 'admin') {
        treeData.value = copyRouter;
      } else {
        treeData.value = copyRouter.filter(
          (item: { name: string }) => item.name !== 'User'
        );
      }
    },
    { immediate: true }
  );

  /**
   * 监听路由变化高亮当前菜单
   */
  watch(
    () => router.currentRoute.value.path,
    (newValue) => {
      let data = newValue.split('/');
      let result = data[data.length - 1];
      const characters = [...result];
      characters[0] = characters[0]?.toUpperCase();
      expandeArr.value = characters.join('');
      setTimeout(() => {
        tree.value.$refs.tree.setCurrentNode({ id: expandeArr.value });
      }, 0);
    },
    { immediate: true }
  );

  const currentChange = (data: any) => {
    const filter = [
      'Exception',
      'Form',
      'Board',
      'List',
      'Profile',
      'Result',
      'User',
      'Cloud',
    ];
    if (filter.indexOf(data.id) === -1) {
      router.push({ name: data.id });
    }
  };
</script>

<style lang="less" scoped>
  @import '@/assets/style/menu.less'; /* 引入公共样式 */

  .main-title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  .title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  .menu-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
