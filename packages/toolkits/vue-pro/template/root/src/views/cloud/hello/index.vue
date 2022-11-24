<template>
  <div class="container">
    <Breadcrumb :items="['menu.cloud', 'menu.cloud.hello']" />
    <div class="content">
      <svg width="1000" height="300">
        <text x="40" y="150">{{ text }}</text>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { HwcClient } from '@opentiny/hwc-client';

  const text = ref();

  async function getData(): Promise<void> {
    const res = await HwcClient.apigClient.exec(
      'group_hello_world',
      'apig_hello_world',
      {}
    );

    text.value = await res?.text();
  }

  onMounted(getData);
</script>

<style scoped lang="less">
  .container {
    width: 100vw;
    margin: 10px;
    padding: 0 20px 20px 20px;
    background-color: #fff;

    .content {
      text-align: center;

      text {
        font-weight: bolder;
        font-size: 56px;
        font-family: SimHei;
        fill: transparent;
        stroke: #5e7ce0;
      }
    }
  }
</style>
