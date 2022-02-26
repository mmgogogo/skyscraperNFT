import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3Component from './web3'

import './assets/css/common.css'
import './assets/css/index.css'
import './assets/css/hot.css'
import './assets/css/building.css'
import './assets/css/profile.css'
import './assets/css/ladder.css'
import './assets/css/game.css'
import './assets/css/chat.css'

createApp(<App />).use(Web3Component).use(store).use(router).mount('#app')
