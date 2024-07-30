<template>
  <div class="tiny-fullscreen-scroll">
    <div class="tiny-fullscreen-wrapper">
      <!--    <infotable :table-data="state.tableData"></infotable>-->
      <div class="table">
        <tiny-grid ref="expandGrid"
                   :fetch-data="fetchDataOption"
                   :pager="pagerConfig"
                   :auto-resize="true"
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
                  <span>{{ $t(`${data.row.protocolStart}`) }}</span>
                </li><li>
                <span>{{ $t('userInfo.table.protocolEnd') }}：</span>
                <span>{{ $t(`${data.row.protocolEnd}`) }}</span>
              </li><li>
                <span>{{ $t('userInfo.table.address') }}：</span>
                <span>{{ $t(`${data.row.address}`) }}</span>
              </li><li>
                <span>{{ $t('userInfo.table.status') }}：</span>
                <span v-if="data.row.status == 1">已启用</span>
                <span v-if="data.row.status !== 1">已禁用</span>
              </li>
              </ul>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="name"
            :title="$t('userInfo.table.id')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.id}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            field="time"
            :title="$t('userInfo.table.name')"
          >
            <template #default="data">
              <span>{{ $t(`${data.row.name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.email')">
            <template #default="data">
              <span>{{ $t(`${data.row.email}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.department')">
            <template #default="data">
              <span v-if="data.row.department !== null">{{ $t(`${data.row.department}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.employeeType')">
            <template #default="data">
              <span v-if="data.row.employeeType !== null">{{ $t(`${data.row.employeeType}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.job')">
            <template #default="data">
              <span>{{ $t(`${data.row.role[0].name}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.probationStart')">
            <template #default="data">
              <span v-if="data.row.probationStart !== null">{{ $t(`${data.row.probationStart}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.probationEnd')">
            <template #default="data">
              <span v-if="data.row.probationEnd !== null">{{ $t(`${data.row.probationEnd}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.probationDuration')">
            <template #default="data">
              <span v-if="data.row.probationDuration !== null">{{ $t(`${data.row.probationDuration}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.protocolStart')">
            <template #default="data">
              <span v-if="data.row.protocolStart !== null">{{ $t(`${data.row.protocolStart}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.protocolEnd')">
            <template #default="data">
              <span v-if="data.row.protocolEnd !== null">{{ $t(`${data.row.protocolEnd}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.address')">
            <template #default="data">
              <span v-if="data.row.address !== null">{{ $t(`${data.row.address}`) }}</span>
            </template>
          </tiny-grid-column>
          <tiny-grid-column field="type" :title="$t('userInfo.table.status')">
            <template #default="data">
              <div v-if="data.row.status == 1">
                <img style="width: 20px" src="@/assets/images/success.png" alt="success" />
              </div>
              <div v-if="data.row.status !== 1">
                <img style="width: 20px" src="@/assets/images/error.png" alt="error" />
              </div>
            </template>
          </tiny-grid-column>
          <tiny-grid-column
            :title="$t('userInfo.table.operations')"
            align="center"
          >
            <template v-slot="data">
              <a class="operation-update" @click="handleUpdate(data.row.email)">
                {{ $t('userInfo.table.operations.update') }}
              </a>
              <a class="operation-delete" @click="handleDelete(data.row.email)">
                {{ $t('userInfo.table.operations.delete') }}
              </a>
            </template>
          </tiny-grid-column>
        </tiny-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted, watch} from 'vue';
import {
  Tabs as TinyTabs,
  TabItem as TinyTabItem,
  Loading,
  GridColumn as TinyGridColumn,
  Grid as TinyGrid, Pager as TinyPager, Modal,
} from '@opentiny/vue';
import {IconChevronDown} from '@opentiny/vue-icon';
import {useUserStore} from '@/store';
import {getAllUser, deleteUser} from '@/api/user';
import { useRouter } from 'vue-router';

const router = useRouter();

// 加载效果
const state = reactive<{
  loading: any;
  tableData: any;
  pageData: any;
}>({
  loading: null,
  tableData: [] as any,
  pageData: [] as any,
});

// 变量设置
const userStore = useUserStore();
const ChevronDown = IconChevronDown();
const activeName = ref('1');
const Filter = ref(false);
const Sort = ref(false);

const filterInfo = ref();

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

// 请求数据接口方法
const fetchData = async (
  params: {
    pageIndex: 1,
    pageSize: 10,
  }
) => {
  userStore.setInfo({reset: false, submit: false});
  state.loading = Loading.service({
    text: 'loading...',
    target: document.getElementById('contain'),
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const {data} = await getAllUser(params.pageIndex, params.pageSize);
    const total = data.meta.totalItems;
    return {
      result: data.items,
      page: {total},
    }
  } finally {
    state.loading.close();
  }
};

const fetchDataOption = reactive({
  api: ({page}: any) => {
    const {currentPage, pageSize} = page;
    return fetchData({
      pageIndex: currentPage,
      pageSize,
    });
  },
});

const handleDelete = (email: string) => {
  deleteUser(email).then((res) => {
    Modal.message({
      message: '已删除',
      status: 'success',
    });
  })
}

const handleUpdate = (email: string) => {
  router.push({
    name: 'AllSetting',
    query: {
      email,
    },
  });
}

</script>

<style scoped lang="less">
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
    color: red;
  }

  &-update {
    padding-right: 10px;
    color: #1890ff;
  }
}

</style>
