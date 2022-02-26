import Vue from 'vue'
import VueRouter from 'vue-router'
import lanhu_shouye from '../views/lanhu_shouye/index.vue'

Vue.use(VueRouter)

const routes = [
    {
    path: '/',
    redirect: "/lanhu_shouye"
  },
  {
    path: '/lanhu_shouye',
    name: 'lanhu_shouye',
    component: lanhu_shouye
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
