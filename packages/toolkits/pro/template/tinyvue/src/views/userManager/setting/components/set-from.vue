<template>
  <tiny-layout>
    <tiny-form
      ref="setFormRef"
      :model="state.filterOptions"
      :rules="rules"
      label-width="150px"
      :label-align="true"
      label-position="left"
      size="small"
    >
      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item
            :label="$t('userSetting.name')"
            prop="department"
          >
            <tiny-input v-model="state.filterOptions.name"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.address')" prop="position">
            <tiny-input v-model="state.filterOptions.address"></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item
            :label="$t('userSetting.department')"
            prop="department"
          >
            <tiny-input v-model="state.filterOptions.department"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.position')" prop="position">
            <tiny-input v-model="state.filterOptions.position"></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.type')" prop="type">
            <tiny-select
              v-model="state.filterOptions.type"
              :placeholder="$t('baseForm.form.label.placeholder')"
            >
              <tiny-option
                v-for="item in (projectData as any)"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.label"
              ></tiny-option>
            </tiny-select>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.date')" prop="date">
            <tiny-date-picker
              v-model="state.filterOptions.date"
              unlink-panels
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('userSetting.first')"
              :end-placeholder="$t('userSetting.last')"
            ></tiny-date-picker>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.during')" prop="during">
            <tiny-input v-model="state.filterOptions.during"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.startTime')" prop="startTime">
            <tiny-date-picker
              v-model="state.filterOptions.startTime"
              @blur="handleBlur"
            ></tiny-date-picker>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>

      <tiny-row :flex="true" justify="left">
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.endTime')" prop="endTime">
            <tiny-date-picker
              v-model="state.filterOptions.endTime"
              @blur="handleBlur"
            ></tiny-date-picker>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="5" label-width="100px">
          <tiny-form-item :label="$t('userSetting.status')" prop="type">
            <tiny-select
              v-model="state.filterOptions.status"
              :placeholder="$t('baseForm.form.label.placeholder')"
            >
              <tiny-option
                v-for="item in (statusData as any)"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.label"
              ></tiny-option>
            </tiny-select>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
    </tiny-form>
  </tiny-layout>
</template>

<script lang="ts" setup>
import {ref, reactive, defineProps, computed, defineExpose, onMounted} from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Select as TinySelect,
    Option as TinyOption,
    Layout as TinyLayout,
    Form as TinyForm,
    FormItem as TinyFormItem,
    Row as TinyRow,
    Col as TinyCol,
    Input as TinyInput,
    DatePicker as TinyDatePicker,
    Modal,
  } from '@opentiny/vue';


  const props = defineProps({
    userData: {} as any
  })

  interface FilterOptions {
    department: string;
    position: Array<object>;
    type: Array<object>;
    date: Array<object>;
    during: Array<object>;
    startTime: string;
    endTime: string;
    name: string;
    address: string;
    status: number;
  }

  const projectData = [
    {
      value: '1',
      label: 'Social Recruitment',
    },
    {
      value: '2',
      label: 'School Recruitment',
    },
    {
      value: '3',
      label: 'Job Transfer',
    },
  ];

  const statusData = [
    {
      value: 1,
      label: 'Active',
    },
    {
      value: 2,
      label: 'Disabled',
    },
  ];

  // 加载效果
  const state = reactive<{
    filterOptions: FilterOptions;
  }>({
    filterOptions: {
      name: props.userData.name,
      address: props.userData.address,
      department: props.userData.department,
      position: '',
      type: props.userData.employeeType,
      date: [props.userData.probationStart,props.userData.probationEnd],
      during: props.userData.probationDuration,
      startTime: props.userData.protocolStart,
      endTime: props.userData.protocolEnd,
      status: '',
    } as FilterOptions,
  });

  // 初始化请求数据
  const setFormRef = ref();
  const { t } = useI18n();

  // 校验规则
  const rulesType = {
    required: true,
    trigger: 'blur',
  };
  const rulesSelect = {
    required: true,
    message: '必选',
    trigger: 'blur',
  };
  const rules = computed(() => {
    return {
      department: [rulesType],
      position: [rulesType],
      type: [rulesSelect],
      date: [rulesType],
      during: [rulesType],
      startTime: [rulesType],
      endTime: [rulesType],
      name:[rulesType],
      address: [rulesType],
      status: [rulesSelect],
    };
  });

  // 结束时间校验
  const handleBlur = () => {
    const start = state.filterOptions.startTime?.getTime();
    const end = state.filterOptions.endTime?.getTime();
    if (end < start) {
      state.filterOptions.endTime = '';
      Modal.message({
        message: t('userInfo.time.message'),
        status: 'error',
      });
    }
  };
  const setFormValid = () => {
    let setValidate = false;
    setFormRef.value.validate((valid: boolean) => {
      setValidate = valid;
    });

    return setValidate;
  };

  const setReset = () => {
    state.filterOptions = {} as FilterOptions;
  };

  const setData = () => {
    return state;
  };

  defineExpose({
    setData,
    setFormValid,
    setReset,
  });
</script>

<style scoped lang="less">
  :deep(.tiny-row) {
    margin-bottom: 15px;
  }
</style>
