<template>
    <div class="center-grid">
        <div class="home">

            <div id="card-container">

                <InfoCard v-responsive="['hidden-xs', 'hidden-sm']"
                        :description="description" :descriptionStyle="descriptionStyle"
                          :linkPairs="linkPairs" :linkStyle="linkStyle" id="info-card">

                    <img alt="avatar image" slot="image" id="avatar-image"
                         src="https://avatars3.githubusercontent.com/u/41254238?s=460&v=4">
                </InfoCard>

                <scroll-view :offset="triggerOffset">
                    <template slot-scope="markers">
                        <scroll-marker
                                v-for="marker in markerNames"
                                :name="marker"
                                :key="marker"
                                :visible="markers[marker]"
                                :spacing="30"
                                @isVisible="$emit('hide-nav')"
                                @isNotVisible="$emit('show-nav')"
                        ></scroll-marker>
                        </template>
                </scroll-view>
            </div>

            <div v-for="(post, index) in this.$store.getters.posts" :key="index" class="post-container">
                <PostView :postId="post._id" :clickable-title="true"
                          :show-expand-message="true" :show-post-divider="true"
                          :condensed="true" :show-media-icons="false"/>
            </div>

        </div>
    </div>
</template>

<script>
    import InfoCard from '@/components/InfoCard.vue'
    import PostView from "../components/Post";

    export default {
        name: "Home2",
        metaInfo() {
            return {
                title: process.env.VUE_APP_DOMAIN
            }
        },
        data() {
            return {
                description: 'Hello, I’m Jesse Malinosky, developer and student.' +
                    ' Fan of learning and unravelling the ' +
                    ' world’s mysteries through code.',
                descriptionStyle: {
                    fontFamily: "Mukta, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#19323C'
                },
                linkPairs: [
                    {name: "Home", link: "tempLinkA", path: {name: 'home'}, count: 0},
                    {name: "Posts", link: "tempLinkB", path: {name: 'home'}, count: 1},
                    {name: "About", link: "tempLinkB", path: {name: 'home'}, count: 0},
                ],
                linkStyle: {
                    fontFamily: "Fira Mono, monospace",
                    fontWeight: 500,
                    color: '#19323C'
                },
                accentColor: "#FF6663",
                markerNames: ['first'],
                triggerOffset: -70
            }
        },
        components: {
            PostView,
            InfoCard,
        },
        created() {
            document.title = "malinoskj2.dev";
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

    #avatar-image {
        margin-right: 2rem;
        height: 10rem;
        border-radius: 10px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        user-drag: none;
        -webkit-touch-callout: none;
        pointer-events: none;
    }

    #info-card {
        margin-left: 1rem;
        width: 540px;
    }

    .home {
        max-width: 700px;
        min-height: 100vh;
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
