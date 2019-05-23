<template>
    <div>

        <router-link :to="postPath">
            <slot name="title" class="post-title"/>
        </router-link>

        <p class="sub-info-section">
            <slot name="date"/>
            <slot name="reading-time"/>
        </p>

        <slot name="text"/>

        <MediaIconGroup :title="title" :url="url" class="icon-group"/>

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
    import MediaIconGroup from '@/components/MediaIconGroup.vue';

    export default {
        name: "Post",
        props: {
            expandMessage: {
                type: String,
                required: false,
                default: "READ"
            },
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true,
            },
            url: {
              type: String,
              required: true,
            },
        },
        components: {
          MediaIconGroup
        },
        computed: {
            postPath() {
                return `/posts/${this.id}`;
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

    a {
        outline: 0;
        color: inherit;
        text-decoration: none;
    }


</style>
