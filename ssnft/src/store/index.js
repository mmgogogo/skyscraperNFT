import { createStore, createLogger } from 'vuex'
import login from './login'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    login
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
