<template>
    <div id="info-card">
        <slot name="image"></slot>

        <div id="right-panel">
            <p :style="descriptionStyle" id="description">{{this.description}}</p>
            <div :style="linkStyle">
                <span v-for="(link, index) in linkPairs" :key="index">
                    <span class="link-group">
                        <span class="link">{{link.name}}</span>
                        <span v-if="link.count > 0" class="count-value">{{link.count}}</span>
                    </span>
                    <span v-if="index !== ( linkPairs.length - 1 )" class="delimiter">{{delimiter}}</span>
                </span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "InfoCard",
        props: {
            delimiter: {
                type: String,
                required: false,
                default: '|'
            },
            description: {
                type: String,
                required: true
            },
            descriptionStyle: {
                type: Object,
                required: true
            },
            linkPairs: {
                type: Array,
                required: true
            },
            linkStyle: {
                type: Object,
                required: true
            },

        },
        methods: {},
    }
</script>

<style scoped>
    .delimiter {
        margin-right: 1rem;
    }

    #description {
        margin-top: -.25rem;
    }

    #info-card {

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        padding: 0 0 0 0;
        margin: 0 0 0 0;

        text-align: left;
    }

    #right-panel {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: flex-start;
    }

    .link-group {
        margin: 0 1rem 0 0;
    }

    .link-group:hover {
        cursor: pointer;
        color: #FF6663;
    }

    .link {
        text-decoration: underline;
        text-decoration-color: #FF6663;
    }

    .link:hover {
        text-decoration: none;
    }

    .count-value {
        vertical-align: super;
        font-size: .75rem;
        color: rgba(25, 50, 60, 0.4);
        margin-left: 0rem;
        text-decoration: none;
    }
</style>
