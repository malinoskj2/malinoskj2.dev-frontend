<template>
    <div id="info-card">
        <slot name="image"></slot>

        <div id="right-panel">
            <p :style="descriptionStyle" id="description">{{this.description}}</p>
            <div :style="linkStyle">
                <span v-for="(link, index) in linkPairs" :key="index">
                    <span class="link-group">
                        <router-link :to="link.path" class="reset-a">
                            <span class="link" @click="notify(link.name)">{{link.name}}</span>
                        </router-link>
                        <span v-if="link.count > 0" class="light-gray-text">{{link.count}}</span>
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
        data() {
            return {
                unimplemented: ['posts','about'],
            }
        },
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
        methods: {
            notify(name) {
                 if (this.unimplemented.includes(name.toString().toLowerCase())) {
                     this.$toasted.show("I'm going to make that page real soon. ;)");
                 }
            }
        },
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

</style>
