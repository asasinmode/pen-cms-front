import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Configuration from '../views/Configuration.vue'
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
         path: '/configuration',
         name: 'configuration',
         component: Configuration
      },
      {
         path: '/browse',
         name: 'browse',
         component: Browse
      }
   ]
})

export default router
