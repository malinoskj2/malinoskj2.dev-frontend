<template>
    <div class="center-grid">
        <div class="home">

            <div v-for="(post, index) in this.$store.getters.posts" :key="index" class="post-container">
                <PostView :postId="post._id" :clickable-title="true"
                          :show-expand-message="true" :show-post-divider="true"
                          :condensed="true" :show-media-icons="false"/>
            </div>

        </div>
    </div>
</template>

<script>
    import PostView from "../components/Post";

    export default {
        name: "Home2",
        metaInfo() {
            return {
                title: process.env.VUE_APP_DOMAIN
            }
        },
        components: {
            PostView,
        },
        created() {
            this.initPosts();
        },
        methods: {
            initPosts() {
                this.$store.dispatch('initPosts')
                    .then(() => console.log('Dispatched successfully.'))
                    .catch(() => "Failed to get content.");
            }
        }
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
