<template>
    <div>

        <router-link :to="postPath">
            <slot name="title" class="post-title"/>
        </router-link>

        <slot name="date"/>
        <slot name="reading-time"/>
        <slot name="text"/>


        <router-link :to="postPath">
            <p id="expand-message" class="flex-center-item"
               @click="$emit('read-post', {title: title})">{{expandMessage}}</p>
        </router-link>

        <div class="separator-container flex-center-item">
            <img alt="post separator" src="@/assets/Line.svg" id="separator"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: {
            expandMessage: {
                type: String,
                required: false,
                default: "READ"
            },
            title: {
                type: String,
                required: true,
            }
        },
        computed: {
            postPath() {
                return `/posts/${this.title.toString().toLowerCase().replace(/\s+/g, '-')}`;
            },
        }
    }
</script>

<style scoped>

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

    .separator-container {
    }

    a {
        outline: 0;
        color: inherit;
        text-decoration: none;
    }

</style>
