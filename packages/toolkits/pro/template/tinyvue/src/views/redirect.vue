<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const route = router.currentRoute.value;
router.replace({name: route.query.to?.toString() ?? 'Home'});
</script>
