<template>

    <div class="center-grid">
        <div class="home">
            <div class="post-container">
                <div class="post">
                    <h1 class="post-title">{{title}}</h1>
                    <span class="post-date">{{date}}</span>
                    <span class="reading-time count-value">:: {{readingStats.text.toUpperCase()}}</span>
                    <p class="post-text">{{text}}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "PostView",
        data() {
            return {
                title: '',
                date: '',
                text: '',
                readingStats: null,
            }
        },
        props: {},
        created() {
            this.getPost();
        },
        methods: {
            getPost() {
                // const post = this.$store.getters.posts[0];

                const {title, publishedAt, content, readingStats} = this.$store.getters.posts
                    .find(post => {
                        const formattedTitle = `${post.title.toString().toLowerCase().replace(/\s+/g, '-')}`;
                        return this.$route.params.post.includes(formattedTitle.substring(0, formattedTitle.length - 2));
                    });

                this.title = title;
                this.date = publishedAt.format('MMMM-YYYY');
                this.text = content
                this.readingStats =  readingStats;
            }
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

    .home {
        max-width: 700px;
        display: grid;
        grid-template-columns: 4fr;
        grid-template-rows: auto;
        grid-gap: 6rem 0rem;
        justify-content: space-evenly;
    }

    .count-value {
        color: #19193A;
        margin-left: .5rem;
    }
</style>
