import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import dayjs from 'dayjs'

import postModule from './mod/posts.js'

// eslint-disable-next-line no-unused-vars
const vuexLocal = new VuexPersistence({
    key: 'j2',
    storage: window.localStorage,
    modules: ['postModule']
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: process.env.NODE_ENV === 'production' ? [] : [],
    state: {
        sessionStartTime: dayjs(),
    },
    modules:{
        postModule
    }
})
