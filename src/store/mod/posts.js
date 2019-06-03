const md = require('markdown-it')({
    html: true,
});

import dayjs from 'dayjs'
import readingTime from "reading-time";
import * as client from "../../client";
import Vue from 'vue'

export default {
    state: {
        posts: [],
    },
    getters: {
        posts: (state) => state.posts,
        postById: (state) => (id) => {
            const res = state.posts.find(post => post._id === id);
            if (res) {
                return res;
            }
        },
    },
    mutations: {
        setPosts(state, posts) {

            state.posts = posts.map(post => {
                const date = dayjs(post.publishedAt);
                return {
                    ...post,
                    publishedAt: date,
                    dateString: date.format('MMMM-YYYY'),
                    readingStats: readingTime(post.content),
                    content: md.render(post.content),
                    url: generatePostUrl(post)
                };
            });

            Vue.$log.debug(`Setting state.posts`);
            state.posts.forEach(post => {
                Vue.$log.debug(`title: ${post.title}`);
                Vue.$log.debug(`content: \n${post.content}`);
            });

        },
    },
    actions: {
        async initPosts(context) {
            const posts = await client.getRecentPosts();
            context.commit('setPosts', posts);
        },
        async initPostById(context, payload) {
            const res = context.getters.postById(payload.id);

            if (!res) {
                const post = await client.getPostById(payload.id);
                context.commit('setPosts', [post]);
            }
        }
    }
};

// eslint-disable-next-line no-unused-vars
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
