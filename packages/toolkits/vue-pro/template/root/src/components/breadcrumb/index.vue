<template>
  <tiny-breadcrumb class="container-breadcrumb">
    <tiny-breadcrumb-item v-for="item in items" :key="item">
      {{ $t(item) }}
    </tiny-breadcrumb-item>
    <div class="show-title">
      <tiny-scroll-text class="scrollclass" :time="10" direction="right">
        {{ $t('breadcrumb.title') }}
      </tiny-scroll-text>
    </div>
  </tiny-breadcrumb>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import {
    ScrollText as TinyScrollText,
    Breadcrumb as TinyBreadcrumb,
    BreadcrumbItem as TinyBreadcrumbItem,
  } from '@huawei/tiny-vue';

  defineProps({
    items: {
      type: Array as PropType<string[]>,
      default() {
        return [];
      },
    },
  });
</script>

<style scoped lang="less">
  .container-breadcrumb {
    display: flex;
    margin: 16px 0;
  }
  .show-title {
    width: 60%;
    color: rgb(27, 26, 26);
    font-weight: bold;
  }
  .scrollclass {
    width: 0;
    padding-left: 10px;
    :deep(.tiny-scroll-text) {
      width: 790px;
      background: transparent;
    }
  }
</style>
