import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import dayjs from 'dayjs'

import postModule from './mod/posts.js'

const persistent = ['postModule'];

const vuexLocal = new VuexPersistence({
    key: 'j2',
    storage: window.localStorage,
    modules: process.env.NODE_ENV === 'production' ? persistent : []
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        sessionStartTime: dayjs(),
    },
    modules:{
        postModule
    }
})
