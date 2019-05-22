import Vue from 'vue'
import Router from 'vue-router'

const Home2 = () => import('./views/Home2.vue');
const PostView = () => import('./views/PostView.vue');

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
            meta: {
                progress: {
                    func: [
                        {call: 'color', modifier: 'temp', argument: '#ffb000'},
                        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
                        {call: 'location', modifier: 'temp', argument: 'top'},
                        {
                            call: 'transition',
                            modifier: 'temp',
                            argument: {speed: '.1s', opacity: '0.6s', termination: 400}
                        }
                    ]
                }
            }
        },
        {
            path: '/posts/:id',
            name: 'post-view',
            component: PostView,
        }
    ]
})
