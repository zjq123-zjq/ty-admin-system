import { type DefineComponent } from 'vue'
//定义组件名称和组件类型的映射关系
export type ComponentMap = {
  name: string
  componentName: DefineComponent<{}, {}, any>
}

//手机号登录类型
export type PhoneFormType = {
  username: string
  smscode: string
  imgcode: string
  savePhone?: boolean
}
//账号密码的类型
export type AccountFormType = Pick<PhoneFormType, 'imgcode'> & {
  password: string
  username: string
  saveUserName?: boolean
  saveUserPass?: boolean
}
