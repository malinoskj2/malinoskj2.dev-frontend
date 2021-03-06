<template>

    <div class="post" :class="{'post-view': !condensed }" draggable="false">

        <router-link :to="postPath" class="reset-a" draggable="false">
            <h1 class="post-title" :class="{'clickable-title': clickableTitle,
                'default-cursor': !clickableTitle}" @click="emitRead" :key="post.id"
            >{{this.post.title}}</h1>
        </router-link>

        <p class="sub-info-section">
            <span class="subtitle-line">{{this.post.dateString}}</span>
            <span class="subtitle-line"> :: {{this.byLine}}</span>
        </p>

        <div v-if="condensed" class="fade-out">
            <p v-text="this.post.description" class="post-text"></p>
        </div>
        <div v-if="!condensed">
            <component v-bind:is="this.post.id"
                       class="post-text content-styling" draggable="false"/>
        </div>
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
    import MediaIconGroup from '@/components/MediaIconGroup.vue';
    import initial from '@/posts/markdown/initial.md';

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
                    id: "",
                    title: '',
                    content: '',
                    url: '',
                    publishedAt: {},
                    dateString: '',
                    description: ''
                },
                byLine: 'By Jesse Malinosky'
            }
        },
        components: {
            MediaIconGroup,
            initial
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
        },
        methods: {
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
            const id = this.postId ? this.postId : this.$route.params.id;
            const post = this.$store.getters.postById(id);
            this.setData(post);
        },
        computed: {
            readingStatString() {
                return this.post.readingStats ? this.post.readingStats.text.toUpperCase() : '';
            },
            postPath: function () {
                return `/posts/${this.post.id}`;
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

    .content-styling >>> a {
        color: inherit;
        background: linear-gradient(
                to bottom, #FF6663 0%,
                #FF6663 100%
        );
        background-position: 0 100%;
        background-repeat: repeat-x;
        background-size: 4px 4px;
        text-decoration: none;
        transition: background-size .2s cubic-bezier(0.190, 1.000, 0.220, 1.000);
    }

    .content-styling >>> a:hover {
        background-size: 4px 50px;
    }

    .content-styling >>> pre {
        border-radius: .5rem;
        padding: 1em;
        background-color: rgba(192, 192, 192, 0.33);

        overflow-x: scroll;
    }

    .content-styling >>> code {
        font-family: 'Fira Mono', monospace;
    }
</style>
