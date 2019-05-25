import Vue from 'vue'
import Router from 'vue-router'

const Home2 = () => import('./views/Home2.vue');
const PostView = () => import('./components/Post.vue');

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
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
        }
    ]
})
