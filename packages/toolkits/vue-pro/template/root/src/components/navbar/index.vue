<template>
  <div class="navbar">
    <div class="left-side">
      <div style="display: flex; align-items: center">
        <img alt="logo" src="../../assets/images/logo-top2.png" />
        <h5>TinyUI Pro of Vue</h5>
      </div>
    </div>
    <ul class="right-side">
      <li>
        <tiny-tooltip
          class="item"
          effect="dark"
          :content="$t('settings.search')"
          placement="bottom"
        >
          <tiny-button :icon="iconSearch" circle></tiny-button>
        </tiny-tooltip>
      </li>
      <li>
        <tiny-tooltip
          class="item"
          effect="dark"
          :content="$t('settings.language')"
          placement="bottom"
        >
          <tiny-button
            :icon="iconLanguage"
            circle
            @click="changeLangDrop"
          ></tiny-button>
        </tiny-tooltip>

        <div v-if="LangDrop" class="trigger-lan">
          <li
            v-for="(item, index) in locales"
            :key="index"
            :value="item.value"
            @click="changeLocale(locales[index].value)"
            >{{ item.label }}</li
          >
        </div>
      </li>

      <li>
        <tiny-tooltip
          class="item"
          effect="dark"
          :content="$t('settings.navbar.help')"
          placement="bottom"
        >
          <tiny-button :icon="iconHelpQuery" circle @click="help"></tiny-button>
        </tiny-tooltip>
      </li>
      <li>
        <tiny-tooltip
          class="item"
          effect="dark"
          :content="$t('settings.title')"
          placement="bottom"
        >
          <tiny-button :icon="iconSetting" circle></tiny-button>
        </tiny-tooltip>
      </li>
      <li>
        <tiny-tooltip
          class="item"
          effect="dark"
          :content="$t('setting.user.set')"
          placement="bottom"
        >
          <tiny-user-head type="icon" round min>
            <div class="user-image">
              <img src="@/assets/images/user-head.png" alt="user" />
            </div>
          </tiny-user-head>
        </tiny-tooltip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import {
    Button as TinyButton,
    Tooltip as TinyTooltip,
    UserHead as TinyUserHead,
  } from '@huawei/tiny-vue';
  import {
    IconSearch,
    IconLanguage,
    IconHelpQuery,
    IconSetting,
  } from '@huawei/tiny-vue-icon';
  import { ref } from 'vue';
  import { LOCALE_OPTIONS } from '@/locale';
  import useLocale from '@/hooks/locale';

  const iconSearch = IconSearch();
  const iconLanguage = IconLanguage();
  const iconHelpQuery = IconHelpQuery();
  const iconSetting = IconSetting();

  const { changeLocale } = useLocale();
  const locales = [...LOCALE_OPTIONS];

  // 语言
  const LangDrop = ref(false);

  const changeLangDrop = () => {
    LangDrop.value = !LangDrop.value;
  };

  // 帮助中心
  const help = () => {
    window.location.href = '#';
  };
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #fff;
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;

    img {
      width: 45px;
      margin-right: 8px;
    }

    h5 {
      margin: 0;
      color: black;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;
    }
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;

    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;

      .item {
        display: inline-block;
        margin: 4px;
      }
    }

    .user-image {
      display: flex;
      flex-direction: column;
      height: 100%;
      font-weight: 600;
      font-size: 2em;
      font-style: oblique;
      fill: var(--ti-common-color-line-active);
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .trigger-lan {
      position: absolute;
      bottom: -62px;
      margin-left: -8px;
    }

    .trigger-user {
      position: absolute;
      bottom: -118px;
      width: 100px;
      margin-left: -42px;
    }

    .trigger-user {
      li {
        display: flex;
        justify-content: space-around;
        padding: 6px;
        font-size: 12px;
        text-align: center;
        list-style-type: none;
        background-color: #fff;
        box-shadow: 0 0 2px 2px var(--ti-common-color-bg-normal);
        cursor: pointer;
      }

      li:hover {
        background-color: #f5f6f7;
      }
    }

    .trigger-lan {
      li {
        display: block;
        padding: 6px;
        font-size: 12px;
        text-align: left;
        list-style-type: none;
        background-color: #fff;
        box-shadow: 0 0 2px 2px var(--ti-common-color-bg-normal);
        cursor: pointer;
      }

      li:hover {
        background-color: #f5f6f7;
      }
    }
  }
</style>

<style lang="less"></style>
