<template>
  <div class="menu-router">
    <tiny-tree-menu
      ref="tree"
      :data="treeDataFilter"
      :show-filter="false"
      node-key="id"
      wrap
      :default-expanded-keys="[expandeArr]"
      @current-change="currentChange"
    >
      <template #default="slotScope">
        <span v-if="slotScope.data.icon" class="menu-title">
          <component :is="slotScope.data.icon.icon"></component>
          <span>{{ $t(slotScope.data.label) }}</span>
        </span>
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
    IconApplication,
  } from '@opentiny/vue-icon';
  import { TreeMenu as tinyTreeMenu } from '@opentiny/vue';
  import router from '@/router';
  import { useUserStore } from '@/store';
import { TabItem } from '@opentiny/vue';

  // icon图标
  const iconDownloadCloud = IconDownloadCloud();
  const iconFiles = IconFiles();
  const iconSetting = IconSetting();
  const iconSuccessful = IconSuccessful();
  const iconCueL = IconCueL();
  const iconUser = IconUser();
  const iconFiletext = IconFiletext();
  const iconApplication = IconApplication();
  const tree = ref();
  const expandeArr = ref();
  const iconList = [
    {
      icon: iconApplication
    },
    {
      icon: iconFiles
    },
    {
      icon: iconSetting
    },
    {
      icon: iconFiletext
    },
    {
      icon: iconSuccessful
    },
    {
      icon: iconCueL
    },
    {
      icon: iconUser
    },
    {
      icon: iconDownloadCloud
    },
  ]
  
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
  treeData.value.forEach((item, index) => {
    item.icon = iconList[index]
  });
  const treeDataFilter = treeData.value.filter((e) => {
    if(e.children) {
      e.children = e.children.filter(v => {
        return !v.meta.hideInMenu
      })
    }
    return !e.meta.hideInMenu;
  });
  
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
  .main-title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .title {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }

  .menu-title {
    display: flex;
    gap: 10px;
    align-items: center;
    height: 20px;

    > svg {
      width: 1.3em;
      height: 1.3em;
    }
  }
  :deep(
      .tiny-tree-menu
        .tiny-tree
        .tiny-tree-node.is-current
        > .tiny-tree-node__content
    ) {
    &:hover {
      background: var(--ti-tree-menu-node-hover-bg-color) !important;
    }
  }
  .tiny-tree-menu
    .tiny-tree
    .tiny-tree-node.is-current
    > .tiny-tree-node__content
    .tree-node-name
    .tiny-svg {
    fill: var(--ti-base-icon-color);
  }
</style>
