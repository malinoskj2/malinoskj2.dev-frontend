/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import readingTime from 'reading-time'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
    },
    getters: {
        posts: state => {
            const postSlice = state.posts.slice(1, 5)
                .map(post => {
                    return {
                        ...post,
                        publishedAt: dayjs(post.publishedAt),
                        readingStats: readingTime(post.content)
                    }
                });

            return postSlice;
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        }
    },
    actions: {
        async initPosts(context) {
            if (process.env.NODE_ENV === 'development') {
                const jsonFile = require('../test/assets/testData.json');
                context.commit('setPosts', jsonFile.articles)
            } else {
                const res = await fetch('https://newsapi.org/v2/everything?q=bitcoin&from=2019-04-20' +
                    '&sortBy=publishedAt&apiKey=90eeb1d31e304f8d83b6e9a83b3be329');
                const resBody = await res.json();
                context.commit('setPosts', resBody.articles)
            }
        }
    }
})
