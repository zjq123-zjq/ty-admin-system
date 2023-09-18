<script setup lang="ts">
import { ref } from 'vue'

//引入组件类型
import type { ComponentMap } from './types/login-type'

//引入组件
import PhoneCodeForm from './components/PhoneCodeForm.vue'
import AccountForm from './components/AccountForm.vue'
import QcodeForm from './components/QcodeForm.vue'
//渐变背景
const bgColor = 'linear-gradient(0deg, #2196f3, #00bcd4, #00bcd4, #03a9f4)'
const loginPaneWidth = '800px'
const loginPaneHeight = '400px'

const tabList = ref<ComponentMap[]>([
  { name: '免密登录', componentName: PhoneCodeForm },
  { name: '账号登录', componentName: AccountForm },
  { name: '扫码登录', componentName: QcodeForm }
])

const currentTab = ref(0)

const changeTab = (index: number) => {
  currentTab.value = index
}
</script>

<template>
  <div class="login-page">
    <div class="login-panel">
      <div class="login-logo-panel">
        <img src="../../assets/logo.svg" alt="" />
      </div>
      <div class="login-split-line"></div>
      <div class="login-form-panel">
        <div class="tabs">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="{ selected: currentTab === index }"
            @click="changeTab(index)"
            class="tab-item"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="tabs-content">
          <component :is="tabList[currentTab].componentName" />
        </div>
      </div>
    </div>
    <div class="login-footer">版权所有：通用管理系统</div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: v-bind(bgColor);
  }

  &-panel {
    width: v-bind(loginPaneWidth);
    height: v-bind(loginPaneHeight);
    background-color: #fff;
    margin: 0 auto;
    margin-top: calc((100vh - v-bind(loginPaneHeight)) / 2);
    box-shadow: 0 0 20px 2px #000055;
    display: flex;

    .login-logo-panel {
      width: 40%;
      text-align: center;

      img {
        width: 60%;
        margin-top: calc((v-bind(loginPaneHeight) - 166px) / 2);
      }
    }

    .login-split-line {
      width: 1px;
      background-color: #f8f8f8;
      margin: 0 10px;
      height: v-bind(loginPaneHeight);
    }

    .login-form-panel {
      flex: 1;

      .tabs {
        height: 45px;
        line-height: 45px;
        text-align: center;
        display: flex;
        margin-top: 25px;

        .tab-item {
          flex: 1;
          cursor: pointer;

          &.selected,
          &:hover {
            color: red;
          }
        }
      }
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
