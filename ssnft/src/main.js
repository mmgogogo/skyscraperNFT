import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3Component from './web3'
// import * as Toasted from 'mosha-vue-toastify'
// import 'mosha-vue-toastify/dist/style.css'

const app = createApp(<App />)

// app.directive('click-outside', {
//   bind (el, { value }) {
//     console.log('[main] bind ', el, value)
//     el._handler = e => {
//       if (!el.contains(e.target)) {
//         value(e)
//       }
//     }
//     document.addEventListener('click', el._handler)
//   },
//   unbind (el) {
//     console.log('[main] unbind ', el)
//     document.removeEventListener('click', el._handler)
//   }
// })

app.use(Web3Component).use(store).use(router).mount('#app')
