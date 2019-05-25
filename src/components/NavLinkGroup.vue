<template>
    <div>
        <span v-for="(link, index) in linkPairs" :key="index">
            <span class="link-group" >
                        <router-link :to="link.path" class="router-link">
                                <span class="no-outline inset-shadow-header"
                                      @click="notify(link.name)">{{link.name}}</span>
                        </router-link>
                        <span v-if="link.count > 0" class="light-pink-ss">{{link.count}}</span>
                </span>
            <span v-if="index !== ( linkPairs.length - 1 )" class="delimiter"
                  :class="{  'link-padding-no-ss' :  link.count == 0, 'link-padding-when-ss': link.count > 0 }">
                {{delimiter}}
                </span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "NavLinkGroup",
        data() {
            return {
                testTrue: true
            }
        },
        props: {
            delimiter: {
                type: String,
                required: false,
                default: '|'
            },
            linkPairs: {
                type: Array,
                required: true
            },
            unimplemented: {
                type: Array,
                required: false,
                default: () => []
            }
        },
        methods: {
            notify(name) {
                if (this.unimplemented.includes(name.toString().toLowerCase())) {
                    this.$toasted.show("I'm going to make that page real soon. ;)");
                }
            }
        }
    }
</script>

<style scoped>
    .link-group{
        font-weight: 700;
    }

    .link-padding-no-ss{
        margin-right: 1rem;
    }

    .link-padding-when-ss{
        margin-right: .75rem;
    }
</style>
