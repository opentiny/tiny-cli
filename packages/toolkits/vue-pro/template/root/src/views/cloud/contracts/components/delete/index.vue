<template>
  <div class="container">
    <h3>{{ $t('menu.cloud.del') }}</h3>
    <div class="contain">
      <div>
        {{ $t('menu.cloud.askDel') }}
        <b>{{ $t('menu.cloud.askContracts') }}</b
        >？
      </div>
      <div>
        {{ $t('menu.cloud.askInput') }}
        <span class="del">DELETE</span>
        {{ $t('menu.cloud.askSure') }}
      </div>
      <tiny-input v-model="value"></tiny-input>
      <div class="title">{{ props.init.name }}</div>
      <div class="btn">
        <tiny-button type="primary" @click="handleSubmit">
          {{ $t('menu.cloud.sure') }}
        </tiny-button>
        <tiny-button @click="handleCancel">
          {{ $t('menu.cloud.cancel') }}
        </tiny-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineEmits, defineProps } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Input as TinyInput,
    Button as TinyButton,
    Modal,
  } from '@huawei/tiny-vue';

  // 注册
  const { t } = useI18n();
  const value = ref('');
  const props = defineProps({
    // eslint-disable-next-line vue/require-prop-types
    init: {} as any,
  });

  const handleCancel = () => {
    emit('mycancel');
  };

  // 注册提交
  const handleSubmit = () => {
    if (value.value === 'DELETE') {
      Modal.message({
        message: t('menu.cloud.deleteSuccess'),
        status: 'success',
      });
      emit('myclick');
    } else {
      Modal.message({
        message: t('menu.cloud.validateError'),
        status: 'warning',
      });
    }
  };

  // 定义派发事件
  const emit = defineEmits(['myclick', 'mycancel']);
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    margin: 10px;

    h3 {
      margin-left: -5%;
    }
  }

  .contain {
    margin-top: 5%;
    margin-left: -6%;
    padding: 20px 10px;
    color: var(--ti-common-color-text-secondary);
    font-size: 14px;
    line-height: var(--ti-formfield-item-required-label-line-height);

    .btn {
      margin-top: 6%;
      margin-left: 40%;
    }

    .del {
      color: red;
    }

    div {
      margin-bottom: 3%;
    }

    .title {
      height: 36px;
      margin-top: 13px;
      text-align: center;
      background: aliceblue;
      border: 1px solid aliceblue;
    }
  }
</style>
