<template>
  <div class="container">
    <h3>{{ $t('menu.cloud.create') }}</h3>
    <div class="contain">
      <tiny-form
        ref="ruleForm"
        :model="createData"
        :rules="rules"
        :validate-on-rule-change="isvalidate"
        :label-align="true"
        label-position="right"
        label-width="100px"
      >
        <tiny-form-item :label="$t('menu.cloud.name')" prop="name">
          <div>
            <tiny-input v-model="createData.name"></tiny-input>
            <div class="tip">{{ $t('menu.cloud.tip') }}</div>
          </div>
        </tiny-form-item>
        <tiny-form-item :label="$t('menu.cloud.customer')" prop="customer">
          <tiny-input v-model="createData.customer"></tiny-input>
        </tiny-form-item>
        <tiny-form-item
          :label="$t('menu.cloud.description')"
          prop="description"
        >
          <tiny-input
            v-model="createData.description"
            type="textarea"
          ></tiny-input>
        </tiny-form-item>
        <tiny-form-item class="btn">
          <tiny-button type="primary" @click="handleSubmit">
            {{ $t('menu.cloud.sure') }}
          </tiny-button>
          <tiny-button @click="handleCancel">
            {{ $t('menu.cloud.cancel') }}
          </tiny-button>
        </tiny-form-item>
      </tiny-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, defineEmits, defineExpose } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Form as TinyForm,
    FormItem as TinyFormItem,
    Input as TinyInput,
    Button as TinyButton,
    Modal,
  } from '@huawei/tiny-vue';

  // 注册
  const { t } = useI18n();
  const ruleForm = ref();

  // 校验格式
  const validatePass = (
    rule: any,
    value: string,
    callback: (arg0: Error | undefined) => void
  ) => {
    // eslint-disable-next-line no-useless-escape
    if (!/^(?!\s*$)[A-Za-z0-9._\-\(\)\u4e00-\u9fa5\（）\s-]+$/.test(value)) {
      callback(new Error(t('login.form.checkPassword')));
    } else {
      if (ruleForm.value.password !== '') {
        ruleForm.value.validateField('password');
      }
      callback(undefined);
    }
  };

  let createData = reactive({
    name: '',
    customer: '',
    description: '',
  });

  let isvalidate = ref(true);

  const rules = computed(() => {
    return {
      name: [
        {
          required: true,
          message: t('menu.cloud.validateError'),
          trigger: 'blur',
        },
        { validator: validatePass, trigger: 'blur' },
      ],
      customer: [
        {
          required: false,
          trigger: 'blur',
        },
      ],
      description: [
        {
          required: false,
          trigger: 'change',
        },
      ],
    };
  });

  const resultData = () => {
    return createData;
  };

  const handleCancel = () => {
    emit('mycancel');
  };

  // 注册提交
  const handleSubmit = () => {
    ruleForm.value.validate((e: any) => {
      if (e) {
        let data: any = reactive({
          username: createData.name,
        });
        Modal.message({
          message: t('menu.cloud.createSuccess'),
          status: 'success',
        });
        emit('myclick');
      } else {
        Modal.message({
          message: t('menu.cloud.validateError'),
          status: 'warning',
        });
      }
    });
  };

  // 定义派发事件
  const emit = defineEmits(['myclick', 'mycancel']);
  defineExpose({
    resultData,
  });
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
    padding: 0 10px;
    color: var(--ti-common-color-text-secondary);
    font-size: var(--ti-default-font-size);
    line-height: var(--ti-formfield-item-required-label-line-height);

    .tip {
      color: #999;
      font-size: var(--ti-common-font-size-base);
    }

    .btn {
      margin-top: 6%;
      margin-left: 28%;
    }
  }
</style>
