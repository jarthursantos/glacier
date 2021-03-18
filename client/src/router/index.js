import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home/index'
import Login from '@/views/Login'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
