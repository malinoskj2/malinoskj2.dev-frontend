<template>
    <div class="fade-404">
        <h1 class="inset-shadow-header">404</h1>
    </div>

</template>

<script>
    export default {
        name: "Soft404",
        metaInfo: {
            title: '404 Not Found',
            content: 'noindex',
            htmlAttrs: {
                lang: 'en',
                amp: false
            }
        },
        mounted() {
            this.$toasted.show("page not found", {
                icon : 'envelope',
                action: {
                    text : 'Home',
                    onClick : (e, toastObject) => {
                        toastObject.goAway(0);
                        this.$router.push('/');
                    }
                }
            });
        }
    }
</script>

<style scoped>

    #not-found {
        font-family: 'Mukta', sans-serif;
    }

    h1 {
        transition: 300ms all;

        font-size: 4rem;
        filter: opacity(100%);
    }

    .fade-404 {
        animation-name: fade-404;
        animation-duration: 1s;
        animation-delay: 0s;
        animation-fill-mode: forwards;
    }

    @keyframes fade-404 {
        from {
            filter: opacity(0);
        }

        to {
            filter: opacity(1);
        }
    }
</style>
