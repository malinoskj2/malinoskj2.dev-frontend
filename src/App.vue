<template>
    <div id="app" class="patterned-bg">

        <h2 id="site-title"
            :style="navTitleColor" @mouseenter="onTitleHoverEnter" @mouseleave="onTitleHoverExit">malinoskj2.dev</h2>

        <font-awesome-icon :icon="iconSpecs" size="2x" class="media-link" id="go-top-arrow" :style="goTopArrowStyle"
                           @mouseenter="onArrowEnter" @mouseleave="onArrowExit" @click="onArrowClick"/>

        <div class="prog-bar-container">
            <vue-progress-bar :class="{'top-border': isLoaded }" class="prog-bar"></vue-progress-bar>
        </div>

        <router-view @show-nav="showNav()" @hide-nav="hideNav()" @read-post="readPost"/>

    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */
    export default {
        data() {
            return {
                titleIsVisible: false,
                isLoaded: false,
                navTitleColor: "background-color: rgba(244, 244, 244, 0); " +
                    "text-shadow: 2px 2px 3px rgba(255, 255, 255, 0); cursor: default; pointer-events: none;",
                goTopArrowStyle: {color: 'rgba(178, 178, 178, 0) '},
                iconSpecs: ['fa', 'arrow-circle-up'],
            }
        },
        methods: {
            setLoaded() {
                this.isLoaded = true;
            },
            showNav() {
                this.titleIsVisible = true;
                this.navTitleColor = "background-color: rgba(178, 178, 178, 0.93); " +
                    "text-shadow: 2px 2px 3px rgba(255, 255, 255, .5);";
                this.goTopArrowStyle = {color: 'rgba(178, 178, 178, 0.93) '};
            },
            hideNav() {
                this.titleIsVisible = false;
                this.navTitleColor = "background-color: rgba(244, 244, 244, 0); " +
                    "text-shadow: 2px 2px 3px rgba(255, 255, 255, 0); cursor: default; pointer-events: none;";
                this.goTopArrowStyle = {color: 'rgba(178, 178, 178, 0) '}
            },
            onTitleHoverEnter() {
                if (this.titleIsVisible) {
                    this.navTitleColor = "background-color: rgba(255, 102, 99, 0.85); " +
                        "text-shadow: 2px 2px 3px rgba(255, 255, 255, .5); cursor: pointer;";
                }
            },
            onTitleHoverExit() {
                if (this.titleIsVisible) {
                    this.navTitleColor = "background-color: rgba(178, 178, 178, 0.93); " +
                        "text-shadow: 2px 2px 3px rgba(255, 255, 255, .5); cursor: default;";

                }
            },
            onArrowEnter() {
                if (this.titleIsVisible) {
                    this.goTopArrowStyle = {color: 'rgba(255, 102, 99, .93)'};
                }
            },
            onArrowExit() {
                if (this.titleIsVisible) {
                    this.goTopArrowStyle = {color: 'rgba(178, 178, 178, 0.93) '};
                }
            },
            onArrowClick() {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            },
            readPost(payload) {
            }
        },
        mounted() {
            //  [App.vue specific] When App.vue is finish loading finish the progress bar
            this.$Progress.start();
            setTimeout(() => {
                this.$Progress.increase(20)
            }, 20);
            setTimeout(() => {
                this.$Progress.increase(60)
            }, 40);
            setTimeout(() => {
                this.$Progress.increase(100)
            }, 80);
            setTimeout(() => {
                this.setLoaded();
            });
            // this.$Progress.finish();
        },
        created() {
            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start();
            this.$Progress.increase(100)
        }
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Fira+Mono:500,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Mukta&display=swap');

    #app {
        font-family: 'Fira Mono', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding-top: 4rem;
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
    }

    .top-border {
        transform: scaleX(1.1);
    }

    html {
        background-color: rgba(244, 244, 244, 0.93);
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
        filter: drop-shadow(0px 6px 4px rgba(12, 7, 38, 0.21));
        transform: scale(.9);
    }

    #go-top-arrow:hover {
        cursor: pointer;
        transform: scale(.8);
        filter: drop-shadow(0px 0px 4px rgba(12, 10, 38, 0.31));
    }

</style>
