<template>
    <div id="app" class="patterned-bg">
        <router-view/>
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css?family=Fira+Mono:500&display=swap');

    #app {
        font-family: 'Fira Mono', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding-top: 4rem;
    }

    html {
        background-color: rgba(251, 251, 251, 0.59);
    }

</style>
