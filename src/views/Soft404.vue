<template>
    <div class="center-grid">
        <transition appear name="basic-fade">
            <h1>404</h1>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Soft404",
        metaInfo: {
            title: '404 Not Found',
            content: 'noindex',
            htmlAttrs: {
                lang: 'en',
                amp: false
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-family: 'Mukta', sans-serif;
        font-size: 4rem;
        color: transparent;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;

        background-color: rgba(178, 178, 178, 0.93);
        text-shadow: 2px 2px 3px rgba(255, 255, 255, .5);
    }
</style>
