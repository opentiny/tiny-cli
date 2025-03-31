<template>
  <div class="container-set">
    <div class="general-card">
      <div class="general-contain">
        <tiny-layout>
          <tiny-form
            ref="setFormRef"
            :model="state.userData"
            :rules="rules"
            label-width="80"
            :label-align="true"
            label-position="left"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userSetting.name')" prop="name">
                  <tiny-input v-model="state.userData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.address')"
                  prop="address"
                >
                  <tiny-input v-model="state.userData.address"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.department')"
                  prop="department"
                >
                  <tiny-input v-model="state.userData.department"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.position')"
                  prop="roleIds"
                >
                  <tiny-select
                    v-model="state.userData.roleIds"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                  >
                    <tiny-option
                      v-for="item in state.roleData as any"
                      :key="item.id"
                      :label="$t(item.name)"
                      :value="item.id"
                    ></tiny-option>
                  </tiny-select>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.type')"
                  prop="employeeType"
                >
                  <tiny-select
                    v-model="state.userData.employeeType"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                  >
                    <tiny-option
                      v-for="item in projectData as any"
                      :key="item.value"
                      :label="$t(item.label)"
                      :value="item.label"
                    ></tiny-option>
                  </tiny-select>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.date')"
                  prop="probationDate"
                >
                  <tiny-date-picker
                    v-model="state.userData.probationDate"
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
                <tiny-form-item
                  :label="$t('userSetting.during')"
                  prop="probationDuration"
                >
                  <tiny-input
                    v-model="state.userData.probationDuration"
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.startTime')"
                  prop="protocolStart"
                >
                  <tiny-date-picker
                    v-model="state.userData.protocolStart"
                    @blur="handleBlur"
                  ></tiny-date-picker>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userSetting.endTime')"
                  prop="protocolEnd"
                >
                  <tiny-date-picker
                    v-model="state.userData.protocolEnd"
                    @blur="handleBlur"
                  ></tiny-date-picker>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userSetting.status')" prop="status">
                  <tiny-select
                    v-model="state.userData.status"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                  >
                    <tiny-option
                      v-for="item in statusData as any"
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

        <div class="general-btn">
          <tiny-button
            v-permission="'user::update'"
            type="primary"
            native-type="submit"
            @click="handleSubmit"
            >{{ $t('userSetting.save') }}
          </tiny-button>
          <tiny-button @click="handleCancel">
            {{ $t('userSetting.cancel') }}
          </tiny-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, defineProps } from 'vue';
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
    Button as TinyButton,
  } from '@opentiny/vue';
  import { getSimpleDate } from '@/utils/time';
  import { getUserInfo, updateUserInfo } from '@/api/user';
  import { getAllRole } from '@/api/role';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();

  const props = defineProps({
    email: String,
  });
  const emit = defineEmits<{
    cancel: [];
    confirm: [];
  }>();
  // 初始化请求数据
  onMounted(() => {
    fetchData(props.email);
    fetchRole();
  });

  // 加载效果
  const state = reactive<{
    userData: any;
    roleData: any;
  }>({
    userData: {} as any,
    roleData: [] as any,
  });

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
      roleIds: [rulesSelect],
      employeeType: [rulesSelect],
      probationDate: [rulesSelect],
      probationDuration: [rulesType],
      protocolStart: [rulesSelect],
      protocolEnd: [rulesSelect],
      name: [rulesType],
      address: [rulesType],
      status: [rulesSelect],
    };
  });

  const { t } = useI18n();

  const handleCancel = () => {
    emit('cancel');
  };

  async function handleSubmit() {
    let data = state.userData;
    if (data.status === 'Active') {
      data.status = 1;
    } else {
      data.status = 2;
    }
    let newTemp = {
      email: data.email,
      name: data.name,
      address: data.address,
      department: data.department,
      roleIds: [data.roleIds],
      employeeType: data.employeeType,
      probationStart: getSimpleDate(data.probationDate[0]),
      probationEnd: getSimpleDate(data.probationDate[1]),
      probationDuration: data.probationDuration,
      protocolStart: getSimpleDate(data.protocolStart),
      protocolEnd: getSimpleDate(data.protocolEnd),
      status: data.status,
    };

    try {
      await updateUserInfo(newTemp);
      Modal.message({
        message: t('baseForm.form.submit.success'),
        status: 'success',
      });
      if (data.email === userStore.email) {
        const { data: userInfo = null } = await getUserInfo();
        userStore.setInfo(userInfo);
      }
      emit('confirm');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || '未知错误';
        Modal.message({
          message: errorMessage,
          status: 'error',
        });
      }
    }
  }

  async function fetchData(email: string) {
    if (email !== undefined || null) {
      const { data } = await getUserInfo(email);
      if (data.status === 1) {
        data.status = statusData[0].label;
      } else {
        data.status = statusData[1].label;
      }
      if (data.role && data.role.length) {
        data.roleIds = data.role[0].id;
        data.roleName = data.role[0].name;
      }
      state.userData = data;
      state.userData.probationDate = [data.probationStart, data.probationEnd];
    }
  }

  async function fetchRole() {
    const { data } = await getAllRole();
    state.roleData = data;
  }
</script>

<style scoped lang="less">
  .container-set {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 98%;
    height: inherit;
    margin: 0 auto;

    .general-card {
      height: 100%;
      padding: 10px;
      overflow-x: hidden;
      overflow-y: auto;
      border-radius: 10px;

      .general-top {
        display: flex;
        justify-content: space-around;
        min-height: 202px;
        margin: 0 -12px;
        overflow: hidden;
        background-image: url('@/assets/images/step-head.png');
        background-size: 100% 100%;
      }

      .general-contain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 75%;
        padding: 30px 0 10px 0;

        .tiny-layout {
          width: 100%;
          margin-left: 8%;
        }
      }

      .general-btn {
        position: relative;
        margin: 0 auto;

        button {
          width: 100px;
          height: 36px;
          border-radius: 4px;
        }
      }

      .col {
        padding: 4px 0;
        color: #fff;
      }
    }
  }
</style>
