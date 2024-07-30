<template>
  <div class="container-set">
    <Breadcrumb :items="['menu.userManager', 'menu.userManager.setting']"/>
    <div class="general-card">
      <div class="general-top">
        <headtop :userData="state.userData"></headtop>
      </div>
      <div class="general-contain">

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
                  <tiny-input v-model="state.userData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userSetting.address')" prop="position">
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
                <tiny-form-item :label="$t('userSetting.position')" prop="position">
                  <tiny-select
                    v-model="state.userData.roleIds"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                  >
                    <tiny-option
                      v-for="item in (state.roleData as any)"
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
                <tiny-form-item :label="$t('userSetting.type')" prop="type">
                  <tiny-select
                    v-model="state.userData.employeeType"
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
                    v-model="state.probationDate"
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
                  <tiny-input v-model="state.userData.probationDuration"></tiny-input>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userSetting.startTime')" prop="startTime">
                  <tiny-date-picker
                    v-model="state.userData.protocolStart"
                    @blur="handleBlur"
                  ></tiny-date-picker>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userSetting.endTime')" prop="endTime">
                  <tiny-date-picker
                    v-model="state.userData.protocolEnd"
                    @blur="handleBlur"
                  ></tiny-date-picker>
                </tiny-form-item>
              </tiny-col>
              <tiny-col :span="5" label-width="100px">
                <tiny-form-item :label="$t('userSetting.status')" prop="type">
                  <tiny-select
                    v-model="state.userData.status"
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

        <div class="general-btn">
          <tiny-button
            type="primary"
            native-type="submit"
            @click="handleSubmit"
          >{{ $t('userSetting.save') }}
          </tiny-button
          >
          <tiny-button @click="handleFormReset">
            {{ $t('userSetting.cancel') }}
          </tiny-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import {useI18n} from 'vue-i18n';
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
import {getSimpleDate} from '@/utils/time';
import {useRoute, useRouter} from 'vue-router';
import {getAllUser, getUserInfo, updateUserInfo} from '@/api/user'
import {getRoles} from '@/api/role'

import headtop from './components/head.vue';
import setFrom from './components/set-from.vue';


const route = useRoute();
const router = useRouter();

// 加载效果
const state = reactive<{
  userData: any;
  probationDate: any;
  roleData: any;
}>({
  userData: [] as any,
  probationDate: [] as any,
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


// 初始化请求数据
onMounted(() => {
  fecthData();
  fetchRole()
});

const {t} = useI18n();

// btn操作
function handleFormReset() {
  router.back();
}

async function handleSubmit() {
  let data = state.userData;
  if(data.status === 'Active'){data.status = 1}
  else{ data.status = 2 }
  let newTemp = {
    email: data.email,
    name: data.name,
    address: data.address,
    department: data.department,
    roleIds: [data.roleIds],
    employeeType: data.employeeType,
    probationStart: getSimpleDate(state.probationDate[0]),
    probationEnd: getSimpleDate(state.probationDate[1]),
    probationDuration: data.probationDuration,
    protocolStart: getSimpleDate(data.protocolStart),
    protocolEnd: getSimpleDate(data.protocolEnd),
    status: data.status,
  };
  await updateUserInfo(newTemp).then((res) =>{
    Modal.message({
      message: t('baseForm.form.submit.success'),
      status: 'success',
    });
  });

  handleFormReset();

}

async function fecthData() {
  if (route.query.email !== undefined || null) {
    const {data} = await getUserInfo(route.query.email);
    if (data.status === 1) {
      data.status = statusData[0].label
    } else {
      data.status = statusData[1].label
    }
    if(data.role !== null){
      data.roleIds = data.role[0].id
      data.roleName = data.role[0].name
    }
    state.userData = data;
    state.probationDate = [data.probationStart, data.probationEnd]
  }
}

async function fetchRole(){
  const {data} = await getRoles();
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
      justify-content: flex-start;
      min-height: 75%;
      padding: 30px 0 10px 20px;
      color: black;
      background-color: #fff;
      border-radius: 10px;

      .tiny-layout {
        width: 80%;
      }
    }

    .general-btn {
      position: relative;
      left: 160px;

      button {
        width: 100px;
        height: 36px;
        border-radius: 4px;
      }
    }

    .margin-bottom {
      margin: 15px 0;
    }

    .col {
      padding: 4px 0;
      color: #fff;
    }
  }
}
</style>
