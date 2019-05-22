<template>

    <div class="center-grid">
        <div class="post post-view">
            <h1 class="post-title">{{title}}</h1>

            <p class="sub-info-section">
                <span class="post-date">{{date}}</span>
                <span class="reading-time count-value">:: {{readingStats.text.toUpperCase()}}</span>
            </p>

            <p v-html="text" class="post-text"/>

            <MediaIconGroup :iconDataObjects="mediaIcons" class="icon-group"/>
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
        components: {
            MediaIconGroup
        },
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

    .post-view {
        padding-bottom: 2rem;
        min-height: 100vh;
    }
</style>
