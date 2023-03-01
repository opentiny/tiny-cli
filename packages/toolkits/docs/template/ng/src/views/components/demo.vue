<template>
  <div :id="demo.demoId" class="b-a br-sm" :class="currDemoId == demo.demoId ? 'b-a-success' : ''">
    <div class="px24 py20">
      <!-- DEMO 的标题 + 说明desc+  示例wcTag -->
      <div class="f-r f-pos-between f-box-end pb20">
        <div class="f18 cur-hand">{{ demo.name[langKey] }}</div>
        <div>
          <n-tooltip trigger="hover">
            <template #trigger>
              <i :class="copyIcon" class="h:c-success w16 h16 cur-hand" @click="copyCode(demo)" @mouseout="resetTip()" />
            </template>
            {{ copyTip }}
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <i :class="!!demo.isOpen ? 'i-ti-codeslash' : 'i-ti-code'" class="ml8 h:c-success w16 h16 cur-hand" @click="toggleDemoCode(demo)" />
            </template>
            {{ demo.isOpen ? $t('hideCode') : $t('showCode') }}
          </n-tooltip>
        </div>
      </div>
      <component :is="getDescMd(demo)" class="mb16 f14" />
      <div v-html="`<${demo.tag} />`"></div>
    </div>
    <!-- demo 打开后的示例代码  细滚动时，width:fit-content; -->
    <div v-if="demo.isOpen" class="px24 py20 b-t-lightless">
      <n-config-provider :theme-overrides="themeOverrides">
        <n-tabs v-model:value="tabValue" type="line" size="large" justify-content="space-evenly">
          <n-tab-pane v-for="(file, idx) in demo.files" :key="file.fileName" :name="'tab' + idx" :tab="file.fileName">
            <n-layout :native-scrollbar="true" :content-style="`overflow-x:auto; padding: 20px 5px; background-color:#f5f6f8;`">
              <n-code :code="file.code" :language="file.language" />
            </n-layout>
          </n-tab-pane>
        </n-tabs>
      </n-config-provider>
    </div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, reactive, computed, toRefs } from 'vue';
import { $t, $t2 } from '@/i18n';
import { $split, appData } from '@/tools';
import { allMD, allJson, allSource, languageMap, themeOverrides } from './cmpConfig';
import { router } from '@/router.js';

const getDemoCodeFn = (demo) => { // 获取code代码文本
  if (!demo.files) {
    demo.files = demo.codeFiles.map((fileName) => {
      const code = allSource[fileName];
      const ext = $split(fileName, '.', -1);
      const language = languageMap[ext] || '';
      return { code, fileName, language };
    });
  }
}

export default defineComponent({
  name: 'OneDemo_vue',
  props: ['demo'],
  setup(props) {
    const state = reactive({
        tabValue: 'tab0',
        langKey: $t2('zh-CN', 'en-US'),
        currDemoId: computed(() => router.currentRoute.value.hash?.slice(1)),
        copyTip: $t('copyCode'),
        copyIcon: 'i-ti-copy',
        themeOverrides: themeOverrides,
    });
    const fn = {
      getDescMd(demo) { // desc字段可能是md,也可能是html。 返回md组件或者html组件
        const desc = demo.desc[state.langKey].trim();
        return <div class="demo-desc" v-html={desc}></div>;
      },
      toggleDemoCode(demo) { // 第一次打开时，要请求一下相应的codeFiles .存储到files属性下
        if (!demo.files) {
          this.getDemoCode(demo);
          demo.isOpen = true;
        } else {
          demo.isOpen = !demo.isOpen;
        }
      },
      copyCode(demo) {
        if (demo.isOpen) {
          const idx = +state.tabValue.slice(3);
          navigator.clipboard.writeText(demo.files[idx].code);
        } else {
          this.getDemoCode(demo);
          navigator.clipboard.writeText(demo.files[0].code);
        }
        state.copyTip = $t('copyCodeOk');
        state.copyIcon = 'i-ti-check';
      },
      resetTip() {
        setTimeout(() => {
          state.copyTip = $t('copyCode');
          state.copyIcon = 'i-ti-copy';
        }, 300);
      },
      getDemoCode(demo) { // 获取code代码文本
        return getDemoCodeFn(demo);
      }
    };
    return { ...toRefs(state), ...fn, appData };
  },
});
</script>
<style lang="less">
.demo-desc {
  code {
    background: #f1f2f3;
    padding: 2px 4px;
    border-radius: 2px;
    margin: 2px 4px;
    display: inline-block;
  }

  a {
    text-decoration: none;
    color: #5e7ce0;
    cursor: pointer;
  }
}

.theme-dark {
  .demo-desc {
    code {
      background: #333333;
    }
  }
}

.b-a-success {
  animation: border-trans 3s;
}
@keyframes border-trans {
  0% {
    border: 1px solid #5073e5;
    background: none;
  }
  50% {
    background: rgba(255, 95, 85, 0.1);
    border: 1px solid rgba(255, 95, 88, 0.6);
  }
  100% {
    border: 1px solid #5073e5;
    background: none;
  }
}
</style>
