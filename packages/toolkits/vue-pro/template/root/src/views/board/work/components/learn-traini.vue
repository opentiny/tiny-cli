<template>
  <div>
    <div class="select">
      <tiny-select
        v-model="state.project"
        :placeholder="$t('baseForm.form.label.placeholder')"
        filterable
      >
        <tiny-option
          v-for="item in state.options"
          :key="item.value"
          :label="$t(item.label)"
          :value="item.value"
        ></tiny-option>
      </tiny-select>
    </div>
    <tiny-layout>
      <tiny-row :flex="true" justify="center" class="margin-bottom">
        <tiny-col :span="5">
          <div class="col">
            <span>{{ $t('work.index.assign') }}</span>
            <span>{{ number[0] }}</span>
          </div>
        </tiny-col>
        <tiny-col :span="5">
          <div class="col">
            <span>{{ $t('work.index.prepare') }}</span>
            <span>{{ number[1] }}</span>
          </div>
        </tiny-col>
        <tiny-col :span="5">
          <div class="col">
            <span>{{ $t('work.index.open') }}</span>
            <span>{{ number[2] }}</span>
          </div>
        </tiny-col>
        <tiny-col :span="5">
          <div class="col">
            <span>{{ $t('work.index.classes') }}</span>
            <span>{{ number[3] }}</span>
          </div>
        </tiny-col>
      </tiny-row>
    </tiny-layout>
  </div>
</template>

<script lang="ts" setup>
  import {
    Layout as TinyLayout,
    Row as TinyRow,
    Col as TinyCol,
    Select as TinySelect,
    Option as TinyOption,
    Loading,
  } from '@huawei/tiny-vue';
  import { reactive, onMounted, watch, ref } from 'vue';
  import { getUserTrain, getUserChange } from '@/api/board';

  // 加载效果
  const state = reactive<{
    loading: any;
    options: any;
    project: string;
  }>({
    loading: null,
    options: [] as any,
    project: '',
  });

  // 请求数据接口方法
  const fetchData = async () => {
    state.loading = Loading.service({
      text: 'loading...',
      target: document.getElementById('container'),
      background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
      const { data } = await getUserTrain();
      state.options = data.options;
    } finally {
      state.loading.close();
    }
  };

  // 初始化请求数据
  onMounted(() => {
    fetchData();
  });

  // 切换数据
  let number = ref([]);
  const fetchSelect = async (param: string) => {
    const { data } = await getUserChange(param);
    number.value = data;
  };

  // 切换数据
  watch(
    state,
    (newValue, oldValue) => {
      fetchSelect(newValue.project);
    },
    { immediate: true }
  );
</script>

<style scoped lang="less">
  .margin-bottom {
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
  }

  .col > span {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    text-align: center;
  }

  .col > span:first-child {
    color: #010407;
    font-weight: 500;
  }

  .col > span:last-child {
    font-weight: 900;
    font-size: large;
  }

  .select {
    position: relative;
    bottom: 41px;
    left: 71%;
    width: 30%;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .margin-bottom {
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
</style>
