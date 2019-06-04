/* eslint-disable no-empty */
import hljs from 'highlight.js/lib/highlight';

import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import yaml from 'highlight.js/lib/languages/yaml';
import shell from 'highlight.js/lib/languages/shell';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('shell', shell);

const md = require('markdown-it')({
    html: true,
    langPrefix:   'language-',
    typographer:  true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return '';
    }
});

const emoji = require('markdown-it-emoji');
md.use(emoji);
md.renderer.rules.emoji = function (token, idx) {
    // eslint-disable-next-line no-undef
    return twemoji.parse(token[idx].content);
};

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
