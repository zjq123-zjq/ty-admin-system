<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import type { PhoneFormType } from '../types/login-type'
import { PhoneCodeFormRules } from '../rules/index'
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
//表单数据
const ruleForm = reactive<PhoneFormType>({
  username: '',
  smscode: '',
  imgcode: '',
  savePhone: false
})

//短信倒计时
import { useGetPhoneCode, useHandleSaveUser } from '../composable/phone-code'
const { smsCodeBtnText, disabled, getSmsCode } = useGetPhoneCode(ruleForm)
//图片验证码
import { useGetImgCode } from '../composable'
const { imgCodeSrc, GetImgCode } = useGetImgCode()
//保存用户名
const { saveLocalUser, getLocalUser } = useHandleSaveUser(ruleForm)

//提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveLocalUser()
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
onMounted(() => {
  getLocalUser()
})
</script>

<template>
  <div class="phone-code-page">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="PhoneCodeFormRules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="ruleForm.username"
          placeholder="请输入手机号"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="smscode">
        <div class="flex">
          <div class="flex-item">
            <el-input
              size="large"
              v-model="ruleForm.smscode"
              placeholder="请输入短信验证码"
              prefix-icon="Picture"
            />
          </div>
          <div class="smscode-btn">
            <el-button :disabled="disabled" type="primary" size="large" @click="getSmsCode">{{
              smsCodeBtnText
            }}</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="flex">
          <div class="flex-item">
            <el-input
              size="large"
              v-model="ruleForm.imgcode"
              placeholder="请输入图片验证码"
              prefix-icon="PictureRounded"
            />
          </div>
          <div class="smscode-img">
            <img :src="imgCodeSrc" @click="GetImgCode" alt="" />
          </div>
        </div> </el-form-item
      ><el-form-item>
        <el-checkbox v-model="ruleForm.savePhone">记住用户名</el-checkbox>
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
