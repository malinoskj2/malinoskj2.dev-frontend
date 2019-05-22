<template>
    <div class="share-icons">
        <div v-for="(icon ,index) in mediaIconsComputed" :key="index">
            <a :href="icon.url">
                <font-awesome-icon :icon="icon.iconSpecs" size="lg" :style="icon.style"/>
            </a>
        </div>
    </div>
</template>

<script>
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
        name: "MediaIconGroup",
        props: {
            url: {
                type: String,
                required: true
            },
            title: {
                required: true,
            }
        },
        computed: {
            mediaIconsComputed() {
                const facebookShareLink = generateFBLink(this.url);
                const twitterShareLink = generateTwitterShareLink(this.url);
                const redditShareLink =
                    generateRedditShareLink('www.reddit.com', this.url, this.title);

               return [
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
            }
        },

    }
</script>

<style scoped>
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
