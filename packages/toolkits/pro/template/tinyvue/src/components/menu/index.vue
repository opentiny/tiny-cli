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
          <div class="menu-title" >
            <component :is="getMenuIcon(slotScope.data.id)"></component>
            <span :class="slotScope.data.children?'main-title':'title'">{{ $t(slotScope.data.meta.locale) }}</span>
          </div>
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

  const tree = ref();
  const expandeArr = ref();
  const treeData = ref({});

  // 获取路由数据
  const appRoute = computed(() => {
    return router
      .getRoutes()
      .find((el:any) => el.name === 'root') as RouteRecordNormalized;
  });
  const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children));
  copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
    return (a.meta.order || 0) - (b.meta.order || 0);
  });
  const userStore = useUserStore();
  const role = computed(() => userStore.role);
  const getMenuIcon = (id:string) => {
    switch(id){
      case "Cloud" :{
        return IconDownloadCloud();
      }
      case "List" : {
        return IconFiles();
      }
      case "Board" : {
        return IconDesktopView()
      }
      case "Form" : {
        return IconSetting()
      }
      case "Result" : {
        return IconSuccessful()
      }
      case "Exception" : {
        return IconCueL()
      }
      case "Profile" : {
        return IconFiletext()
      }
      case "User" : {
        return IconUser()
      }
      default : {
        return false
      }
    }
  }
  const filterRoutes = (routes:any,roles:any) =>{
    return routes.filter((route:any) => {
      if(route.meta && route.meta.roles){
        return roles.some( (r:any) => route.meta.roles.includes(r));
      }
      return true;
    }).map( (route:any) => {
      if (route.children){
        route.children = filterRoutes(route.children,roles)
      }
      return route
    })
  }
  watch(
    role,
    (value:any) => {
      treeData.value = filterRoutes(copyRouter,[value])
    },
    { immediate: true }
  );

  /**
   * 监听路由变化高亮当前菜单
   */
  watch(
    () => router.currentRoute.value.path,
    (newValue:any) => {
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
    align-items: center;
    justify-content: center;
    height: 20px;
    > span{
      padding-left:10px;
    }
    > svg{
      width:1.3em;
      height:1.3em;
    }
  }
  .tiny-tree-menu .tiny-tree .tiny-tree-node.is-current>.tiny-tree-node__content .tree-node-name .tiny-svg {
    fill: var(--ti-tree-menu-square-left-border-color);
  }
</style>
