import PhoneCodeForm from '@/views/Login/components/PhoneCodeForm.vue'

declare module 'vue' {
  interface globalComponents {
    PhoneCodeForm: typeof PhoneCodeForm
  }
}
