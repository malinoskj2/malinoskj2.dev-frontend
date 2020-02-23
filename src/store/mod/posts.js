/* eslint-disable no-empty */
import dayjs from 'dayjs'
import readingTime from "reading-time";
import posts from '@/posts/posts.json'

const generatePostUrl = (post) => {
    return `${process.env.VUE_APP_DOMAIN}/#/posts/${post.id}`;
};

export default {
    state: {
        posts: posts.map(post => {

            const date = dayjs(post.publishedAt);

            return {
                ...post,
                publishedAt: date,
                dateString: date.format('MMMM-YYYY'),
                readingStats: readingTime("Temp"),
                url: generatePostUrl(post),
            }
        }),
    },
    getters: {
        posts: (state) => state.posts,
        postById: (state) => (id) => state.posts.find(post => post.id === id),
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
                    url: generatePostUrl(post)
                };
            });
        },
    },
};
