<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <div class="permission-add-btn">
        <tiny-button type="primary" @click="handleAddPermission">添加权限</tiny-button>
      </div>
      <div class="table">
        <tiny-grid ref="expandGrid"
                   :data="state.tableData"
                   :auto-resize="true"
        >
          <tiny-grid-column
            field="name"
            :title="$t('permissionInfo.table.id')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.id}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('permissionInfo.table.desc')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.desc}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('permissionInfo.table.name')">
            <template #default="data">
              <span>{{ $t(`${data.row.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            :title="$t('permissionInfo.table.operations')"
            align="center"
          >
            <template v-slot="data">
              <a class="operation-update" @click="handleUpdate(data.row.id)">
                {{ $t('permissionInfo.table.operations.update') }}
              </a>
              <a class="operation-delete" @click="handleDelete(data.row.id)">
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
      height="350"
      width="600"
      :title="$t('permissionInfo.modal.title.update')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.permissionUpdData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            size="small"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.id')"
                >
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
                  <tiny-input v-model="state.permissionUpdData.desc"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.name')"
                  prop="name"
                >
                  <tiny-input v-model="state.permissionUpdData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handlePermissionUpdateSubmit">确定</tiny-button>
        <tiny-button @click="handlePermissionUpdateCancel">取消</tiny-button>
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
      height="350"
      width="600"
      :title="$t('permissionInfo.modal.title.add')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.permissionAddData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            size="small"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.permission')"
                  prop="desc"
                >
                  <tiny-input v-model="state.permissionAddData.desc"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('permissionInfo.modal.input.name')"
                  prop="name"
                >
                  <tiny-input v-model="state.permissionAddData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handlePermissionAddSubmit">确定</tiny-button>
        <tiny-button @click="handlePermissionAddCancel">取消</tiny-button>
      </template>
    </tiny-modal>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted, watch, computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {
  Tabs as TinyTabs,
  TabItem as TinyTabItem,
  Loading,
  GridColumn as TinyGridColumn,
  Grid as TinyGrid, Pager as TinyPager, Modal as TinyModal,
  Button as TinyButton,
  Form as TinyForm,
  FormItem as TinyFormItem,
  Row as TinyRow,
  Col as TinyCol,
  Input as TinyInput, Modal,
} from '@opentiny/vue';
import {IconChevronDown} from '@opentiny/vue-icon';
import {useUserStore} from '@/store';
import {getAllPermission, updatePermission ,createPermission, deletePermission} from '@/api/permission';
import { useRouter } from 'vue-router';
import {getSimpleDate} from "@/utils/time";
import {updateUserInfo} from "@/api/user";

const router = useRouter();

const {t} = useI18n();

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

// 变量设置
const userStore = useUserStore();

// 校验规则
const rulesType = {
  required: true,
  trigger: 'blur',
};
const rules = computed(() => {
  return {
    name: [rulesType],
    desc: [rulesType]
  };
});

// 初始化请求数据
onMounted(() => {
  fetchData();
});

// 请求数据接口方法
async function fetchData() {
  const {data} = await getAllPermission();
  state.tableData = data;
};

async function handleDelete (id: string){
  try {
    await deletePermission(id);
    TinyModal.message({
      message: '已删除',
      status: 'success',
    });
    state.isPermissionUpdate = false;
    state.permissionUpdData = {} as any;
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

const handleUpdate = (id: string) => {
  state.isPermissionUpdate = true;
  state.permissionUpdData = state.tableData[id - 1];
}

const handlePermissionUpdateCancel =()=>{
  state.isPermissionUpdate = false;
  state.permissionUpdData = {} as any;
}

async function handlePermissionUpdateSubmit(){
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

function handleAddPermission() {
  state.isPermissionAdd = true;
}

async function handlePermissionAddSubmit() {
  let data = state.permissionAddData;
  let newTemp = {
    id: data.id,
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

.permission-add-btn{
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
