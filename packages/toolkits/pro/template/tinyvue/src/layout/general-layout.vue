<script lang="ts" setup>
  const props = defineProps<{
    breadcrumb: string[];
  }>();
</script>

<template>
  <div class="container">
    <Breadcrumb :items="[...props.breadcrumb]" />
    <div class="container-info">
      <div class="general-card">
        <div class="general-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: calc(100% - var(--tv-common-size-12x));
  }

  .container-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 60px);
    margin: 0 auto;

    .general-card {
      flex: 1 1 auto;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      border-radius: 10px;

      .general-top {
        display: flex;
        min-height: 178px;
        margin-bottom: 20px;
        overflow: hidden;
        background-image: url('@/assets/images/blue-bg.png');
        background-size: 100% 100%;
        border-radius: 4px;
        box-shadow: 0 0 8px 8px rgba(169, 174, 184, 0.05);
      }

      .general-content {
        position: relative;
        flex-grow: 1;
        height: 100%;
        padding: 16px;
        overflow-y: auto;
        color: black;
        font-size: medium;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 8px 8px rgba(169, 174, 184, 0.05);
      }
    }
  }
</style>
