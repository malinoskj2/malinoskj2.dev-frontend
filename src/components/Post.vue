<template>

    <div class="center-grid">
        <div class="post post-view" :class="{'expand-margin' : !condensed}">
            <router-link :to="postPath" class="reset-a" draggable="false">
                <h1 class="post-title" :class="{'clickable-title': clickableTitle,
                'default-cursor': !clickableTitle}">{{title}}</h1>
            </router-link>

            <p class="sub-info-section">
                <span class="post-date">{{date}}</span>
                <span class="reading-time count-value">:: {{readingStats.text.toUpperCase()}}</span>
            </p>

            <p v-html="text" class="post-text" draggable="false"
               :class="{ 'fade-out': condensed ,'condensed': condensed,
               'condensed-show-first': condensedCount >=1,
                'condensed-show-second': condensedCount >=2,
                 'condensed-show-third': condensedCount >=3,
                  'condensed-show-fourth': condensedCount >=4 }"/>


            <MediaIconGroup v-if="showMediaIcons" :title="title" :url="url" class="icon-group"/>
            <div>
                <router-link :to="postPath" v-if="showExpandMessage">
                    <p id="expand-message" class="flex-center-item"
                       @click="$emit('read-post', {title: title})">{{expandMessage}}</p>
                </router-link>
            </div>

            <div class="separator-container flex-center-item" v-if="showPostDivider">
                <img alt="post separator" src="@/assets/Line.svg" id="separator"/>
            </div>

        </div>
    </div>

</template>

<script>
    /* eslint-disable no-unused-vars */
    import MediaIconGroup from '@/components/MediaIconGroup.vue';

    const generateFBLink = (url) => {
        return `https://www.facebook.com/sharer/sharer.php?u=http%3A//${url}/`
    };

    const generateTwitterShareLink = (url) => {
        return `https://twitter.com/home?status=http%3A//${url}/`;
    };

    const generateRedditShareLink = (targetUrl, url, title) => {
        return `http://${targetUrl}/submit?url=${url}&${encodeURIComponent(title)}`;
    };

    export default {
        name: "PostView",
        metaInfo() {
            return {
                title: this.metaDataTitle()
            }
        },
        data() {
            return {
                id: '',
                title: '',
                date: '',
                text: '',
                readingStats: {text: ''},
                url: '',
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
        created() {
            this.getPost(this.postId ? this.postId : this.$route.params.id);
        },
        methods: {
            async getPost(id) {
                await this.$store.dispatch('initPostById', {id: id})
                    .catch(() => console.log('store failed to get post'));

                const {title, publishedAt, content, readingStats, url, _id} =
                    this.$store.getters.postById(id);

                this.title = title;
                this.date = publishedAt.format('MMMM-YYYY');
                this.text = content;
                this.readingStats = readingStats;
                this.url = url;
                this.id = _id;
            },
            metaDataTitle () {
                return this.$route.path == '/' ? undefined : this.title;
            }
        },
        computed: {
            postPath() {
                return `/posts/${this.id}`;
            },
        }
    }
</script>

<style scoped>

    .post-view {
        padding-bottom: 2rem;
        min-height: 100vh;
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

    .flex-center-item {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
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

    .expand-margin {
        margin-top: 4rem;
    }
</style>
