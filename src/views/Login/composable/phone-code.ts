import { ref } from 'vue'
import utils from '@/utils/utils'
import type { PhoneFormType } from '../types/login-type'

/**获取短信验证码以及倒计时 *@param loginForm*/
export function useGetPhoneCode(loginForm: PhoneFormType) {
  let timer: number
  const currentTime = ref(0)
  const smsCodeBtnText = ref('获取验证码')
  const disabled = ref(false)
  const getSmsCode = () => {
    //调用短信验证码接口
    if (!loginForm.username) {
      utils.showError('请输入手机号')
      return
    }
    disabled.value = true
    clearInterval(timer)
    currentTime.value = 60
    smsCodeBtnText.value = currentTime.value + '秒后重新获取'
    timer = setInterval(() => {
      currentTime.value--
      smsCodeBtnText.value = currentTime.value + '秒后重新获取'
      if (currentTime.value <= 0) {
        disabled.value = false
        smsCodeBtnText.value = '获取验证码'
        clearInterval(timer)
        timer = 0
      }
    }, 1000)
  }
  return { smsCodeBtnText, disabled, getSmsCode }
}

/**记住用户名功能 *@param loginForm*/
export function useHandleSaveUser(loginForm: PhoneFormType) {
  const saveLocalUser = () => {
    if (loginForm.savePhone) {
      //将用户名存在到本地
      utils.saveData('Phone', loginForm.username)
      //将保存的状态存储到本地
      utils.saveData('savePhone', loginForm.savePhone)
    } else {
      utils.removeData('Phone')
      utils.removeData('savePhone')
    }
  }
  //回填用户名
  const getLocalUser = () => {
    loginForm.username = utils.getData('Phone')
  }
  return {
    saveLocalUser,
    getLocalUser
  }
}
