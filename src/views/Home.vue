<template>
    <div class="home">
        <img alt="avatar image"
             id="avatar-image"
             src="https://avatars3.githubusercontent.com/u/41254238?s=460&v=4">

        <div id="media-link-container">
            <font-awesome-icon :icon="['fab', 'github']" size="2x" class="media-link"/>
            <font-awesome-icon :icon="['fab', 'gitlab']" size="2x" class="media-link"/>
            <font-awesome-icon :icon="['fas', 'envelope']" size="2x" class="media-link"/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        data() {
            return {

            }
        },
        components: {
        }
    }
</script>

<style scoped>
    #avatar-image {
        width: 10rem;
        border-radius: 10%;
        filter: drop-shadow(0px 16px 16px rgba(130, 130, 137, 0.37));
    }

    #media-link-container {
        margin-top: 4rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

    .media-link {
        margin: 0rem 1rem 0rem 1rem;
    }

</style>
