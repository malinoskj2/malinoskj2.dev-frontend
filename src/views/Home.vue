<template>
    <div class="home">
        <img alt="avatar image" id="avatar-image" class="slide-in-blurred-bottom"
             src="https://avatars3.githubusercontent.com/u/41254238?s=460&v=4">

        <div id="media-link-container">
            <a v-for="(linkItem, index) in this.mediaLinks" :href="linkItem.link" :key="index" class="fade-in">
                <font-awesome-icon :icon="linkItem.iconSpecs" size="2x" class="media-link"/>
                <p>{{ linkItem.name}}</p>
            </a>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        data() {
            return {
                mediaLinks: [
                    {name: 'github', link: 'https://github.com/malinoskj2', iconSpecs: ['fab', 'github']},
                    {name: 'gitlab', link: 'https://gitlab.com/malinoskj2', iconSpecs: ['fab', 'gitlab']},
                    {name: 'email', link: "mailto:jesse@malinoskj2.dev", iconSpecs: ['fas', 'envelope']}
                ],
            }
        },
        components: {},
        mounted() {
            setTimeout(() => {

            }, 2700)
        }
    }
</script>

<style scoped>
    #avatar-image {
        width: 10rem;
        border-radius: 10%;
    }

    #media-link-container {
        margin-top: 4rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

    .media-link {
        color: darkslategray;
        margin: 0rem 2rem 0rem 2rem;
        transform: scale(1);
        transition: transform 130ms ease-in-out;
    }

    .media-link:hover {
        color: rgba(47, 79, 79, 0.67);

        cursor: pointer;
    }

    a {
        color: inherit;

        text-decoration: none;
    }

    a p {
        visibility: hidden;
        text-decoration: none;
    }

    a:hover p{
        visibility: visible;
        text-decoration: none;
    }

    .slide-in-blurred-bottom {
        animation: slide-in-blurred-bottom 0.5s cubic-bezier(0.230, 1.000, 0.30, 1.000) both;
    }

    .fade-in {
        animation: fade-in 1.2s 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    @keyframes slide-in-blurred-bottom {
        0% {
            transform: translateY(300px) scaleY(2.5) scaleX(0.2);
            transform-origin: 50% 100%;
            filter: blur(40px) drop-shadow(0px -116px 2px rgba(130, 130, 137, 0.37));
            opacity: 0;
        }
        100% {
            transform: translateY(0) scaleY(1) scaleX(1);
            transform-origin: 50% 50%;
            filter: blur(0) drop-shadow(0px 16px 16px rgba(130, 130, 137, 0.37));
            opacity: 1;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

</style>
