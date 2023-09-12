import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeApi.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterForm.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginForm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
