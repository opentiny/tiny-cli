<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <div class="role-add-btn">
        <tiny-button type="primary" @click="handleAddRole">{{ $t('roleInfo.modal.title.add') }}</tiny-button>
      </div>
      <div class="table">
        <tiny-grid ref="expandGrid"
                   :data="state.tableData"
                   :auto-resize="true"
        >
          <tiny-grid-column type="index" width="60"></tiny-grid-column>
          <tiny-grid-column type="expand" width="60">
            <template #default="data">
              <ul>
                <li>
                  <span>{{ $t('roleInfo.table.id') }}:</span>
                  <span>{{ $t(`${data.row.id}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('roleInfo.table.name') }}:</span>
                  <span>{{ $t(`${data.row.name}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('roleInfo.table.desc') }}:</span>
                  <div v-for="item in data.row.permission" :key="item.id">
                    <span>{{ $t('permissionInfo.table.id')}}:{{ $t(`${item.id}`) }}&nbsp;
                        {{ $t('permissionInfo.table.name')}}:{{ $t(`${item.name}`) }}&nbsp;
                        {{ $t('permissionInfo.table.desc')}}:{{ $t(`${item.desc}`) }}</span>
                  </div>
                </li>
                <li>
                  <tiny-tree
                    :data="data.row.menuTree"
                    :size="medium"
                    :indent="18"
                    default-expand-all
                  ></tiny-tree>
                </li>
              </ul>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="name"
            :title="$t('roleInfo.table.id')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.id}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('roleInfo.table.name')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('roleInfo.table.desc')">
            <template #default="data">
              <div v-for="item in data.row.permission" :key="item.id">
                    <span>{{ $t(`${item.name}`) }}&nbsp;</span>
              </div>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('roleInfo.table.menu')">
            <template #default="data">
              <tiny-tree
                :data="data.row.menuTree"
                :size="medium"
                :indent="18"
              ></tiny-tree>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            :title="$t('roleInfo.table.operations')"
            align="center"
          >
            <template v-slot="data">
              <a class="operation-update" @click="handleUpdate(data.row.id)">
                {{ $t('roleInfo.table.operations.update') }}
              </a>
              <a class="operation-delete" @click="handleDelete(data.row.id)">
                {{ $t('roleInfo.table.operations.delete') }}
              </a>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </div>
    </div>
  </div>
  <div v-if="state.isRoleUpdate">
    <tiny-modal
      v-model="state.isRoleUpdate"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
      width="600"
      :title="$t('roleInfo.modal.title.update')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.roleUpdData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            size="small"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.id')"
                >
                  <label>{{ state.roleUpdData.id }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.name')"
                  prop="name"
                >
                  <tiny-input v-model="state.roleUpdData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.desc')"
                  prop="desc"
                >
                  <tiny-base-select
                    v-model="state.roleUpdData.desc"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                    multiple
                  >
                    <tiny-option
                      v-for="item in (state.permissionData as any)"
                      :key="item.id"
                      :label="$t(item.name)"
                      :value="item.id"
                    ></tiny-option>
                  </tiny-base-select>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.menu')"
                  prop="menu"
                >
                  <tiny-select
                    v-model="state.roleUpdData.menus"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                    multiple
                    value-field="id"
                    text-field="label"
                    render-type="tree"
                    :tree-op="state.menuOptionData"
                  >
                  </tiny-select>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handleRoleUpdateSubmit">确定</tiny-button>
        <tiny-button @click="handleRoleUpdateCancel">取消</tiny-button>
      </template>
    </tiny-modal>
  </div>
  <div v-if="state.isRoleAdd">
    <tiny-modal
      v-model="state.isRoleAdd"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
      width="600"
      :title="$t('roleInfo.modal.title.add')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.roleAddData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            size="small"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.name')"
                  prop="name"
                >
                  <tiny-input v-model="state.roleAddData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.desc')"
                  prop="desc"
                >
                  <tiny-base-select
                    v-model="state.roleAddData.desc"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                    multiple
                  >
                    <tiny-option
                      v-for="item in (state.permissionData as any)"
                      :key="item.id"
                      :label="$t(item.name)"
                      :value="item.id"
                    ></tiny-option>
                  </tiny-base-select>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>

            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('roleInfo.modal.input.menu')"
                  prop="menu"
                >
                  <tiny-select
                    v-model="state.roleAddData.menus"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                    multiple
                    value-field="id"
                    text-field="label"
                    render-type="tree"
                    :tree-op="state.menuOptionData"
                  >
                  </tiny-select>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handleRoleAddSubmit">确定</tiny-button>
        <tiny-button @click="handleRoleAddCancel">取消</tiny-button>
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
  BaseSelect as TinyBaseSelect,
  Select as TinySelect,
  Option as TinyOption,
  Tree as TinyTree,
} from '@opentiny/vue';
import {IconChevronDown} from '@opentiny/vue-icon';
import {useUserStore} from '@/store';
import {getAllRoleDetail, updateRole ,createRole, deleteRole} from '@/api/role';
import {getAllPermission} from "@/api/permission";
import {getAllMenu} from "@/api/menu";
import { useRouter } from 'vue-router';
import {getSimpleDate} from "@/utils/time";
import {updateUserInfo} from "@/api/user";

const router = useRouter();

const {t} = useI18n();

// 加载效果
const state = reactive<{
  tableData: any;
  permissionData: any;
  menuData:  any;
  menuOptionData: any;
  roleUpdData: any;
  roleAddData: any;
  isRoleUpdate: boolean;
  isRoleAdd: boolean;
}>({
  tableData: [] as any,
  permissionData: [] as any,
  menuData: {} as any,
  menuOptionData: {} as any,
  roleUpdData: {} as any,
  roleAddData: {} as any,
  isRoleAdd: false,
  isRoleUpdate: false,
});

// 变量设置
const userStore = useUserStore();

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
    name: [rulesType],
    desc: [rulesSelect],
    menu: [rulesSelect]
  };
});

// 初始化请求数据
onMounted(() => {
  fetchRoleData();
  fetchPermissionData();
  fetchMenuData();
});

// 请求数据接口方法
async function fetchRoleData() {
  const {data} = await getAllRoleDetail();
  for(let i = 0; i < data.roleInfo.length; i+=1){
    data.roleInfo[i].menuTree = data.menuTree[i]
  }
  state.tableData = data.roleInfo
};

async function fetchPermissionData() {
  const {data} = await getAllPermission();
  state.permissionData = data;
};

async function fetchMenuData() {
  const {data} = await getAllMenu();
  state.menuData = data;
};

async function handleDelete (id: string){
  try {
    await deleteRole(id);
    TinyModal.message({
      message: '已删除',
      status: 'success',
    });
    state.isRoleUpdate = false;
    state.roleUpdData = {} as any;
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

async function convertMenu(data: any){
  let menu = [] as any;
  for (let j = 0; j < data.menus.length; j+=1){
    menu.push(data.menus[j].id)
    if(data.menus[j].children !== null){
      convertMenu(data.menus[j].children)
    }
  }
  return menu;
}

const handleUpdate = (id: string) => {
  state.isRoleUpdate = true;
  let data = state.tableData[id - 1];
  let permission = [] as any;
  for (let i = 0; i < data.permission.length; i+=1){
    permission.push(data.permission[i].id)
  }
  let menu = [] as any;
  for (let j = 0; j < data.menus.length; j+=1){
    menu.push(data.menus[j].id)
  }
  state.roleUpdData = {
    id: data.id,
    name: data.name,
    menus: menu,
    desc: permission,
  }
  state.menuOptionData = ref({
    data: state.menuData
  })
}

const handleRoleUpdateCancel =()=>{
  state.isRoleUpdate = false;
  state.roleUpdData = {} as any;
}

async function handleRoleUpdateSubmit(){
  let data = state.roleUpdData;
  let newTemp = {
    id: data.id,
    name: data.name,
    permissionIds: data.desc,
    menuIds:data.menus,
  };
  try {
    await updateRole(newTemp);
    Modal.message({
      message: t('baseForm.form.submit.success'),
      status: 'success',
    });
    state.isRoleUpdate = false;
    state.roleUpdData = {} as any;
    await fetchRoleData();
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

function handleAddRole() {
  state.isRoleAdd = true;
  state.menuOptionData = ref({
    data: state.menuData
  })
}

async function handleRoleAddSubmit() {
  let data = state.roleAddData;
  let newTemp = {
    name: data.name,
    permissionIds: data.desc,
    menuIds:data.menus,
  };
  try {
    await createRole(newTemp);
    Modal.message({
      message: t('baseForm.form.submit.success'),
      status: 'success',
    });
    state.isRoleAdd = false;
    state.roleAddData = {} as any;
    await fetchRoleData();
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

async function handleRoleAddCancel() {
  state.isRoleAdd = false;
  state.roleAddData = {} as any;
}

</script>

<style scoped lang="less">
#contain {
  height: 100%;
  padding: 15px;
  overflow: hidden;
}

.role-add-btn{
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
