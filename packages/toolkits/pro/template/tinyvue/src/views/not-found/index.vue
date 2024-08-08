<template>
  <div class="content">
    <div>notfound</div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const toPath = router.currentRoute.value.path;
  console.log(router.currentRoute);
  if(!router.currentRoute.value.query.final) {
    router.push({
      name:'redirect',
      query: {
        path: toPath,
      }
    })
  }

  const back = () => {
    // warning： Go to the node that has the permission
    router.push({ name: 'Workplace' });
  };
</script>

<style scoped lang="less"></style>
