import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/ResetPwd',
      name: 'ResetPwd',
      component: () => import('../views/ResetPwd/index.vue')
    }
  ]
})

export default router
