<template>
  <div>
    <infofilterstarttime
      v-if="activeName === '1'"
      ref="filterstarttime"
    ></infofilterstarttime>
    <infofilterendtime
      v-if="activeName === '1'"
      ref="filterendtime"
    ></infofilterendtime>
    <infofilterstatue ref="filterstatue"></infofilterstatue>
    <infofiltertype ref="filtertype"></infofiltertype>
    <tiny-button type="primary" @click="submit">{{
      $t('userInfo.btn.search')
    }}</tiny-button>
    <tiny-button @click="reset">{{ $t('userInfo.btn.reset') }}</tiny-button>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';
  import { Button as TinyButton, Modal } from '@opentiny/vue';
  import infofilterstatue from './info-filterStatue.vue';
  import infofiltertype from './info-filterType.vue';
  import infofilterstarttime from './info-filterStartTime.vue';
  import infofilterendtime from './info-filterEndTime.vue';

  const props = defineProps({
    activeName: String,
  });
  const userStore = useUserStore();
  const filterstarttime = ref();
  const filterendtime = ref();
  const filterstatue = ref();
  const filtertype = ref();
  const { t } = useI18n();

  // 重置筛选项
  const reset = () => {
    if (props.activeName === '1') {
      filterstarttime.value.reset();
      filterendtime.value.reset();
    }
    filterstatue.value.reset();
    filtertype.value.reset();
    userStore.resetFilterInfo();
    userStore.setInfo({ reset: true });
  };

  const submit = () => {
    if (props.activeName === '1') {
      userStore.startTime === '' ||
      userStore.endTime === '' ||
      userStore.filterStatue?.length === 0 ||
      userStore.filterType?.length === 0
        ? Modal.message({
            message: t('userInfo.filter.all'),
            status: 'error',
          })
        : userStore.setInfo({ submit: true, sort: undefined });
    } else {
      userStore.filterStatue?.length === 0 || userStore.filterType?.length === 0
        ? Modal.message({
            message: t('userInfo.filter.all'),
            status: 'error',
          })
        : userStore.setInfo({ submit: true, sort: undefined });
    }
  };
  defineExpose({
    reset,
  });
</script>

<style scoped lang="less">
  button {
    margin-top: 10%;
    margin-left: 35%;
  }
</style>
