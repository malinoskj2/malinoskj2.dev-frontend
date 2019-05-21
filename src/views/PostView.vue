<template>

    <div class="center-grid">
        <div class="post">
            <h1 class="post-title">{{title}}</h1>

            <p class="sub-info-section">
                <span class="post-date">{{date}}</span>
                <span class="reading-time count-value">:: {{readingStats.text.toUpperCase()}}</span>
            </p>

            <p v-html="text" class="post-text"/>

            <div class="share-icons">
                <div v-for="(icon ,index) in mediaIcons" :key="index">
                    <a :href="icon.url">
                        <font-awesome-icon :icon="icon.iconSpecs" size="lg" :style="icon.style"/>
                    </a>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-unused-vars */

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
        data() {
            return {
                title: '',
                date: '',
                text: '',
                readingStats: null,
                url: '',
                mediaIcons: [],
            }
        },
        components: {},
        props: {},
        created() {
            this.getPost();
        },
        methods: {
            async getPost() {
                const {title, publishedAt, content, readingStats} =
                    this.$store.getters.postById(this.$route.params.id);

                this.title = title;
                this.date = publishedAt.format('MMMM-YYYY');
                this.text = content;
                this.readingStats = readingStats;
                this.url = window.location.href;

                const facebookShareLink = generateFBLink(window.location.href);
                const twitterShareLink = generateTwitterShareLink(window.location.href);
                const redditShareLink = generateRedditShareLink('www.reddit.com', window.location.href, title);


                this.mediaIcons = [
                    {
                        name: 'facebook', iconSpecs: ['fab', 'facebook-f'],
                        style: {color: '#3B5998'}, url: facebookShareLink
                    },
                    {
                        name: 'twitter', iconSpecs: ['fab', 'twitter'],
                        style: {color: '#4AB3F4'}, url: twitterShareLink
                    },
                    {
                        name: 'reddit', iconSpecs: ['fab', 'reddit'],
                        style: {color: '#FF4500'}, url: redditShareLink
                    },
                ];
            },

        },
        computed: {},
    }
</script>

<style scoped>

    .post {
        text-align: left;
        max-width: 700px;
    }

    .post-title {
        text-align: left;
        font-family: 'Fira Mono', monospace;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 43px;
        color: #19193A;
        margin-bottom: 1rem;
        padding-bottom: 0;
    }

    .post-date {
        text-align: left;
        font-family: 'Fira Mono', monospace;
        font-style: normal;
        font-weight: 500;
        font-size: 1rem;
        line-height: 19px;
        letter-spacing: 0.04em;
        color: #19193A;
    }

    .post-text {
        text-align: left;
        font-family: Mukta, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 27px;
        color: #10092f;
    }

    .center-grid {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
    }

    .count-value {
        color: #19193A;
        margin-left: .5rem;
    }

    .sub-info-section {
        padding-bottom: 2rem;
    }

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
