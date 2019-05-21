<template>
    <div class="share-icons">
        <div v-for="(icon ,index) in iconDataObjects" :key="index">
            <a :href="icon.url">
                <font-awesome-icon :icon="icon.iconSpecs" size="lg" :style="icon.style"/>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MediaIconGroup",
        props: {
            iconDataObjects: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style scoped>
    .share-icons {
        margin-left: 0;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }

    .share-icons > * {
        margin-right: 1rem;
        filter: saturate(0) opacity(.7) drop-shadow(0px 6px 4px rgba(12, 7, 38, 0.21));
        transition: all 300ms;
    }

    .share-icons > *:hover {
        cursor: pointer;
        filter: saturate(.5) opacity(1) drop-shadow(0px 0px 4px rgba(12, 7, 38, 0.0));
    }

</style>
