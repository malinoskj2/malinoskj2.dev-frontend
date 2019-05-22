<template>
    <div class="center-grid">
        <div class="home">

            <div id="card-container">

                <InfoCard :description="description" :descriptionStyle="descriptionStyle"
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
                <Post class="post" :id="post._id" :title="post.title"
                      @read-post="(payload) => $emit('read-post', payload )">
                    <h1 slot="title" class="post-title"
                        @click="$emit('read-post', {title: post.title})">{{post.title}}</h1>

                    <span slot="date" class="post-date">{{post.publishedAt.format('MMMM-YYYY')}}</span>
                    <span slot="reading-time" class="count-value">:: {{post.readingStats.text.toUpperCase()}}</span>

                    <p slot="text" v-html="post.content" class="post-text"/>
                </Post>
            </div>

        </div>
    </div>
</template>

<script>
    import InfoCard from '@/components/InfoCard.vue'
    import Post from '@/components/Post.vue'

    // <vue-simple-markdown slot="text" :source="post.content" class="post-text"/>
    export default {
        name: "Home2",
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
                    {name: "Home", link: "tempLinkA", count: 0},
                    {name: "Posts", link: "tempLinkB", count: 1},
                    {name: "About", link: "tempLinkB", count: 0},
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
            InfoCard,
            Post
        },
        created() {
            document.title = "malinoskj2.dev";
            this.getContent();
        },
        methods: {
            getContent() {
                this.$store.dispatch('initPosts')
                    .then(() => {
                        console.log("Dispatched successfully.");
                    })
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
    }

    #info-card {
        width: 540px;
    }

    .post-title:hover {
        cursor: pointer;
        color: #FF6663;
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

</style>
