import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        title: "Skyscraper",
        userInfo : {
            expire : '',
            token : '',
            userName : '',
            albumNames : [],
        },
        currentAlbum : '',
        images : [],
    },
    getters : {
        getCurrentAlbum : state => {
            return state.currentAlbum
        },
        getToken(state) {
            return state.userInfo.token
        },
        getAlbumsName (state) {
            return state.userInfo.albumNames
        },
        isLogin() {
            var  token_expire = 0
            console.log(store.state.userInfo.expire);
            if(store.state.userInfo.expire){
                token_expire = store.state.userInfo.expire 
            }
            else {
                token_expire = localStorage.token_expire
            }
            let now_time = Date.parse(new Date())

            console.log('now_time : ',now_time,'expire : ',token_expire,localStorage.token)
            if (localStorage.token != '' && token_expire > now_time ) {
                localStorage.token_expire = now_time + 1800000
                return true
            }
            else {
                return false
            }
        }
    },
    mutations : {
        // 保存jwt认证后的token和expire
        setToken(state,payload) {
            // console.log(payload);

            state.userInfo.expire = payload.logintime + 1800000;
            state.userInfo.token = payload.cookie;
        },
    }

})

export default store