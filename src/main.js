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
import "@/assets/css/styles.css"


library.add(faGithub, faGitlab, faEnvelope, faArrowCircleUp, faFacebookF, faTwitter, faReddit);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

console.log(`Current Environment: ${process.env.NODE_ENV}`);

const options = {
    color: '#FF6663',
    failedColor: '#874b4b',
    thickness: '.25rem',
    autoRevert: false,
    location: 'top',
    inverse: false,
    autoFinish: false,
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
};

Vue.use(VueProgressBar, options);
Vue.use(ScrollView, {
    throttle: 50,
    callbacks: []
});

console.log("Creating Vue instance.");
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


