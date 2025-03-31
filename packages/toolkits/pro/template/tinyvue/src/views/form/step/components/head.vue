<template>
  <div class="user">
    <transition-fade-down-group>
      <img src="@/assets/images/user-head.png" alt="user" class="user-image" />
      <div>
        <transition-fade-down-group>
          <h3 class="user-name">{{ $t('stepForm.head.admin') }}</h3>
          <h3 class="user-name">{{ userStore.userInfo.name }}</h3>
        </transition-fade-down-group>
      </div>
    </transition-fade-down-group>
  </div>
  <div class="divider"></div>
  <div class="user-content">
    <tiny-layout>
      <tiny-row :flex="true" justify="center" class="margin-bottom">
        <transition-fade-down-group>
          <img src="@/assets/images/head-1.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.recruitment.department') }}</div>
              <div class="space"></div>
              <div>{{ userStore.userInfo.department }}</div>
            </div>
          </tiny-col>
          <img src="@/assets/images/head-2.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.recruitment.type') }}</div>
              <div class="space"></div>
              <div>{{ userStore.userInfo.employeeType }}</div>
            </div>
          </tiny-col>
          <img src="@/assets/images/head-3.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.recruitment.position') }}</div>
              <div class="space"></div>
              <div>{{ userStore.userInfo.job }}</div>
            </div>
          </tiny-col>
        </transition-fade-down-group>
      </tiny-row>
      <tiny-row :flex="true" justify="center" class="margin-bottom">
        <transition-fade-down-group>
          <img src="@/assets/images/head-4.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.probation.start') }}</div>
              <div class="space"></div>
              <div>
                {{ userStore.userInfo.probationStart }}
                ~
                {{ userStore.userInfo.probationEnd }}
              </div>
            </div>
          </tiny-col>
          <img src="@/assets/images/head-5.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.start.date') }}</div>
              <div class="space"></div>
              <div>{{ userStore.userInfo.protocolStart }}</div>
            </div>
          </tiny-col>
          <img src="@/assets/images/head-6.png" class="head-image" />
          <tiny-col :span="6">
            <div class="col">
              <div>{{ $t('stepForm.probation.period') }}</div>
              <div class="space"></div>
              <div
                >{{ userStore.userInfo.probationDuration
                }}{{ $t('stepForm.probation.day') }}</div
              >
            </div>
          </tiny-col>
        </transition-fade-down-group>
      </tiny-row>
    </tiny-layout>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import {
    Layout as TinyLayout,
    Row as TinyRow,
    Col as TinyCol,
  } from '@opentiny/vue';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();
</script>

<style scoped lang="less">
  .user-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 66%;
    padding-bottom: 8px;
  }

  .divider {
    width: 1px;
    height: 60px;
    margin-top: 70px;
    background: #fff;
    opacity: 0.3;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 16%;
  }

  .user-image {
    font-style: oblique;
    border-radius: 60px;
    fill: var(--tv-common-color-line-active);
  }

  .space {
    height: 10px;
  }

  .head-image {
    margin-top: 6px;
    padding-right: 10px;
  }

  .user-name {
    padding-left: 26px;
    color: #fff;
    font-weight: 600;
    font-size: large;
  }

  .margin-bottom {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .col {
    color: #fff;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .margin-bottom {
      margin-top: 10px;
      margin-bottom: 12px;
    }
  }
  @media (max-width: @screen-ml) {
    .margin-bottom {
      margin-top: 10px;
      margin-bottom: 12px;
    }
  }
  @media (max-width: @screen-xs) {
    .user {
      width: 25%;
    }
  }
</style>
