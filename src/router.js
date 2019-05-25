import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const Home2 = () => import('./views/Home2.vue');
const PostView = () => import('./components/Post.vue');
const Soft404 = () => import('./views/Soft404.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0};
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home2,
        },
        {
            path: '/posts/:id',
            name: 'post-view',
            component: PostView,
            beforeEnter: (to, from, next) => {
                redirectIfNonexistent(postIdFromPath(to.path), '/404', next);
            }
        },
        {
            path: '*',
            redirect: { name: '404' }
        },
        {
            path: '/404',
            name: '404',
            component: Soft404
        }
    ]
});

const redirectIfNonexistent = (id, redirectPath, next) => {
    if (!storeContainsPost(id)) {
        store.dispatch('initPosts')
            .then(() => {
                if (storeContainsPost(id)) {
                    next();
                } else {
                    next({path: redirectPath});
                }
            })
            .catch(() => console.log('failed to dispatch'));
    }
    next();
};

const storeContainsPost = (postId) => {
    return store.getters.posts.some(post => post._id == postId);
};

const postIdFromPath = (path) => {
    return path.substring(path.lastIndexOf('/') + 1);
};
