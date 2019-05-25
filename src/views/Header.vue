<template>
    <div>
        <router-link :to="{ name: 'home' }" draggable="false" class="router-link">
            <h2 id="site-title-sm" class="no-outline center-title inset-shadow-header">malinoskj2.dev</h2>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

    #site-title-sm {
        transition: 300ms all;
        font-family: 'Mukta', sans-serif;
        font-size: 4rem;
    }

</style>
