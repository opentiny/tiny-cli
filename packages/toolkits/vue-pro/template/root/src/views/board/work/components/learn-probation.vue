<template>
  <tiny-layout>
    <tiny-row :flex="true" justify="center" class="margin-bottom">
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.unpark') }}</span>
          <span style="color: brown">0</span>
        </div>
      </tiny-col>
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.entered') }}</span>
          <span style="color: rgb(30, 255, 0)">186</span>
        </div>
      </tiny-col>
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.approved') }}</span>
          <span>321</span>
        </div>
      </tiny-col>
      <tiny-col :span="4">
        <div class="col">
          <span>{{ $t('work.index.put') }}</span>
          <span style="color: red">736</span>
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
