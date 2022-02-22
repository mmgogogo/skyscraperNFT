import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: { name: 'Home' } }, // 重定向'
  { path: '/skyscraper', redirect: { name: 'Home' } }, // 重定向
  {
    path: '/skyscraper/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

// process.env.BASE_URL
const router = createRouter({
  history: createWebHistory(),
  base: '/skyscraper',
  routes
})

export default router
