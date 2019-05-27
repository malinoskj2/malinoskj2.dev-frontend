import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import dayjs from 'dayjs'
import postModule from './mod/posts.js'
import userModule from './mod/user.js'

const vuexLocal = new VuexPersistence({
    key: `j2-${process.env.VUE_APP_STATE_VERSION}`,
    storage: window.localStorage,
    reducer: state => {
        return {
            userModule: {
                accessTime: dayjs(),
                previousAccessTime: state.userModule.accessTime,
                accessCount: 1 + state.userModule.accessCount
            }
        };
    }
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: process.env.NODE_ENV === 'production' ? [vuexLocal.plugin] : [vuexLocal.plugin],
    modules: {
        postModule, userModule
    }
})
