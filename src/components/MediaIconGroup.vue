<template>
    <div class="share-icons">
        <div v-for="(icon ,index) in mediaIconsComputed" :key="index">
            <social-sharing :url="url"
                            :title="title"
                            :description="title"
                            :quote="title"
                            inline-template>
                <div>
                    <network :network="icon.name">
                        <font-awesome-icon :icon="icon.iconSpecs" size="lg" :style="icon.style"/>
                    </network>
                </div> </social-sharing>
        </div>
        
    </div>
</template>

<script>


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
        components : {
        },
        methods: {
            shareLink(websiteName, url, title) {
                console.log('called share link');
                switch (websiteName) {
                    case "facebook":
                        return `https://www.facebook.com/sharer/sharer.php?u=https://${url}/`;
                    case "twitter":
                        return (function () {
                            const tweetString = `${title} on ${url} is awesome!`;
                            return encodeURI(`https://twitter.com/intent/tweet?url=${url}&text=${tweetString}`);
                        })();
                    case "reddit":
                        return `http://www.reddit.com/submit?url=${url}&${encodeURIComponent(title)}`;
                    default:
                        return "unknown website";
                }
            }
        },
        computed: {
            mediaIconsComputed() {
                return [
                    {
                        name: 'facebook', iconSpecs: ['fab', 'facebook-f'],
                        style: {color: '#3B5998'}
                    },
                    {
                        name: 'twitter', iconSpecs: ['fab', 'twitter'],
                        style: {color: '#4AB3F4'}
                    },
                    {
                        name: 'reddit', iconSpecs: ['fab', 'reddit'],
                        style: {color: '#FF4500'}
                    },
                ];
            },
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
