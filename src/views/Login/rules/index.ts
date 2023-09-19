import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

//手机号登录验证规则
export const PhoneCodeFormRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  smscode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})

export const accountFormRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})
