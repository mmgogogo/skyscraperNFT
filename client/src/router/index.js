import Vue from 'vue'
import VueRouter from 'vue-router'

import Wallet from '../views/wallet/index.vue'
import Hot from '../views/hot/hot.vue'

import Minter from '../views/mint/mint.vue'
import Home from '../views/home/index.vue'

import DemoWallet from '../views/wallet/index.vue'
import DemoMint from '../views/mint/index.vue'
import DemoHot from '../views/hot/index.vue'
import DemoHome from '../views/home/index.vue'

// 安装插件
Vue.use(VueRouter)

// 创建对象并实例
let router = new VueRouter({
  mode:'history',
  routes:[
    { path:'/', redirect:{ name:'building' } }, //重定向
    { name: 'index', path: '/home', component: Home, 
      children: [
        {path: 'wallet', name: 'wallet', component: Wallet}
      ]
    },
    { path: '/building', name: 'building', component: Home,
      children: [
        {path: 'hot', component: Hot}, 
        {path: 'mint', components: { helper: Minter } }
      ]
    },

    { path:'/demo/wallet', component: DemoWallet }, //重定向
    { path:'/demo/mint', component: DemoMint }, //重定向
    { path:'/demo/hot', component: DemoHot }, //重定向
    { path:'/demo/home', component: DemoHome},

    { path: '/404', component: { template: '<p>Page Not Found</p>' } },
    { path: '*', redirect: '/404' }
	]
})

export default router
