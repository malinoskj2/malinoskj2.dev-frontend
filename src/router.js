import Vue from 'vue'
import Router from 'vue-router'

const Home2 = () => import('./views/Home2.vue');
const Post = () => import('./components/Post.vue');
const Soft404 = () => import('./views/Soft404.vue');
const About = () => import('./views/About.vue');
const Footer = () => import('./views/Footer.vue');
const Header = () => import('./views/Header.vue');
const Overlay = () => import('./views/Overlay.vue');

Vue.use(Router);

export default new Router({
    base: __dirname,
    mode: process.env.NODENV  === 'production' ? 'history' : 'hash' ,
    scrollBehavior() {
        return {x: 0, y: 0};
    },
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                overlay: Overlay,
                header: Header,
                default: Home2,
                footer: Footer
            }
        },
        {
            path: '/about',
            name: 'about',
            components: {
                overlay: Overlay,
                header: Header,
                default: About,
                footer: Footer
            }
        },
        {
            path: '/posts/:id',
            name: 'post-view',
            components: {
                overlay: Overlay,
                header: Header,
                default: Post,
                footer: Footer
            },
        },
        {
            path: '/404',
            name: '404',
            components: {
                overlay: Overlay,
                default: Soft404,
            }
        },
        {
            path: '**',
            redirect: { name: '404' }
        },
        {
            path: '/home',
            redirect: '/'
        },
    ]
});
