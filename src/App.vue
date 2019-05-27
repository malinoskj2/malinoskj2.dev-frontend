<template>

    <div id="app">

        <router-view name="overlay" :headerIsVisible="supportsIntersectionObserver() ? headerIsVisible : true"/>

        <transition appear name="slide-fade-notify">
        <div id="layout">

            <router-view name="header" v-observe-visibility="{callback: visibilityChanged, throttle: 50}"/>
            <router-view class="main-view-top-pad"/>

        </div>
        </transition>

        <div id="layout-footer">
            <transition appear name="basic-fade">
                <router-view name="footer" v-if="footerIsVisible"
                             :socialMediaLinkData="socialMediaLinkData" id="footer"/>
            </transition>
        </div>

    </div>

</template>
<script>
    import compat from './compat';

    export default {
        mixins: [compat],
        data() {
            return {
                headerIsVisible: true,
                footerIsVisible: true,
                socialMediaLinkData: [
                    {name: 'github', url: 'https://github.com/malinoskj2', iconSpecs: ['fab', 'github']},
                    {name: 'gitlab', url: 'https://gitlab.com/malinoskj2', iconSpecs: ['fab', 'gitlab']},
                    {name: 'email', url: 'mailto:jesse@malinoskj2.dev', iconSpecs: ['fa', 'envelope']},
                ],
            }
        },
        methods: {
            initRouteHooks() {
                this.$router.beforeEach((to, from, next) => {
                    this.$Progress.start();
                    next()
                });
                this.$router.afterEach(() => {
                    this.$Progress.finish()
                });
            },
            setHeaderVisiblity(visibility) {
                this.headerIsVisible = visibility;
            },
            visibilityChanged(isVisible) {
                this.setHeaderVisiblity(isVisible)
            },
        },
        mounted() {
            this.$log.info(`browser ${this.supportsIntersectionObserver() ?
                'supports' : 'does not support'} Intersection Observer API`);
            this.$Progress.finish();
        },
        created() {
            this.$Progress.start();
            this.initRouteHooks();
        },
        beforeCreate() {
            this.$log.info(`Current Environment: ${process.env.NODE_ENV}`);
            this.$log.info("Creating Vue instance.");
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Fira+Mono:500,700|Mukta:400,500,700&display=swap');

    #app {
        font-family: 'Fira Mono', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: .5rem 0 0 0 !important;
    }

    #layout {
        display: grid;
        grid-template-columns: auto 700px auto;
        grid-template-rows: auto auto;
    }

    #layout-footer {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }

    #layout > * {
        grid-column: 2/span 1;
    }

    html {
        background-color: rgba(244, 244, 244, 0.93);
    }

    .main-view-top-pad {
        min-height: 100vh;
        margin-top: 3rem;
    }

    * {
        margin: 0;
        padding: 0;
        border: 0;
    }

    ::selection {
        background: #FF6663; /* WebKit/Blink Browsers */
    }

    ::-moz-selection {
        background: #FF6663; /* Gecko Browsers */
    }

</style>
