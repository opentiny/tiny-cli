<template>
  <tiny-layout>
    <tiny-row :flex="true" justify="center" class="margin-bottom">
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.plans') }}</span>
          <span style="color: brown">1111</span>
        </div>
      </tiny-col>
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.Unfinished') }}</span>
          <span style="color: red">177</span>
        </div>
      </tiny-col>
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.beOverdue') }}</span>
          <span>1111</span>
        </div>
      </tiny-col>
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.Overdue') }}</span>
          <span style="color: red">1111</span>
        </div>
      </tiny-col>
    </tiny-row>
  </tiny-layout>
</template>

<script lang="ts" setup>
  import {
    Layout as TinyLayout,
    Row as TinyRow,
    Col as TinyCol,
  } from '@huawei/tiny-vue';
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
</style>
