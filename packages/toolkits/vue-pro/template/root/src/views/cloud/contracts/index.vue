<template>
  <div class="container">
    <Breadcrumb :items="['menu.cloud', 'menu.cloud.contracts']" />
    <div class="content">
      <tiny-grid
        v-if="update"
        :ref="taskGrid"
        :fetch-data="fetchDataOption"
        :auto-load="true"
        :pager="pagerConfig"
        :loading="loading"
        size="medium"
        max-height="700"
        :auto-resize="true"
      >
        <template #toolbar>
          <tiny-grid-toolbar>
            <template #buttons="slotScope">
              <div class="btn">
                <span>{{ $t('menu.cloud.contracts') }}</span>
                <tiny-button
                  type="primary"
                  @click="disTheme('create', slotScope.row)"
                  >{{ $t('menu.cloud.create') }}</tiny-button
                >
              </div>
            </template>
          </tiny-grid-toolbar>
        </template>

        <tiny-grid-column
          field="name"
          :title="$t('menu.cloud.name')"
          align="center"
          sortable
        ></tiny-grid-column>
        <tiny-grid-column
          field="id"
          :title="$t('menu.cloud.id')"
          align="center"
        ></tiny-grid-column>
        <tiny-grid-column
          field="customer"
          :title="$t('menu.cloud.customer')"
          align="center"
        ></tiny-grid-column>
        <tiny-grid-column
          field="description"
          :title="$t('menu.cloud.description')"
          align="center"
        ></tiny-grid-column>
        <tiny-grid-column
          field="updatedAt"
          :title="$t('menu.cloud.updatedAt')"
          align="center"
          sortable
        ></tiny-grid-column>
        <tiny-grid-column
          :title="$t('searchTable.columns.operations')"
          align="center"
        >
          <template #default="slotScope">
            <span class="operation">
              <a @click="disTheme('edit', slotScope.row)">{{
                $t('menu.cloud.editOpa')
              }}</a>
              &nbsp;| &nbsp;
              <a @click="disTheme('deletes', slotScope.row)">{{
                $t('menu.cloud.editDel')
              }}</a>
            </span>
          </template>
        </tiny-grid-column>
      </tiny-grid>
    </div>
  </div>
  <div v-if="display">
    <tiny-modal
      v-model="display"
      :lock-scroll="false"
      :show-header="false"
      :show-footer="false"
      title=" "
      type="confirm"
      mask-closable="true"
      height="400"
      width="800"
      @confirm="confirmClick"
      @close="closeClick"
    >
      <template #default>
        <component
          :is="title"
          ref="content"
          :init="init"
          @myclick="confirmClick"
          @mycancel="closeClick"
        ></component>
      </template>
    </tiny-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs, watch } from 'vue';
  import {
    Grid as TinyGrid,
    GridColumn as TinyGridColumn,
    GridToolbar as TinyGridToolbar,
    Button as TinyButton,
    Pager as TinyPager,
  } from '@huawei/tiny-vue';
  import { HwcClientService } from './hwcClient.service';
  import edit from './components/edit/index.vue';
  import create from './components/create/index.vue';
  import deletes from './components/delete/index.vue';

  // 初始化请求数据
  interface FilterOptions {
    id: string;
    name: string;
    description: string;
    customer: string;
    updatedAt: string;
  }

  // 加载效果
  const state = reactive<{
    loading: boolean;
    filterOptions: FilterOptions;
  }>({
    loading: false,
    filterOptions: {} as FilterOptions,
  });

  const pagerConfig = reactive({
    component: TinyPager,
    attrs: {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20],
      total: 10,
      layout: 'total, prev, pager, next, jumper, sizes',
    },
  });

  const update = ref(true);
  const { loading } = toRefs(state);
  const width = ref('88vw');
  const display = ref(false);
  const title = ref();
  const choose = ref('');
  const content = ref();
  const init = ref();
  const taskGrid = ref();
  const table = ref();

  // 删除合同
  async function delContracts(params: { id: string }) {
    return HwcClientService.apiRequest('delContract', params);
  }

  // 编辑合同
  async function editContracts(params: {
    id: string;
    name: string;
    customer: string;
    description: string;
  }) {
    return HwcClientService.apiRequest('editContract', params);
  }

  // 获取初始数据
  async function getContractsData(params: { query: string; field: string }) {
    return HwcClientService.apiRequest('getContracts', params);
  }

  // 创建合同
  async function createContracts(params: {
    name: string;
    customer: string;
    description: string;
  }) {
    return HwcClientService.apiRequest('addContract', params);
  }

  const fetchDataOption = reactive({
    api: ({ page }: any) => {
      const { currentPage, pageSize } = page;
      return fetchData({
        pageIndex: currentPage,
        pageSize,
        query: '',
        field: 'name',
      });
    },
  });

  // 请求数据接口方法
  async function fetchData(params: {
    pageIndex: number;
    pageSize: number;
    query: string;
    field: string;
  }) {
    state.loading = true;
    try {
      table.value = await getContractsData(params);
      let offset = (params.pageIndex - 1) * params.pageSize;
      return {
        result: table.value.slice(offset, offset + params.pageSize),
        page: {
          total: table.value.length,
        },
      };
    } finally {
      update.value = true;
      state.loading = false;
    }
  }

  const disTheme = (item: string, data: any) => {
    init.value = data;
    choose.value = item;
    display.value = !display.value;
    if (item === 'edit') {
      title.value = edit;
    } else if (item === 'deletes') {
      title.value = deletes;
    } else {
      title.value = create;
    }
  };

  // 确认提交
  async function confirmClick() {
    display.value = false;
    update.value = false;
    if (choose.value === 'edit') {
      const data = content.value.resultData();
      const params = {
        id: init.value.id,
        name: data.name,
        customer: data.customer,
        description: data.description,
      };
      await editContracts(params);
      fetchData({
        pageIndex: 1,
        pageSize: 10,
        query: '',
        field: 'name',
      });
    }
    if (choose.value === 'deletes') {
      const params = {
        id: init.value.id,
      };
      await delContracts(params);
      fetchData({
        pageIndex: 1,
        pageSize: 10,
        query: '',
        field: 'name',
      });
    }
    if (choose.value === 'create') {
      const data = content.value.resultData();
      const params = {
        name: data.name,
        customer: data.customer,
        description: data.description,
      };
      await createContracts(params);
      fetchData({
        pageIndex: 1,
        pageSize: 10,
        query: '',
        field: 'name',
      });
    }
  }

  const closeClick = () => {
    display.value = false;
  };
</script>

<style scoped lang="less">
  .container {
    width: v-bind(width);
    margin: 10px;
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }

  .content {
    height: 80vh;
  }

  .btn {
    span {
      margin: 10px 0 10px;
      font-weight: 700;
      font-size: var(--ti-common-font-size-3);
    }

    button {
      margin-right: 4%;
    }

    display: flex;
    justify-content: space-between;
    width: v-bind(width);
  }

  .operation {
    color: #526ecc;
  }
</style>
