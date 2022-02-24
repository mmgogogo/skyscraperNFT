import { createRouter, createWebHashHistory } from 'vue-router'
// createWebHistory
const routes = [
  // { path: '/', redirect: { name: 'Home' } }, // 重定向'
  // { path: '/skyscraper', name: 'Enter', redirect: { name: 'Home' } }, // 重定向
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

// process.env.BASE_URL
const router = createRouter({
  history: createWebHashHistory(),
  // mode: 'hash',
  // base: '/skyscraper',
  routes
})

export default router
