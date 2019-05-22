<template>

    <div id="app">

        <transition name="slide-fade">
            <h2 v-show="titleIsVisible" id="site-title">malinoskj2.dev</h2>
        </transition>

        <transition name="slide-fade-arrow">
            <font-awesome-icon v-show="titleIsVisible" :icon="iconSpecs" size="2x"
                               id="go-top-arrow" @click="onArrowClick"/>
        </transition>

        <div class="prog-bar-container">
            <vue-progress-bar :class="{'top-border': isLoaded }" class="prog-bar"></vue-progress-bar>
        </div>

        <router-view @show-nav="showNav()" @hide-nav="hideNav()" @read-post="readPost"/>

        <Footer/>
    </div>

</template>
<script>
    /* eslint-disable no-unused-vars */
    import Footer from '@/views/Footer.vue'

    export default {
        data() {
            return {
                titleIsVisible: false,
                isLoaded: false,
                iconSpecs: ['fa', 'arrow-circle-up'],
            }
        },
        components: {
            Footer
        },
        methods: {
            setLoaded() {
                this.isLoaded = true;
            },
            showNav() {
                this.titleIsVisible = true;
            },
            hideNav() {
                this.titleIsVisible = false;
            },
            onArrowClick() {
                window.scrollTo({top: 0, behavior: 'smooth'})
            },
            readPost(payload) {
            }
        },
        mounted() {
            this.$Progress.increase(100);
            this.setLoaded();
        },
        created() {
            this.$Progress.start();
            this.$Progress.increase(30);
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Fira+Mono:500,700|Mukta:400,500&display=swap');

    #app {
        font-family: 'Fira Mono', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: 4rem 0 0 0 !important;
    }

    .prog-bar-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
    }

    #site-title {
        transition: 300ms all;
        font-family: 'Mukta', sans-serif;
        font-size: 1.5rem;
        color: transparent;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        position: fixed;
        top: 0;
        left: 0;
        margin: .5rem 0 0 1rem;
        z-index: 100;

        background-color: rgba(178, 178, 178, 0.93);
        text-shadow: 2px 2px 3px rgba(255, 255, 255, .5);
    }

    #site-title:hover {
        background-color: rgba(255, 102, 99, 0.85);
        text-shadow: 2px 2px 3px rgba(255, 255, 255, .5);
        cursor: pointer;
    }

    .top-border {
        transform: scaleX(1.1);
    }

    html {
        background-color: rgba(244, 244, 244, 0.93);
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

    #go-top-arrow {
        position: fixed;
        bottom: 0%;
        right: 0%;
        margin: 0 1rem 1rem 0;
        padding: 0;
        transition: 300ms all;
        color: rgba(178, 178, 178, 0.93);
        filter: drop-shadow(0px 6px 4px rgba(12, 7, 38, 0.21));
        transform: scale(.9);
    }

    #go-top-arrow:hover {
        cursor: pointer;
        transform: scale(.8);
        color: rgba(255, 102, 99, .93);
        filter: drop-shadow(0px 0px 4px rgba(12, 10, 38, 0.31));
    }

    /* For Vue transitions/animations */

    /* Title Bg color has 0 opacity so not showing */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {

        transform: translateX(10px);
        filter: opacity(0);
    }

    /* For arrow */
    .slide-fade-arrow-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-arrow-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-arrow-enter, .slide-fade-arrow-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

</style>
