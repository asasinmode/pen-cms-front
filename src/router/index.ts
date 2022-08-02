import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'dashboard',
         component: Home
      },
      {
         path: '/manage',
         name: 'manage',
         component: () => import('../views/Manage.vue')
      },
      {
         path: '/browse',
         name: 'browse',
         component: () => import('../views/Browse.vue')
      },
      {
         path: '/users',
         name: 'users',
         component: () => import('../views/Users.vue')
      }
   ]
})

export default router
