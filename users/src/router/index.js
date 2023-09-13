import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

let AdminAuth = (to, from, next) => {
  let token = localStorage.getItem('token')

  if(token != undefined) {
    
    let req = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.post('http://localhost:8686/validate', {}, req).then(res => {
      console.log(res)
      next()
    }).catch(err => {
      console.log(err)
      next('/login')
    })

  } else {
    next('/login')
  }
}

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
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: () => import('../views/AdminPanel.vue'),
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/edit/:id',
    name: 'EditUsers',
    component: () => import('../views/EditUser.vue'),
    beforeEnter: AdminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
