import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub, faGitlab, faFacebookF, faTwitter, faReddit} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faArrowCircleUp} from "@fortawesome/free-solid-svg-icons/faArrowCircleUp";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueProgressBar from 'vue-progressbar'
import ScrollView from 'vue-scrollview'


library.add(faGithub, faGitlab, faEnvelope, faArrowCircleUp, faFacebookF, faTwitter, faReddit);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

console.log(`Current Environment: ${process.env.NODE_ENV}`);

store.dispatch('initPosts')
    .then(() => {
        console.log("Dispatched successfully.");
        console.log("Creating Vue instance.");

        const options = {
            color: '#FF6663',
            failedColor: '#874b4b',
            thickness: '.25rem',
            height: '2px',
            transition: {
                speed: '0.1s',
                opacity: '0.6s',
                termination: 300
            },
            autoRevert: false,
            location: 'top',
            inverse: false,
            autoFinish: false
        };

        Vue.use(VueProgressBar, options);
        Vue.use(ScrollView, {
            throttle: 50,
            callbacks: []
        });

        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');

    })
    .catch(() => "Failed to get content.");

