<template>
    <div class="center-grid">
        <div class="home">
            <div v-for="post in postJson" :key="post.condensed" class="post-container">
                <Post2 :postId="post.id" :clickable-title="true"
                      :show-expand-message="true" :show-post-divider="true"
                      :condensed="true" :show-media-icons="false"
                      :key="post.id"/>

                <div class="flex-center-item">
                    <img alt="post separator" src="@/assets/Line.svg"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Post2 from "../components/Post";

    export default {
        name: "Home2",
        metaInfo() {
            return {
                title: process.env.VUE_APP_DOMAIN,
            }
        },
        data() {
            return {
                postJson: require('../posts/posts'),
            }
        },
        components: {
            Post2,
        },

    }
</script>

<style scoped>
    .home {
        display: grid;
        grid-template-columns: 4fr;
        grid-template-rows: auto;
        grid-gap: 6rem 0rem;
        justify-content: space-evenly;
    }

    .post-container {
        margin-bottom: 5rem;
    }
</style>
