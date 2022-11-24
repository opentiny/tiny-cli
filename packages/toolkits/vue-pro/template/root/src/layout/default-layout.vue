<template>
  <div class="layout coBox1">
    <tiny-container :aside-width="asideWidth" :pattern="myPattern">
      <template #header>
        <tiny-layout>
          <div class="layout-navbar">
            <NavBar />
          </div>
        </tiny-layout>
      </template>
      <template #aside>
        <tiny-layout class="layout-sider">
          <div class="menu-wrapper">
            <Menu />
          </div>
        </tiny-layout>
      </template>
      <tiny-layout class="layout-content">
        <PageLayout />
      </tiny-layout>
      <template #footer>
        <tiny-layout>
          <div class="layout-footer">
            <Footer />
          </div>
        </tiny-layout>
      </template>
    </tiny-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import {
    Container as TinyContainer,
    Layout as TinyLayout,
  } from '@huawei/tiny-vue';
  import Footer from '@/components/footer/index.vue';
  import NavBar from '@/components/navbar/index.vue';
  import Menu from '@/components/menu/index.vue';
  import PageLayout from './page-layout.vue';

  // 固定左侧导航菜单
  const asideWidth = ref('210px');
  const width = ref('89vw');
  const widthlg = ref('79vw');
  const top = ref('0px');

  // 是否显示切换框架结构
  const myPattern = ref('legend');
</script>

<style scoped lang="less">
  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 10px;
    left: 0;
    z-index: 100;
    width: 100%;
    background-color: #fff;
  }

  .layout-sider {
    margin-top: v-bind(top);
    background-color: #fff;
  }

  .menu-wrapper {
    width: inherit;
    height: 92vh;
    overflow: auto;
    overflow-x: hidden;
  }

  .layout :deep(tiny-container) {
    height: 100%;
    color: #ccc;
    font-size: 18px;
  }

  .layout :deep(.tiny-container .tiny-container__header) {
    height: 34px;
    box-shadow: 0 0 10px #000;
  }

  .layout :deep(.tiny-container .tiny-container__aside) {
    background: #fff;
    border-left: 1px solid #ccc;
  }

  .layout :deep(.tiny-container .tiny-container__main) {
    display: flex;
    justify-content: center;
    overflow: hidden;
    color: #ccc;
    background-color: #f5f6f7;
  }

  .layout-content {
    display: flex;
    width: v-bind(width);
  }

  .layout :deep(.tiny-container .tiny-container__footer) {
    background-color: #fff;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .layout-content {
      display: flex;
      width: v-bind(widthlg);
    }
  }
</style>
