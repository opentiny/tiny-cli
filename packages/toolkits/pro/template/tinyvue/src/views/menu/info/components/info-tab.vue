<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <div class="menu-add-btn">
        <tiny-button type="primary" @click="handleAddMenu">{{ $t('menuInfo.modal.title.add') }}</tiny-button>
      </div>
      <div class="table">
        <tiny-tree
          :data="state.tableData"
          :size="medium"
          :indent="18"
          :show-line="showLine === 'show'"
          default-expand-all
        >
          <template #operation="{node}">
              <a class="operation-info" @click="handleCheck(node)"> {{$t('menuInfo.table.operations.info')}} </a>
              <a class="operation-update" @click="handleUpdate(node)"> {{$t('menuInfo.table.operations.update')}} </a> &nbsp;
              <a class="operation-delete" @click="handleDelete(node)"> {{$t('menuInfo.table.operations.delete')}} </a>
          </template>
        </tiny-tree>
      </div>
    </div>
  </div>
  <div v-if="state.isMenuInfo">
    <tiny-modal
      v-model="state.isMenuInfo"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
      width="600"
      :title="$t('menuInfo.modal.title.info')"
    >
      <template #default>
        <tiny-layout>
          <tiny-form
            :model="state.menuInfoData"
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
                  <label>{{ state.menuInfoData.id }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.name')"
                >
                  <label>{{ state.menuInfoData.label }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.order')"
                >
                  <label>{{ state.menuInfoData.order }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.parentId')"
                >
                  <label>{{ state.menuInfoData.parentId }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.menuType')"
                >
                  <label>{{ state.menuInfoData.menuType }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.icon')"
                >
                  <label>{{ state.menuInfoData.icon }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.component')"
                >
                  <label>{{ state.menuInfoData.component }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
            <tiny-row :flex="true" justify="left">
              <tiny-col :span="10" label-width="100px">
                <tiny-form-item
                  :label="$t('menuInfo.table.path')"
                >
                  <label>{{ state.menuInfoData.url }}</label>
                </tiny-form-item>
              </tiny-col>
            </tiny-row>
          </tiny-form>
        </tiny-layout>
      </template>
      <template #footer>
        <tiny-button @click="handleMenuInfoCancel">取消</tiny-button>
      </template>
    </tiny-modal>
  </div>
  <div v-if="state.isMenuUpdate">
    <tiny-modal
      v-model="state.isMenuUpdate"
      :lock-scroll="true"
      show-header
      show-footer
      mask-closable="true"
      height="auto"
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
                  prop="label"
                >
                  <tiny-input v-model="state.menuUpdData.label"></tiny-input>
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
                  <tiny-select
                    v-model="state.menuUpdData.parentId"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                    value-field="id"
                    text-field="label"
                    render-type="tree"
                    :tree-op="state.menuData"
                  >
                  </tiny-select>
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
                  prop="url"
                >
                  <tiny-input v-model="state.menuUpdData.url"></tiny-input>
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
                  prop="label"
                >
                  <tiny-input v-model="state.menuAddData.label"></tiny-input>
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
                  <tiny-select
                    v-model="state.menuAddData.parentId"
                    :placeholder="$t('baseForm.form.label.placeholder')"
                    value-field="id"
                    text-field="label"
                    render-type="tree"
                    :tree-op="state.menuData"
                  >
                  </tiny-select>
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
                  prop="url"
                >
                  <tiny-input v-model="state.menuAddData.url"></tiny-input>
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
  Modal as TinyModal,
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
import {getAllMenu, updateMenu ,createMenu, deleteMenu} from '@/api/menu';
import {getAllPermission} from "@/api/permission";
import { useRouter } from 'vue-router';
import {getSimpleDate} from "@/utils/time";
import {updateUserInfo} from "@/api/user";

const router = useRouter();

const {t} = useI18n();

const treeRef = ref();

// 加载效果
const state = reactive<{
  tableData: any;
  menuData:  any;
  menuUpdData: any;
  menuAddData: any;
  menuInfoData: any;
  isMenuUpdate: boolean;
  isMenuAdd: boolean;
  isMenuInfo: boolean;
}>({
  tableData: [] as any,
  menuData: {} as any,
  menuUpdData: {} as any,
  menuAddData: {} as any,
  menuInfoData: {} as any,
  isMenuAdd: false,
  isMenuUpdate: false,
  isMenuInfo: false,
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
    label: [rulesType],
    order: [rulesType],
    menuType: [rulesType],
    icon: [rulesType],
    component: [rulesType],
    url: [rulesType],
  };
});

// 初始化请求数据
onMounted(() => {
  fetchMenuData();
});

// 请求数据接口方法
async function fetchMenuData() {
  const {data} = await getAllMenu();
  state.tableData = data;
};


async function handleDelete (node: any){
  if(node.data.parentId === null){
    node.data.parentId = -1
  }
  try {
    await deleteMenu(node.data.id, node.data.parentId);
    TinyModal.message({
      message: '已删除',
      status: 'success',
    });
    await fetchMenuData();
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

const handleUpdate = (node: any) => {
  state.isMenuUpdate = true;
  state.menuUpdData = node.data;
  state.menuData = ref({
    data: state.tableData,
  })
}

const handleMenuUpdateCancel =()=>{
  state.isMenuUpdate = false;
  state.menuUpdData = {} as any;
}

const handleCheck = (node: any) => {
  state.isMenuInfo = true;
  state.menuInfoData = node.data;
}

const handleMenuInfoCancel = () => {
  state.isMenuInfo = false;
  state.menuInfoData = {} as any;
}

async function handleMenuUpdateSubmit(){
  let data = state.menuUpdData;
  let newTemp = {
    id: data.id,
    name: data.label,
    order: data.order,
    parentId: data.parentId,
    menuType: data.menuType,
    icon: data.icon,
    component: data.component,
    path: data.url,
  };
  if(newTemp.id === newTemp.parentId){
    Modal.message({
      message: t('menuInfo.modal.message.error'),
      status: 'error',
    });
  }else{
    try {
      await updateMenu(newTemp);
      Modal.message({
        message: t('baseForm.form.submit.success'),
        status: 'success',
      });
      state.isMenuUpdate = false;
      state.menuUpdData = {} as any;
      await fetchMenuData();
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
}

function handleAddMenu() {
  state.isMenuAdd = true;
  state.menuData = ref({
    data: state.tableData,
  })
}

async function handleMenuAddSubmit() {
  let data = state.menuAddData;
  let newTemp = {
    name: data.label,
    order: data.order,
    parentId: data.parentId,
    menuType: data.menuType,
    icon: data.icon,
    component: data.component,
    path: data.url,
  };
  try {
    await createMenu(newTemp);
    Modal.message({
      message: t('baseForm.form.submit.success'),
      status: 'success',
    });
    state.isMenuAdd = false;
    state.menuAddData = {} as any;
    await fetchMenuData();
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
    color: red;
    padding-right: 10px;
  }

  &-update {
    padding-right: 5px;
    color: #1890ff;
  }

  &-info {
    color: orange;
    padding-right: 10px;
  }
}


</style>
