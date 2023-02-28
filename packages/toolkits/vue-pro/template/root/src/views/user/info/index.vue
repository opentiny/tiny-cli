<template>
  <div class="container-info">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <div class="general-card">
      <div class="general-top">
        <headtop></headtop>
      </div>
      <div class="general-content">
        <infotab></infotab>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import infotab from './components/info-tab.vue';
  import headtop from '../../form/step/components/head.vue';
</script>

<style scoped lang="less">
  .container-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 98%;
    height: inherit;
    margin: 0 auto;

    .general-card {
      flex: 1 1 auto;
      height: 100%;
      padding: 10px;
      overflow-x: hidden;
      overflow-y: auto;
      border-radius: 10px;

      .general-top {
        display: flex;
        justify-content: space-around;
        min-height: 202px;
        margin: 0 -12px;
        overflow: hidden;
        background-image: url('@/assets/images/step-head.png');
        background-size: 100% 100%;
      }

      .general-content {
        position: relative;
        color: black;
        font-size: medium;
        background-color: #fff;
        border-radius: 10px;
      }
    }
  }
</style>
