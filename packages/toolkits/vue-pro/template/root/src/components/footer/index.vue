<template>
  <div class="footer">
    <div>
      TinyUI Pro：
      <a href="https://github.com/login">
        <img src="@/assets/images/github.png" alt="github" /> </a
      >OpenTiny
    </div>
    <div>OpenTiny 出品</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--ti-default-font-color);
    font-size: var(--ti-default-font-size);
    font-family: var(--ti-default-font-family);
    text-align: center;

    a {
      padding-right: 5px;
    }

    .footer:last-child {
      padding-top: 10px;
    }
  }
</style>
