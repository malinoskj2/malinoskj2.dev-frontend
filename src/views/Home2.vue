<template>
    <div class="center-grid">
        <div class="home">
                <div v-for="post in this.$store.getters.posts" :key="post.condensed" class="post-container">
                    <Post :postId="post._id" :clickable-title="true"
                          :show-expand-message="true" :show-post-divider="true"
                          :condensed="true" :show-media-icons="false"
                          :key="post._id"
                          @read-post="readPost"/>

                    <div class="flex-center-item">
                        <img alt="post separator" src="@/assets/Line.svg"/>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
    import Post from "../components/Post";

    export default {
        name: "Home2",
        metaInfo() {
            return {
                title: process.env.VUE_APP_DOMAIN,
            }
        },
        components: {
            Post,
        },
        methods: {
            initPosts() {
                this.$store.dispatch('initPosts')
                    .then(() =>  {
                        this.$log.info('Dispatched successfully.');
                    })
                    .catch(() => "Failed to get content.");
            },
            readPost({title,id}) {
                this.$log.info(`read post: ${title} : ${id}`);
            }
        },
        created() {
            this.initPosts();
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
