import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import "@/styles/styles.css"
import "@/styles/animations.css"
import "@/styles/util.css"
import "@/styles/reset.css"
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub, faGitlab, faFacebookF, faTwitter, faReddit} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faArrowCircleUp} from "@fortawesome/free-solid-svg-icons/faArrowCircleUp";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueProgressBar from 'vue-progressbar'
import ScrollView from 'vue-scrollview'
import Toasted from 'vue-toasted';
import SocialSharing from 'vue-social-sharing';
import responsive from 'vue-responsive'
import VueMeta from 'vue-meta'

library.add(faGithub, faGitlab, faEnvelope, faArrowCircleUp, faFacebookF, faTwitter, faReddit);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

console.log(`Current Environment: ${process.env.NODE_ENV}`);

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    position: 'bottom-center', duration: 3000,
    className: 'j2-notification', containerClass: 'j2-notification-container'
});

Vue.use(VueProgressBar, {
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
});

Vue.use(ScrollView, {
    throttle: 50,
    callbacks: []
});

Vue.use(SocialSharing);
Vue.use(responsive);
Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
});

console.log("Creating Vue instance.");

new Vue({
    router,
    store,
    render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app');
