import { type DefineComponent } from 'vue'
//定义组件名称和组件类型的映射关系
export type ComponentMap = {
  name: string
  componentName: DefineComponent<{}, {}, any>
}
