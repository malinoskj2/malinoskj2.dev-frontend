<template>
    <div id="overlay-container">

        <div class="prog-bar-container">
            <vue-progress-bar :class="{'top-border': isLoaded }" class="prog-bar"/>
        </div>

        <router-link v-responsive.lg.xl
                     :to="{ name: 'home' }" draggable="false" class="router-link">
            <transition name="slide-fade">
                <h2 v-show="!headerIsVisible" id="site-title-overlay"
                    class="no-outline inset-shadow-header">malinoskj2.dev</h2>
            </transition>
        </router-link>

        <transition name="slide-fade-arrow">
            <font-awesome-icon v-show="!headerIsVisible" :icon="iconSpecs" size="2x"
                               id="go-top-arrow" @click="onArrowClick" draggable="false"/>
        </transition>

        <NavLinkGroup v-responsive.lg.xl
                      :link-pairs="linkPairs" class="nav-link-group" draggable="false"
                      linkClass="inset-shadow-header" :unimplemented="unimplemented"
                      delimiter=""/>

    </div>
</template>

<script>
    import NavLinkGroup from '@/components/NavLinkGroup.vue'

    export default {
        name: "Overlay",
        data() {
            return {
                markerNames: ['first'],
                isLoaded: true,
                iconSpecs: ['fa', 'arrow-circle-up'],
                triggerOffset: -70,
                titleIsVisible: false,
                linkPairs: [
                    {name: "home", link: "tempLinkA", path: {name: 'home'}, count: 0},
                    {name: "posts", link: "tempLinkB", path: {name: 'home'}, count: 1},
                    {name: "about", link: "tempLinkB", path: {name: 'home'}, count: 0},
                ],
                unimplemented: ['posts', 'about'],
            }
        },
        props: {
            headerIsVisible: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        components: {
            NavLinkGroup
        },
        methods: {
            showNav() {
                this.titleIsVisible = true;
            },
            hideNav() {
                this.titleIsVisible = false;
            },
            onArrowClick() {
                window.scrollTo({top: 0, behavior: 'smooth'})
            },
            visibilityChanged() {
                console.log('visibility changed');
            }
        }
    }
</script>

<style scoped>

    #overlay-container {
        margin: 0;
        padding: 0;
    }

    #site-title-overlay {
        position: fixed;
        top: 0;
        left: 0;
        margin: .5rem 0 0 1rem;
        padding: 0 1rem 0 0;
        z-index: 100;
        font-size: 1.5rem;
        transition: 300ms all;
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

    .prog-bar-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
    }

    .top-border {
        transform: scaleX(1.1);
    }

    .nav-link-group {
        position: fixed;
        margin: 0rem 1rem 0 0;
        padding: 0;
        right: 0;

        font-family: Mukta, sans-serif;
        font-size: 1rem;
    }
    .visibility-trigger {
        border: 20px solid red;
    }
</style>
