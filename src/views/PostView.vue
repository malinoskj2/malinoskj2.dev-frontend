<template>

    <div class="center-grid">
            <div class="post">
                <h1 class="post-title">{{title}}</h1>

                <p class="sub-info-section">
                    <span class="post-date">{{date}}</span>
                    <span class="reading-time count-value">:: {{readingStats.text.toUpperCase()}}</span>
                </p>

                <p v-html="text" class="post-text"/>
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
            async getPost() {
                const {title, publishedAt, content, readingStats} =
                    this.$store.getters.postById(this.$route.params.id);

                this.title = title;
                this.date = publishedAt.format('MMMM-YYYY');
                this.text = content;
                this.readingStats = readingStats;
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

    .count-value {
        color: #19193A;
        margin-left: .5rem;
    }

    .sub-info-section {
        padding-bottom: 2rem;
    }
</style>
