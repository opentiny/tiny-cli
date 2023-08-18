<template>
  <div>
    <div class="f-r pt48 pl48 pr48 doc-container">
      <template v-if="useTab">
        <!-- 描述 包含基本描述 示例和规范页 -->
        <components-detail-tab></components-detail-tab>
      </template>
      <template v-else>
        <!-- 描述  包含基本描述及示例 -->
        <components-detail></components-detail>
      </template>
    </div>
    <div id="footer"></div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import componentsDetail from './componentsDetail.vue';
import componentsDetailTab from './componentsDetailTab.vue';
import { fetchDemoFile } from '@/tools';
import { router } from '@/router.js';
import { watch } from 'fs';

const state = reactive({
  useTab: import.meta.env.VITE_USE_TAB || false, // 是否开启规范tab页，此变量需在.env生命，如不使用则删除对应.env变量
});

const loadCmp = cmpI => {
  fetchDemoFile(`@demos/app/${cmpId}/webdoc/${cmpId}.js`).then(data => {
    const json = eval(`(${data.slice(15)})`);
    if (json['standard']) {
      state.useTab = true;
    } else {
      state.useTab = false;
    }
  });
};

export default defineComponent({
  name: 'CmpPage_vue',
  components: { componentsDetail, componentsDetailTab },
  setup() {
    loadCmp(router.currentRoute.value.params.cmpId);
    watch(
      () => router.currentRoute.value.params.cmpId,
      cmpId => {
        if (cmpId) loadCmp(cmpId);
      }
    );
    onMounted(() => {
      const common = new window.TDCommon(['#footer'], {});
      common.renderFooter();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less"></style>
