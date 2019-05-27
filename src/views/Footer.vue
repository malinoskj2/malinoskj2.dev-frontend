<template>
    <div id="footer">
        <div id="footer-content">

            <div class="footer-link-group">
                <a :href="link.url" v-for="(link,index) in socialMediaLinkData" :key="index"
                   class="reset-a ">
                    <font-awesome-icon class="media-link footer-link-child" :icon="link.iconSpecs" size="lg">
                        {{link.name}}
                    </font-awesome-icon>
                </a>
            </div>

            <p class="copyright-notice">© 2019 malinoskj2.dev</p>

            <div class="license-info-line">
                <p class="copyright-notice">all content licensed under</p>
                <a :href="contentCopyright" class="reset-a copyright-notice">cc-sa-3</a>
            </div>

            <div class="license-info-line">
                <p class="copyright-notice">code licensed under</p>
                <a :href="codeCopyright" class="reset-a copyright-notice">bsd-2-clause</a>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                contentCopyright: process.env.VUE_APP_CONTENT_COPY,
                codeCopyright: process.env.VUE_APP_CODE_COPY,
            };
        },
        props: {
            socialMediaLinkData: {
                type: Array,
                required: false
            }
        },
    }
</script>

<style scoped>
    #footer {
        min-height: 10rem;
        background-image: linear-gradient(to top, rgba(255, 188, 210, 0.1),
        rgba(244, 244, 244, 0.93));

    }

    #footer-content {
        min-height: 10rem;
        margin: auto;
        padding-bottom: 3rem;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-evenly;
    }

    #footer-content > p, span, a {
        font-size: .75rem;
        color: rgba(25, 50, 60, 0.4);
        text-decoration: none;
    }

    .copyright-notice {
        margin-left: .4rem;
    }

    .media-link {
        font-size: 1rem;
        color: rgba(25, 50, 60, 0.45);
        filter: saturate(0) opacity(.7) drop-shadow(0px 0px 20px rgba(12, 0, 38, 0.61));
        transition: all 300ms;
    }

    .media-link:hover {
        cursor: pointer;
        filter: saturate(.5) opacity(1) drop-shadow(0px 0px 4px rgba(12, 0, 38, 0.0));
    }

    .footer-link-child {
        margin: 1rem;
        padding: 1rem;
    }

    .license-info-line {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
    }

    .license-info-line > p, span {
        font-size: .75rem;
        color: rgba(25, 50, 60, 0.4);
        text-decoration: none;
    }

    .license-info-line > a {
        font-size: .75rem;
        font-weight: 600;
        color: rgba(25, 50, 60, 0.30);
        text-decoration: none;
    }

    .license-info-line > a:hover {;
        color: rgba(25, 50, 60, 0.68);
    }

</style>
