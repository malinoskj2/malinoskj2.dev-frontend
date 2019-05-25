/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import readingTime from 'reading-time'

import {getRecentPosts, getPostById} from './client.js'

const markdown = require( "markdown" ).markdown;

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        sessionStartTime: dayjs(),
        posts: [],
    },
    getters: {
        posts: state => {
            return state.posts;
        },
        postById: (state) => (id) => {
            const res = state.posts.find(post => post._id === id);
            if (res) {
                return res;
            }
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts.map(post => {
                return {
                    ...post,
                    publishedAt: dayjs(post.publishedAt),
                    readingStats: readingTime(post.content),
                    content: markdown.toHTML(post.content),
                    url: generatePostUrl(post)
                }
            });
        }
    },
    actions: {
        async initPosts(context) {
            const posts = await getRecentPosts();
            context.commit('setPosts', posts);
        },
        async initPostById(context, payload) {
            const res = context.getters.postById(payload.id);

            if (!res) {
                const post = await getPostById(payload.id);
                context.commit('setPosts', [post]);
            }
        }
    }
})

const logPosts = (entries) => {
    entries.forEach(entry => {
        console.log(`id: ${entry._id}`);
        console.log(`title: ${entry.title}`);
        console.log(`publishedAt: ${dayjs(entry.publishedAt).format('MMMM-YYYY')}`);
        console.log(`content: ${entry.content.substring(1, 10)}...`);
    })
};

const generatePostUrl = (post) => {
  return `${process.env.VUE_APP_DOMAIN}/#/posts/${post._id}`;
};
