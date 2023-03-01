<template>
  <div>
    <div ref="pageDiv" class="f-r pt48 pl48 pr48">
      <div class="fi-1 w0 rel cmp-container">
        <!-- 一个组件的文档:  描述md + demos + apis -->
        <component :is="cmpTopMd" />
        <template v-if="currJson?.demos?.length > 0">
          <h2 class="f30 fw-normal !mb20">{{ $t('yan-shi') }}</h2>
          <n-layout class="f-c f-wrap ofx-auto" :native-scrollbar="true">
            <template v-if="currJson.column === '2'">
              <div class="one-demo-col2">
                <div>
                  <demo v-for="demo in evenDemo" :key="demo.name" :demo="demo" />
                </div>
                <div>
                  <demo v-for="demo in oddDemo" :key="demo.name" :demo="demo" />
                </div>
              </div>
            </template>
            <template v-else>
              <demo v-for="demo in currJson.demos" :key="demo.name" :demo="demo" class="mb16" />
            </template>
          </n-layout>
        </template>
        <template v-if="currJson.apis?.length > 0">
          <h2 id="API" v-if="cmpId !== 'interfaces'" class="f30 fw-normal mt28">API</h2>
          <!-- apis 是一个数组 {name,type,properties:[原table内容],events:[] ...........} -->
          <div class="mt20" v-for="(oneGroup, idx) in currJson.apis" :key="oneGroup.name">
            <div class="f-r f-pos-start fw-bold">
              <div :id="oneGroup.name" class="f18">{{ oneGroup.name }}</div>
              <div class="ml12 b-a-primary c-primary px8 py4">{{ oneGroup.type }}</div>
            </div>
            <div v-for="(oneApiArr, key) in oneGroup" :key="key">
              <template v-if="key !== 'name' && key !== 'type' && oneApiArr.length > 0">
                <div class="f18 py28">{{ key }}</div>
                <n-data-table class="api-table" v-bind="getApiTableOpt(oneApiArr)" />
              </template>
            </div>
          </div>
        </template>
        <!-- types表格 -->
        <template v-if="currJson.types">
          <n-data-table class="types-table mt20" v-bind="getTypesTableOpt(currJson.types)" />
        </template>
        <h2 id="FAQ" v-if="cmpFAQMd" class="f30 fw-normal mt28 mb20">FAQ</h2>
        <component :is="cmpFAQMd" />
        <div v-if="currJson.owner" class="abs right24 top24" @click="copyText(currJson.owner)">{{ $t('doc-owner') }} : {{ currJson.owner }}</div>
      </div>
      <!-- 目录列表 -->
      <div class="catalog w128 sticky top32" v-if="cmpId !== 'types'">
        <n-anchor :show-rail="true" offset-target="#doc-layout" :ignore-gap="true" :show-background="true">
          <n-anchor-link v-for="(demo, index) in currJson.demos || []" :key="demo.demoId" :title="demo.name[langKey]" :href="'#' + demo.demoId" />
          <n-anchor-link v-if="cmpId !== 'interfaces'" title="API" href="#API" />
          <n-anchor-link v-if="cmpFAQMd" title="FAQ" href="#FAQ" />
          <!-- 接口特殊的导航 -->
          <template v-if="cmpId === 'interfaces'">
            <n-anchor-link v-for="(api, index) in currJson.apis || []" :key="api.name" :title="api.name" :href="'#' + api.name" />
          </template>
        </n-anchor>
      </div>
    </div>
    <div id="footer"></div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, reactive, computed, toRefs, watch, onMounted, onUnmounted, effectScope, nextTick, h } from 'vue';
import { $t, $t2, $clone, $split } from '@/tools';
import demo from '@demo';
import { allMD, allJson } from './cmpConfig.js';
import { router } from '@/router.js';

const state = reactive({
  langKey: $t2('zh-CN', 'en-US'),
  cmpId: '',
  currJson: { column: 1, demos: [], apis: [] },
  cmpTopMd: computed(() => allMD[`${state.cmpId}.${$t2('cn', 'en')}.md`]),
  cmpFAQMd: computed(() => allMD[`${state.cmpId}.${$t2('faq.cn', 'faq.en')}.md`]),
  evenDemo: computed(() => state.currJson.demos?.filter((d, i) => i % 2 === 0) || []),
  oddDemo: computed(() => state.currJson.demos?.filter((d, i) => i % 2 === 1) || []),
  pageDiv: null,
});

const getTypesTableOptFn = typesArr => {
  return {
    columns: [
      {
        key: 'name',
        title: $t('name'),
        width: '20%',
        render: row => <div v-html = {row.name}></div>,
      },
      {
        key: 'value',
        title: $t('typeValue'),
        width: '40%',
        render: row => <div v-html = {row.value}></div>,
      },
      {
        key: 'desc',
        title: $t('desc'),
        width: '40%',
        render: row => <div v-html = {row.desc[state.langKey]}> </div>,
      }],
    data: typesArr,
    };
};

const getApiTableOptFn = oneApiArr => {
  return {
    columns: [
      {
        key: 'name',
        title: $t('name'),
        width: '20%',
        render: row => {return row.demoId ? <a href = {'#' + row.demoId}> { row.name} </a> : <span> {row.name} </span>},
      },
      {
        key: 'type',
        title: $t('propType'),
        width: '25%',
        render: row => <div class="route-anchor" v-html={row.type}></div>,
      },
      {
        key: 'defaultValue',
        title: $t('defValue'),
        width: '20%',
        render: row => <div class="route-anchor" v-html={row.defaultValue}></div>,
      },
      {
        key: 'desc',
        title: $t('desc'),
        width: '35%',
        render: row => <div class="route-anchor" v-html={row.desc[state.langKey]}></div>,
      },
    ],
    data: oneApiArr,
  };
};

const loadPage = () => {
  state.cmpId = router.currentRoute.value.params.cmpId;
  state.currJson = {
    ...allJson[state.cmpId],
    demos: $clone(allJson[state.cmpId]['demos'] || []), // 克隆一下,避免保存上次的isOpen
    column: allJson[state.cmpId].column || '1', // columns可能为空
  };
};

const navigatAnchor = () => {
  state.pageDiv.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'A' && ev.target.closest('.route-anchor')) {
      ev.preventDefault();
      const href = ev.target.getAttribute('href');
      const hash = $split(href, '#', -1);
      router.push(href);
      setTimeout(() => {
        const scrollTarget = document.querySelector('#' + hash);
        if (scrollTarget) {
          scrollTarget.scrollIntoView();
        }
      }, 16);
    }
  }); 
};

const fn = {
  copyText: text => {
    navigator.clipboard.writeText(text);
  },
  getApiTableOpt: oneApiArr => {
    return getApiTableOptFn(oneApiArr);
  },
  getTypesTableOpt: typesArr => {
    return getTypesTableOptFn(typesArr);
  },
};

export default defineComponent({
  name: 'CmpPage_vue',
  components: { demo },
  setup() {
  const scope = effectScope();
  scope.run(() => {
    watch(() => router.currentRoute.value.params.cmpId, (cmpId) => {
      if (!cmpId || !allJson[state.cmpId]) {
        state.currJson = {};
      } else {
        loadPage(); 
      }
    });
  });
  
  onMounted(() => {
    loadPage();
    const common = new window.TDCommon(['#footer'], {});
    common.renderFooter();
    nextTick(() => {
      navigatAnchor(); // 从一个页面的api,跳转到 interface的指定条目。
    });
    nextTick(() => {
      if (location.hash) {
        window.location = location.hash; // 用户手动刷新时，定位到锚点
      }
    });
  });
  onUnmounted(() => scope.stop());
    return {
      ...toRefs(state),
      ...fn,
    };
  },
});
</script>
<style lang="less">
.types-table a,
.api-table a {
  text-decoration: none;
  color: #5e7ce0;
  cursor: pointer;
}

.n-data-table-td {
  vertical-align: middle !important;
}

.catalog {
  height: calc(100vh - 150px);
  overflow: hidden;
}

.catalog:hover {
  overflow-y: auto;
}

.catalog::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.catalog::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c1c1c1;
}

.n-anchor .n-anchor-link .n-anchor-link__title {
  font-size: 12px;
}

.one-demo-col2 {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
  align-items: flex-start;

  > div {
    display: grid;
    gap: 16px;
    grid-template-columns: 100%;
  }
}

.cmp-container {
  padding-right: 24px;
}

@media (max-width: 1279px) {
  .catalog {
    display: none;
  }

  .cmp-container {
    padding-right: 0;
  }
}

@media (max-width: 767px) {
  .one-demo-col2 {
    grid-template-columns: 100%;
  }
}
</style>
