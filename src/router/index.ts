import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Manage from '../views/Manage.vue'
import Browse from '../views/Browse.vue'

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
         component: Manage
      },
      {
         path: '/browse',
         name: 'browse',
         component: Browse
      }
   ]
})

export default router
