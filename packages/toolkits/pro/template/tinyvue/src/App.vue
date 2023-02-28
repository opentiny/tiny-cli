<template>
  <div>
    <router-view />
    <global-setting />
  </div>
</template>

<script lang="ts" setup>
  import { provide } from 'vue';
  import * as echarts from 'echarts';
  import GlobalSetting from '@/components/global-setting/index.vue';

  provide('echarts', echarts);
</script>
