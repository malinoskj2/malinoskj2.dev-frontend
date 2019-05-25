<template>
    <InfoCard :description="description" :descriptionStyle="descriptionStyle"
              :linkPairs="linkPairs" :linkStyle="linkStyle" id="info-card">

        <img alt="avatar image" slot="image" id="avatar-image"
             src="../assets/avatar.jpg">
    </InfoCard>
</template>

<script>
    import InfoCard from '@/components/InfoCard.vue'

    export default {
        name: "About",
        metaInfo() {
            return {
                title: 'About'
            }
        },
        data() {
            return {

                description: 'Hello, I’m Jesse Malinosky, developer and student.' +
                    ' Fan of learning and unravelling the ' +
                    ' world’s mysteries through code.',
                descriptionStyle: {
                    fontFamily: "Mukta, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#19323C'
                },
                linkPairs: [
                    {name: "Home", link: "tempLinkA", path: {name: 'home'}, count: 0},
                    {name: "Posts", link: "tempLinkB", path: {name: 'home'}, count: 1},
                    {name: "About", link: "tempLinkB", path: {name: 'home'}, count: 0},
                ],
                linkStyle: {
                    fontFamily: "Fira Mono, monospace",
                    fontWeight: 500,
                    color: '#19323C'
                },
            }
        },
        components: {
            InfoCard,
        }
    }
</script>

<style scoped>
    #avatar-image {
        margin-right: 2rem;
        height: 10rem;
        border-radius: 10px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        user-drag: none;
        -webkit-touch-callout: none;
        pointer-events: none;
    }

    #info-card {
        margin-left: 1rem;
        width: 540px;
    }
</style>
