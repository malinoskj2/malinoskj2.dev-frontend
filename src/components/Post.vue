<template>

    <div class="post" :class="{'post-view': !condensed }" draggable="false">
        <router-link :to="postPath" class="reset-a" draggable="false">
            <h1 class="post-title" :class="{'clickable-title': clickableTitle,
                'default-cursor': !clickableTitle}" @click="emitRead" :key="post._id"
            >{{this.post.title}}</h1>
        </router-link>

        <p class="sub-info-section">
            <span class="post-date">{{this.post.dateString}}</span>
            <span class="reading-time reading-text-style">:: {{this.readingStatString}}</span>
        </p>

        <div v-html="this.post.content" class="post-text" draggable="false"
             :class="{ 'fade-out': condensed ,'condensed': condensed,
               'condensed-show-first': condensedCount >=1,
                'condensed-show-second': condensedCount >=2,
                 'condensed-show-third': condensedCount >=3,
                  'condensed-show-fourth': condensedCount >=4 }"></div>

        <MediaIconGroup v-if="showMediaIcons" :title="this.post.title" :url="this.post.url" class="icon-group"/>
        <div>
            <router-link :to="postPath" v-if="showExpandMessage">
                <p id="expand-message" class="flex-center-item"
                   @click="emitRead">
                    {{expandMessage}}
                </p>
            </router-link>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-unused-vars */
    import MediaIconGroup from '@/components/MediaIconGroup.vue';

    export default {
        name: "PostView",
        metaInfo() {
            return {
                title: this.metaDataTitle()
            }
        },
        data() {
            return {
                post: {
                    _id: "",
                    title: '',
                    content: '',
                    readingStats: {
                        text: ''
                    },
                    url: '',
                    publishedAt: {},
                    dateString: ''
                }
            }
        },
        components: {
            MediaIconGroup
        },
        props: {
            postId: {
                type: String,
                required: false
            },
            clickableTitle: {
                type: Boolean,
                required: false,
                default: false
            },
            expandMessage: {
                type: String,
                required: false,
                default: "READ"
            },
            showExpandMessage: {
                type: Boolean,
                required: false,
                default: false
            },
            showPostDivider: {
                type: Boolean,
                required: false,
                default: false
            },
            showMediaIcons: {
                type: Boolean,
                required: false,
                default: true
            },
            condensed: {
                type: Boolean,
                required: false,
                default: false
            },
            condensedCount: {
                type: Number,
                required: false,
                default: 2
            }
        },
        methods: {
            async getPost(id) {
                await this.$store.dispatch('initPostById', {id: id})
                    .catch(() => console.log('store failed to get post'));

                return this.$store.getters.postById(id);
            },
            setData(post) {
                this.post = post;
            },
            metaDataTitle() {
                return this.$route.path === '/' ? undefined : this.post.title;
            },
            isPostPageView() {
                return this.$route.params.id === this.post._id;
            },
            emitRead() {
                this.$emit('read-post', {title: this.post.title, id: this.post._id});
            }
        },
        created() {
            this.getPost(this.postId ? this.postId : this.$route.params.id)
                .then(post => {
                    this.setData(post);
                });
        },
        computed: {
            readingStatString() {
                return this.post.readingStats ? this.post.readingStats.text.toUpperCase() : '';
            },
            postPath: function () {
                return `/posts/${this.post._id}`;
            },
        }
    }
</script>

<style scoped>

    .post-view {
        padding-bottom: 2rem;
    }

    .clickable-title:hover {
        cursor: pointer;
        color: #FF6663;
    }

    .default-cursor {
        cursor: default;
    }

    #expand-message {
        font-family: 'Fira Mono', monospace;
        margin: 6vh 0 1vh 0;
        font-size: 1rem;
        font-weight: 500;
    }

    #expand-message:hover {
        cursor: pointer;
        color: #FF6663;
    }

    a {
        outline: 0;
        color: inherit;
        text-decoration: none;
    }

    .condensed >>> p {
        display: none;
    }

    .condensed-show-first >>> p:nth-of-type(1) {
        display: inline-block;
    }

    .condensed-show-second >>> p:nth-of-type(2) {
        display: inline-block;
    }

    .condensed-show-third >>> p:nth-of-type(3) {
        display: inline-block;
    }

    .condensed-show-fourth >>> p:nth-of-type(4) {
        display: inline-block;
    }

    .fade-out {
        position: relative;
        max-height: 1200px;
    }

    .fade-out:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(244, 244, 244, 0.93) 100%);
    }

    .reading-text-style {
        color: #19193A;
        margin-left: .5rem;
    }

    .post-page-view {
        min-height: 100vh;
    }
</style>
