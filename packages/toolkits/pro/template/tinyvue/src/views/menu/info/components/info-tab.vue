<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <div class="menu-add-btn">
        <tiny-button type="primary" @click="handleAddMenu">{{ $t('menuInfo.modal.title.add') }}</tiny-button>
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
                  <span>{{ $t('menuInfo.table.id') }}:</span>
                  <span>{{ $t(`${data.row.id}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.name') }}:</span>
                  <span>{{ $t(`${data.row.name}`) }}</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.order') }}:</span>
                  <span>{{ $t(`${data.row.order}`) }}:</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.parentId') }}:</span>
                  <span>{{ $t(`${data.row.parentId}`) }}:</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.menuType') }}:</span>
                  <span>{{ $t(`${data.row.menuType}`) }}:</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.icon') }}:</span>
                  <span>{{ $t(`${data.row.icon}`) }}:</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.component') }}:</span>
                  <span>{{ $t(`${data.row.component}`) }}:</span>
                </li>
                <li>
                  <span>{{ $t('menuInfo.table.path') }}:</span>
                  <span>{{ $t(`${data.row.path}`) }}:</span>
                </li>
              </ul>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="name"
            :title="$t('menuInfo.table.id')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.id}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.name')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.order')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.order}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.parentId')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.parentId}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.menuType')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.menuType}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.icon')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.icon}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.component')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.component}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('menuInfo.table.path')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.path}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            :title="$t('menuInfo.table.operations')"
            align="center"
          >
            <template v-slot="data">
              <a class="operation-update" @click="handleUpdate(data.row.id)">
                {{ $t('menuInfo.table.operations.update') }}
              </a>
              <a class="operation-delete" @click="handleDelete(data.row.id)">
                {{ $t('menuInfo.table.operations.delete') }}
              </a>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </div>
    </div>
  </div>
  <div v-if="state.isMenuUpdate">
    <tiny-modal
      v-model="state.isMenuUpdate"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="350"
      width="600"
      :title="$t('menuInfo.modal.title.update')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.menuUpdData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            size="small"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.id')"
                >
                  <label>{{ state.menuUpdData.id }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.name')"
                  prop="name"
                >
                  <tiny-input v-model="state.menuUpdData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.order')"
                  prop="order"
                >
                  <tiny-input v-model="state.menuUpdData.order"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.parentId')"
                  prop="parentId"
                >
                  <tiny-input v-model="state.menuUpdData.parentId"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.menuType')"
                  prop="menuType"
                >
                  <tiny-input v-model="state.menuUpdData.menuType"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.icon')"
                  prop="icon"
                >
                  <tiny-input v-model="state.menuUpdData.icon"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.component')"
                  prop="component"
                >
                  <tiny-input v-model="state.menuUpdData.component"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.path')"
                  prop="path"
                >
                  <tiny-input v-model="state.menuUpdData.path"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handleMenuUpdateSubmit">确定</tiny-button>
        <tiny-button @click="handleMenuUpdateCancel">取消</tiny-button>
      </template>
    </tiny-modal>
  </div>
  <div v-if="state.isMenuAdd">
    <tiny-modal
      v-model="state.isMenuAdd"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height=auto
      width="600"
      :title="$t('menuInfo.modal.title.add')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.menuAddData"
            :rules="rules"
            label-width="150px"
            :label-align="true"
            label-position="left"
            size="small"
          >
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.name')"
                  prop="name"
                >
                  <tiny-input v-model="state.menuAddData.name"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.order')"
                  prop="order"
                >
                  <tiny-input v-model="state.menuAddData.order"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.parentId')"
                  prop="parentId"
                >
                  <tiny-input v-model="state.menuAddData.parentId"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.menuType')"
                  prop="menuType"
                >
                  <tiny-input v-model="state.menuAddData.menuType"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.icon')"
                  prop="icon"
                >
                  <tiny-input v-model="state.menuAddData.icon"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.component')"
                  prop="component"
                >
                  <tiny-input v-model="state.menuAddData.component"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.path')"
                  prop="path"
                >
                  <tiny-input v-model="state.menuAddData.path"></tiny-input>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button type="primary" @click="handleMenuAddSubmit">确定</tiny-button>
        <tiny-button @click="handleMenuAddCancel">取消</tiny-button>
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
} from '@opentiny/vue';
import {IconChevronDown} from '@opentiny/vue-icon';
import {useUserStore} from '@/store';
import {getAllMenu, updateMenu ,createMenu, deleteMenu} from '@/api/menu';
import {getAllPermission} from "@/api/permission";
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
  menuUpdData: any;
  menuAddData: any;
  isMenuUpdate: boolean;
  isMenuAdd: boolean;
}>({
  tableData: [] as any,
  permissionData: [] as any,
  menuData: {} as any,
  menuUpdData: {} as any,
  menuAddData: {} as any,
  isMenuAdd: false,
  isMenuUpdate: false,
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
    order: [rulesType],
    parentId: [rulesType],
    menuType: [rulesType],
    icon: [rulesType],
    component: [rulesType],
    path: [rulesType],
  };
});

// 初始化请求数据
onMounted(() => {
  // fetchMenuData();
});

// 请求数据接口方法
async function fetchMenuData() {
  const {data} = await getAllMenu();
  state.tableData = data;
};


async function handleDelete (id: string){
  try {
    await deleteMenu(id);
    TinyModal.message({
      message: '已删除',
      status: 'success',
    });
    state.isMenuUpdate = false;
    state.menuUpdData = {} as any;
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
  state.isMenuUpdate = true;
  state.menuUpdData = state.tableData[id - 1];
}

const handleMenuUpdateCancel =()=>{
  state.isMenuUpdate = false;
  state.menuUpdData = {} as any;
}

async function handleMenuUpdateSubmit(){
  let data = state.menuUpdData;
  let newTemp = {
    id: data.id,
    name: data.name,
    permissionIds: data.desc,
    menuIds:data.menu,
  };
  try {
    await updateMenu(newTemp);
    Modal.message({
      message: t('baseForm.form.submit.success'),
      status: 'success',
    });
    state.isMenuUpdate = false;
    state.menuUpdData = {} as any;
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

function handleAddMenu() {
  state.isMenuAdd = true;
}

async function handleMenuAddSubmit() {
  let data = state.menuAddData;
  let newTemp = {
    name: data.name,
    permissionIds: data.desc,
    menuIds:data.menu,
  };
  try {
    await createMenu(newTemp);
    Modal.message({
      message: t('baseForm.form.submit.success'),
      status: 'success',
    });
    state.isMenuAdd = false;
    state.menuAddData = {} as any;
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

async function handleMenuAddCancel() {
  state.isMenuAdd = false;
  state.menuAddData = {} as any;
}

</script>

<style scoped lang="less">
#contain {
  height: 100%;
  padding: 15px;
  overflow: hidden;
}

.menu-add-btn{
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
