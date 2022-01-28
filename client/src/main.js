import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'

Vue.use(VueRouter)

import App from './App.vue'
import router from './router'

import "./assets/common.css"

Vue.config.productionTip = false

import store from './storage/store'

Vue.prototype.$ajax = Axios
// 登录
Axios.interceptors.request.use(function (config) {
    if (localStorage.token) {
      config.headers.Authorization = `${localStorage.token}`
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  })

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){
    console.log(store.getters.isLogin);
    if (store.getters.isLogin){
      localStorage.token_expire = Date.parse(new Date()) + 1800000;
      next();
    }
  } else {
    next()
  }
})

let v = new Vue({
	el:'#app',
	router,
	store,
	render:c=>c(App)
})

console.log( v )
