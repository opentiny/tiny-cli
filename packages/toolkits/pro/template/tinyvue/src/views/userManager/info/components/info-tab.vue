<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <div class="user-add-btn">
        <tiny-button
          v-permission="'user::add'"
          type="primary"
          @click="handleAddUser"
          >{{ $t('userInfo.modal.title.add') }}
        </tiny-button>
      </div>
      <div class="table">
        <tiny-grid
          ref="grid"
          :fetch-data="fetchDataOption"
          :pager="pagerConfig"
          :auto-resize="true"
          remote-filter
        >
          <tiny-grid-column type="index" width="60"></tiny-grid-column>
          <tiny-grid-column type="expand" width="60">
            <template #default="data">
              <ul>
                <li>
                  <span>{{ $t('userInfo.table.id') }}：</span>
                  <span>{{ data.row.id }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.name') }}：</span>
                  <span>{{ data.row.name }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.email') }}：</span>
                  <span>{{ $t(`${data.row.email}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.department') }}：</span>
                  <span>{{ $t(`${data.row.department}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.employeeType') }}：</span>
                  <span>{{ $t(`${data.row.employeeType}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.job') }}：</span>
                  <span>{{ $t(`${data.row.role[0].name}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.probationStart') }}：</span>
                  <span>{{ $t(`${data.row.probationStart}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.probationEnd') }}：</span>
                  <span>{{ $t(`${data.row.probationEnd}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.probationDuration') }}：</span>
                  <span>{{ $t(`${data.row.probationDuration}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('userInfo.table.protocolStart') }}：</span>
                  <span>{{ $t(`${data.row.protocolStart}`) }}</span></li
                >
                <li>
                  <span>{{ $t('userInfo.table.protocolEnd') }}：</span>
                  <span>{{ $t(`${data.row.protocolEnd}`) }}</span></li
                >
                <li>
                  <span>{{ $t('userInfo.table.address') }}：</span>
                  <span>{{ $t(`${data.row.address}`) }}</span></li
                >
                <li>
                  <span>{{ $t('userInfo.table.status') }}：</span>
                  <span v-if="data.row.status == 1">已启用</span>
                  <span v-if="data.row.status !== 1">已禁用</span>
                </li>
              </ul>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="id" :title="$t('userInfo.table.id')">
            <template #default="data">
              <span>{{ $t(`${data.row.id}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="name"
            :filter="inputFilter"
            :title="$t('userInfo.table.name')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="email"
            :filter="inputFilter"
            :title="$t('userInfo.table.email')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.email}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="department"
            :title="$t('userInfo.table.department')"
          >
            <template #default="data">
              <span v-if="data.row.department !== null">{{
                $t(`${data.row.department}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="employeeType"
            :title="$t('userInfo.table.employeeType')"
          >
            <template #default="data">
              <span v-if="data.row.employeeType !== null">{{
                $t(`${data.row.employeeType}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="role"
            :filter="jobFilter"
            :title="$t('userInfo.table.job')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.role[0]?.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="probationStart"
            :title="$t('userInfo.table.probationStart')"
          >
            <template #default="data">
              <span v-if="data.row.probationStart !== null">{{
                $t(`${data.row.probationStart}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="probationEnd"
            :title="$t('userInfo.table.probationEnd')"
          >
            <template #default="data">
              <span v-if="data.row.probationEnd !== null">{{
                $t(`${data.row.probationEnd}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="probationDuration"
            :title="$t('userInfo.table.probationDuration')"
          >
            <template #default="data">
              <span v-if="data.row.probationDuration !== null"
                >{{ $t(`${data.row.probationDuration}`)
                }}{{ $t('userInfo.day') }}</span
              >
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="protocolStart"
            :title="$t('userInfo.table.protocolStart')"
          >
            <template #default="data">
              <span v-if="data.row.protocolStart !== null">{{
                $t(`${data.row.protocolStart}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="protocolEnd"
            :title="$t('userInfo.table.protocolEnd')"
          >
            <template #default="data">
              <span v-if="data.row.protocolEnd !== null">{{
                $t(`${data.row.protocolEnd}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="address"
            :title="$t('userInfo.table.address')"
          >
            <template #default="data">
              <span v-if="data.row.address !== null">{{
                $t(`${data.row.address}`)
              }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="status" :title="$t('userInfo.table.status')">
            <template #default="data">
              <div v-if="data.row.status == 1">
                <img
                  style="width: 20px"
                  src="@/assets/images/success.png"
                  alt="success"
                />
              </div>
              <div v-if="data.row.status !== 1">
                <img
                  style="width: 20px"
                  src="@/assets/images/error.png"
                  alt="error"
                />
              </div>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            :title="$t('userInfo.table.operations')"
            align="center"
          >
            <template #default="data">
              <a
                v-permission="'user::update'"
                class="operation-update"
                @click="handleUpdate(data.row.email)"
              >
                {{ $t('userInfo.table.operations.update') }}
              </a>
              <a
                v-permission="'user::remove'"
                class="operation-delete"
                @click="handleDelete(data.row.email)"
              >
                {{ $t('userInfo.table.operations.delete') }}
              </a>
              <a
                v-permission="'user::password::force-update'"
                class="operation-pwd-update"
                @click="handlePwdUpdate(data.row.email)"
              >
                {{ $t('userInfo.table.operations.pwdUpdate') }}
              </a>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </div>
    </div>
  </div>
  <div v-if="state.isUserAdd">
    <tiny-modal
      v-model="state.isUserAdd"
      :lock-scroll="true"
      mask-closable="true"
      height="auto"
      width="800"
      :title="$t('userInfo.modal.title.add')"
    >
      <UserAdd @confirm="onAddConfirm"></UserAdd>
    </tiny-modal>
  </div>
  <div v-if="state.isUserUpdate">
    <tiny-modal
      v-model="state.isUserUpdate"
      :lock-scroll="true"
      mask-closable="true"
      height="auto"
      width="800"
      :title="$t('userInfo.modal.title.update')"
    >
      <UserSetting
        :email="state.email"
        @cancel="onUpdateCancel"
        @confirm="onUserUpdateConfirm"
      ></UserSetting>
    </tiny-modal>
  </div>
  <div v-if="state.isPwdUpdate">
    <tiny-modal
      v-model="state.isPwdUpdate"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
      width="600"
      :title="$t('userInfo.modal.title.pwdUpdate')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.pwdData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item :label="$t('userInfo.table.email')">
                  <label>{{ state.pwdData.email }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('userInfo.modal.input.newPassword')"
                  prop="newPassword"
                >
                  <tiny-input
                    v-model="state.pwdData.newPassword"
                    type="password"
                    show-password
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('userInfo.modal.input.confirmNewPassword')"
                  prop="confirmNewPassword"
                >
                  <tiny-input
                    v-model="state.pwdData.confirmNewPassword"
                    type="password"
                    show-password
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handlePwdUpdateSubmit"
          >{{ $t('menu.btn.confirm') }}
        </tiny-button>
        <tiny-button @click="handlePwdUpdateCancel"
          >{{ $t('menu.btn.cancel') }}
        </tiny-button>
      </template>
    </tiny-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Loading,
    GridColumn as TinyGridColumn,
    Grid as TinyGrid,
    Pager as TinyPager,
    Modal as TinyModal,
    Button as TinyButton,
    Form as TinyForm,
    FormItem as TinyFormItem,
    Row as TinyRow,
    Col as TinyCol,
    Input as TinyInput,
  } from '@opentiny/vue';
  import { useUserStore } from '@/store';
  import { getAllUser, deleteUser, updatePwdAdmin } from '@/api/user';
  import { useRouter } from 'vue-router';
  import { getAllRole } from '@/api/role';
  import { FilterType } from '@/types/global';
  import UserAdd from '../../useradd/index.vue';
  import UserSetting from '../../setting/index.vue';

  const { t } = useI18n();
  const router = useRouter();
  const grid = ref();
  // 加载效果
  const state = reactive<{
    loading: any;
    tableData: any;
    pageData: any;
    isPwdUpdate: boolean;
    isUserAdd: boolean;
    isUserUpdate: boolean;
    pwdData: any;
    email: string;
  }>({
    loading: null,
    tableData: [] as any,
    pageData: [] as any,
    isPwdUpdate: false,
    isUserAdd: false,
    isUserUpdate: false,
    pwdData: {} as any,
    email: '',
  });

  // 变量设置
  const userStore = useUserStore();

  const inputFilter = {
    inputFilter: true,
  };

  const jobFilter = ref({
    multi: true,
    enumable: true,
    values: (await getAllRole()).data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    }),
  });

  const pagerConfig = reactive({
    component: TinyPager,
    attrs: {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20],
      total: 10,
      layout: 'total, prev, pager, next, jumper, sizes',
    },
  });

  // 校验规则
  const rulesType = {
    required: true,
    trigger: 'blur',
  };
  const rules = computed(() => {
    return {
      newPassword: [rulesType],
      confirmNewPassword: [rulesType],
    };
  });

  // 请求数据接口方法
  const fetchData = async (
    params: { pageIndex: 1; pageSize: 10 },
    filters: FilterType,
  ) => {
    userStore.setInfo({ reset: false, submit: false });
    state.loading = Loading.service({
      text: 'loading...',
      target: document.getElementById('contain'),
      background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
      const { data } = await getAllUser(
        params.pageIndex,
        params.pageSize,
        filters,
      );
      const total = data.meta.totalItems;
      return {
        result: data.items,
        page: { total },
      };
    } finally {
      state.loading.close();
    }
  };

  const fetchDataOption = reactive({
    api: ({ page, filters }: any) => {
      const { currentPage, pageSize } = page;
      return fetchData(
        {
          pageIndex: currentPage,
          pageSize,
        },
        filters,
      );
    },
    filter: true,
  });

  const onUpdateCancel = () => {
    state.isUserUpdate = false;
  };
  const onUserUpdateConfirm = async () => {
    grid.value.handleFetch().then(() => {
      state.isUserUpdate = false;
    });
  };
  const onAddConfirm = async () => {
    grid.value.handleFetch().then(() => {
      state.isUserAdd = false;
    });
  };

  const handleDelete = async (email: string) => {
    deleteUser(email)
      .then((res) => {
        TinyModal.message({
          message: '已删除',
          status: 'success',
        });
        grid.value.handleFetch();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || '未知错误';
          TinyModal.message({
            message: errorMessage,
            status: 'error',
          });
        }
      });
  };

  const handleUpdate = (email: string) => {
    state.isUserUpdate = true;
    state.email = email;
  };

  const handlePwdUpdate = (email: string) => {
    state.isPwdUpdate = true;
    state.pwdData.email = email;
  };

  const handlePwdUpdateCancel = () => {
    state.isPwdUpdate = false;
    state.pwdData = {} as any;
  };

  const handleAddUser = () => {
    state.isUserAdd = true;
  };

  async function handlePwdUpdateSubmit() {
    let data = state.pwdData;
    let newTemp = {
      email: data.email,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };
    if (newTemp.newPassword !== newTemp.confirmNewPassword) {
      TinyModal.message({
        message: t('userInfo.modal.message.error'),
        status: 'error',
      });
    } else {
      try {
        await updatePwdAdmin(newTemp);
        TinyModal.message({
          message: t('baseForm.form.submit.success'),
          status: 'success',
        });
        state.pwdData = {} as any;
        state.isPwdUpdate = false;
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || '未知错误';
          TinyModal.message({
            message: errorMessage,
            status: 'error',
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .user-add-btn {
    padding: 10px 0 10px 10px;
  }

  #contain {
    height: 100%;
    padding: 15px;
    overflow: hidden;
  }

  .table {
    padding-bottom: 20px;
    background-color: #fff;
  }

  .operation {
    &-delete {
      padding-right: 5px;
      color: red;
    }

    &-update {
      padding-right: 5px;
      color: #1890ff;
    }

    &-pwd-update {
      color: orange;
    }
  }
</style>
