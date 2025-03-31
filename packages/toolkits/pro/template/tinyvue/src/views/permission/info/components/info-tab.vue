<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <div class="permission-add-btn">
        <tiny-button
          v-permission="'permission::add'"
          type="primary"
          @click="handleAddPermission"
          >{{ $t('permissionInfo.modal.title.add') }}</tiny-button
        >
      </div>
      <div class="table">
        <tiny-grid
          ref="roleGrid"
          :auto-resize="true"
          :fetch-data="fetchOption"
          :pager="pagerConfig"
          remote-filter
        >
          <tiny-grid-column field="id" :title="$t('permissionInfo.table.id')">
            <template #default="data">
              <span>{{ $t(`${data.row.id}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="name"
            :title="$t('permissionInfo.table.name')"
            :filter="filter"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="desc"
            :title="$t('permissionInfo.table.desc')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.desc}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            :title="$t('permissionInfo.table.operations')"
            align="center"
          >
            <template #default="data">
              <a
                v-permission="'permission::update'"
                class="operation-update"
                @click="handleUpdate(data.row)"
              >
                {{ $t('permissionInfo.table.operations.update') }}
              </a>
              <a
                v-permission="'permission::remove'"
                class="operation-delete"
                @click="handleDelete(data.row)"
              >
                {{ $t('permissionInfo.table.operations.delete') }}
              </a>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </div>
    </div>
  </div>
  <div v-if="state.isPermissionUpdate">
    <tiny-modal
      v-model="state.isPermissionUpdate"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
      width="600"
      :title="$t('permissionInfo.modal.title.update')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            ref="updateForm"
            :model="state.permissionUpdData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item :label="$t('permissionInfo.modal.input.id')">
                  <label>{{ state.permissionUpdData.id }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.permission')"
                  prop="desc"
                >
                  <tiny-input
                    v-model="state.permissionUpdData.desc"
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.name')"
                  prop="name"
                >
                  <tiny-input
                    v-model="state.permissionUpdData.name"
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handlePermissionUpdateSubmit">{{
          $t('menu.btn.confirm')
        }}</tiny-button>
        <tiny-button @click="handlePermissionUpdateCancel">{{
          $t('menu.btn.cancel')
        }}</tiny-button>
      </template>
    </tiny-modal>
  </div>
  <div v-if="state.isPermissionAdd">
    <tiny-modal
      v-model="state.isPermissionAdd"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
      width="600"
      :title="$t('permissionInfo.modal.title.add')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            ref="addForm"
            :model="state.permissionAddData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.permission')"
                  prop="desc"
                >
                  <tiny-input
                    v-model="state.permissionAddData.desc"
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.name')"
                  prop="name"
                >
                  <tiny-input
                    v-model="state.permissionAddData.name"
                  ></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handlePermissionAddSubmit">{{
          $t('menu.btn.confirm')
        }}</tiny-button>
        <tiny-button @click="handlePermissionAddCancel">{{
          $t('menu.btn.cancel')
        }}</tiny-button>
      </template>
    </tiny-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
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
    Modal,
    Layout as TinyLayout,
  } from '@opentiny/vue';
  import { useUserStore } from '@/store';
  import {
    getAllPermission,
    updatePermission,
    createPermission,
    deletePermission,
    Permission,
  } from '@/api/permission';
  import { useRouter } from 'vue-router';
  import {
    FilterType,
    InputFilterValue,
    IPaginationMeta,
    Pager,
  } from '@/types/global';

  const roleGrid = ref();
  const updateForm = ref();
  const addForm = ref();

  const { t } = useI18n();

  // 加载效果
  const state = reactive<{
    tableData: any;
    permissionUpdData: any;
    permissionAddData: any;
    isPermissionUpdate: boolean;
    isPermissionAdd: boolean;
  }>({
    tableData: {} as any,
    permissionUpdData: {} as any,
    permissionAddData: {} as any,
    isPermissionAdd: false,
    isPermissionUpdate: false,
  });

  // 校验规则
  const rulesType = {
    required: true,
    trigger: 'blur',
  };
  const rules = computed(() => {
    return {
      name: [rulesType],
      desc: [rulesType],
    };
  });

  const filter = {
    inputFilter: true,
  };

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

  const fetchOption = {
    api: ({ page, filters }: { page: Pager; filters: FilterType }) => {
      const { name } = filters;
      let exp = '';
      if (name) {
        const value = name.value as InputFilterValue;
        if (value.relation === 'contains') {
          exp += '%';
        }
        exp += value.text;
        if (value.relation === 'startwith' || value.relation === 'contains') {
          exp += '%';
        }
      }
      return fetchData(page.currentPage, page.pageSize, exp).then(
        ({ items, meta }) => {
          return {
            result: items,
            page: {
              total: meta.totalItems,
            },
          };
        },
      );
    },
    filiter: true,
  };

  // 请求数据接口方法
  async function fetchData(page: number, size: number, name?: string) {
    const { data } = await getAllPermission(page, size, name);
    const { items, meta } = data as {
      items: Permission[];
      meta: IPaginationMeta;
    };
    return { items, meta };
  }

  async function handleDelete(permission: Permission) {
    try {
      await deletePermission(permission.id);
      TinyModal.message({
        message: '已删除',
        status: 'success',
      });
      state.isPermissionUpdate = false;
      state.permissionUpdData = {} as any;
      roleGrid.value.handleFetch();
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

  const handleUpdate = (permission: Permission) => {
    state.permissionUpdData = JSON.parse(JSON.stringify(permission));
    state.isPermissionUpdate = true;
  };

  const handlePermissionUpdateCancel = () => {
    state.isPermissionUpdate = false;
    state.permissionUpdData = {} as any;
  };

  async function handlePermissionUpdateSubmit() {
    updateForm.value
      .validate()
      .then(async () => {
        let data = state.permissionUpdData;
        let newTemp = {
          id: data.id,
          name: data.name,
          desc: data.desc,
        };
        try {
          await updatePermission(newTemp);
          Modal.message({
            message: t('baseForm.form.submit.success'),
            status: 'success',
          });
          state.isPermissionUpdate = false;
          state.permissionUpdData = {} as any;
          roleGrid.value.handleFetch();
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

  function handleAddPermission() {
    state.isPermissionAdd = true;
  }

  async function handlePermissionAddSubmit() {
    addForm.value
      .validate()
      .then(async () => {
        let data = state.permissionAddData;
        let newTemp = {
          name: data.name,
          desc: data.desc,
        };
        try {
          await createPermission(newTemp);
          Modal.message({
            message: t('baseForm.form.submit.success'),
            status: 'success',
          });
          state.isPermissionAdd = false;
          state.permissionAddData = {} as any;
          roleGrid.value.handleFetch();
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

  async function handlePermissionAddCancel() {
    state.isPermissionAdd = false;
    state.permissionAddData = {} as any;
  }
</script>

<style scoped lang="less">
  #contain {
    height: 100%;
    padding: 15px;
    overflow: hidden;
  }

  .permission-add-btn {
    padding: 10px 0 10px 10px;
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
