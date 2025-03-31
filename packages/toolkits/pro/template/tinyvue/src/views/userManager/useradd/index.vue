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
                <tiny-form-item :label="$t('userAdd.email')" prop="email">
                  <tiny-input v-model="state.userData.email"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userAdd.password')" prop="password">
                  <tiny-input
                    v-model="state.userData.password"
                    type="password"
                    show-password
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userAdd.name')" prop="name">
                  <tiny-input v-model="state.userData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userAdd.address')" prop="address">
                  <tiny-input v-model="state.userData.address"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userAdd.department')"
                  prop="department"
                >
                  <tiny-input v-model="state.userData.department"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userAdd.position')" prop="roleIds">
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
                <tiny-form-item :label="$t('userAdd.type')" prop="employeeType">
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
                  :label="$t('userAdd.date')"
                  prop="probationDate"
                >
                  <tiny-date-picker
                    v-model="state.userData.probationDate"
                    unlink-panels
                    type="daterange"
                    range-separator="-"
                    :start-placeholder="$t('userAdd.first')"
                    :end-placeholder="$t('userAdd.last')"
                  ></tiny-date-picker>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userAdd.during')"
                  prop="probationDuration"
                >
                  <tiny-input
                    v-model="state.userData.probationDuration"
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item
                  :label="$t('userAdd.startTime')"
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
                  :label="$t('userAdd.endTime')"
                  prop="protocolEnd"
                >
                  <tiny-date-picker
                    v-model="state.userData.protocolEnd"
                    @blur="handleBlur"
                  ></tiny-date-picker>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userAdd.status')" prop="status">
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
            v-permission="'user::add'"
            type="primary"
            native-type="submit"
            @click="handleSubmit"
            >{{ $t('userAdd.save') }}
          </tiny-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
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
  import { registerUser } from '@/api/user';
  import { getAllRole } from '@/api/role';

  // 初始化请求数据
  onMounted(() => {
    fetchRole();
  });

  const { t } = useI18n();

  // 加载效果
  const state = reactive<{
    userData: any;
    roleData: any;
  }>({
    userData: {} as any,
    roleData: [] as any,
  });

  const setFormRef = ref();

  const emit = defineEmits<{
    confirm: [];
  }>();

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
      email: [rulesType],
      password: [rulesType],
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

  async function handleSubmit() {
    setFormRef.value
      .validate()
      .then(async () => {
        let data = state.userData;
        if (data.status === 'Active') {
          data.status = 1;
        } else {
          data.status = 2;
        }
        let newTemp = {
          email: data.email,
          password: data.password,
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
          await registerUser(newTemp);
          Modal.message({
            message: t('baseForm.form.submit.success'),
            status: 'success',
          });
          state.userData = {} as any;
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
      })
      .catch(() => {});
  }

  async function fetchRole() {
    const { data } = await getAllRole();
    state.roleData = data;
  }

  // 结束时间校验
  const handleBlur = () => {
    const start = state.userData.protocolStart?.getTime();
    const end = state.userData.protocolEnd?.getTime();
    if (end < start) {
      state.userData.protocolEnd = '';
      Modal.message({
        message: t('userInfo.time.message'),
        status: 'error',
      });
    }
  };
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
