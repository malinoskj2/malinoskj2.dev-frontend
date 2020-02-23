import dayjs from 'dayjs'
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
                url: generatePostUrl(post),
            }
        }),
    },
    getters: {
        posts: (state) => state.posts,
        postById: (state) => (id) => state.posts.find(post => post.id === id),
    },
};
