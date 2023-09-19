<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import type { AccountFormType } from '../types/login-type'
import { accountFormRules } from '../rules/index'
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
//表单数据
const accountForm = reactive<AccountFormType>({
  username: '',
  password: '',
  imgcode: '',
  saveUserName: false,
  saveUserPass: false
})

import { useHandleSaveUserOrPass } from '../composable/account'
const { useSaveLocalUserOrPass, useGetLocalUserOrPass } = useHandleSaveUserOrPass(accountForm)
//图片验证码
import { useGetImgCode } from '../composable'
const { imgCodeSrc, GetImgCode } = useGetImgCode()

//提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      useSaveLocalUserOrPass()
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
onMounted(() => {
  useGetLocalUserOrPass()
})
</script>

<template>
  <div class="phone-code-page">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      :rules="accountFormRules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="accountForm.username"
          placeholder="请输入用户名"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          v-model="accountForm.password"
          placeholder="请输入密码"
          prefix-icon="Picture"
        />
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="flex">
          <div class="flex-item">
            <el-input
              size="large"
              v-model="accountForm.imgcode"
              placeholder="请输入图片验证码"
              prefix-icon="PictureRounded"
            />
          </div>
          <div class="smscode-img">
            <img :src="imgCodeSrc" @click="GetImgCode" alt="" />
          </div>
        </div> </el-form-item
      ><el-form-item>
        <div class="flex-item">
          <el-checkbox v-model="accountForm.saveUserName">记住用户名</el-checkbox>
        </div>
        <div class="flex-item">
          <el-checkbox v-model="accountForm.saveUserPass">记住密码</el-checkbox>
        </div>
        <div class="flex-item">
          <RouterLink to="/ResetPwd">忘记密码</RouterLink>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button class="login-btn" type="danger" round @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-btn {
  width: 100%;
}

.flex {
  width: 100%;

  .smscode-btn {
    width: 100px;
    text-align: center;
    margin-left: 10px;

    :deep(.el-button) {
      width: 100px;
      font-size: 12px;
    }
  }

  .smscode-img {
    img {
      width: 100px;
      margin-left: 10px;
      height: 40px;
    }
  }
}
</style>
