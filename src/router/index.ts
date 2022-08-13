import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Configuration from '@/views/Configuration.vue'
import Browse from '@/views/Browse.vue'
import User from '@/views/User.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'dashboard',
         component: Dashboard
      },
      {
         path: '/configuration',
         name: 'configuration',
         component: Configuration
      },
      {
         path: '/browse',
         name: 'browse',
         component: Browse
      },
      {
         path: '/user',
         name: 'login',
         component: User
      }
   ]
})

export default router
