const postPaths = () => {
    const posts = () => require('./build/posts.json');
    return posts().entries.map(post => `/posts/${post._id}`);
};

const isProd = () => {
    return process.env.NODE_ENV === 'production';
};

const pluginOptions = {
    prerenderSpa: {
        registry: undefined,
        renderRoutes: [
            '/',
            '/about',
            '/404',
            ...postPaths()
        ].concat(),
        useRenderEvent: true,
        headless: true,
        onlyProduction: true
    }
};

const devServer = {
    port: 8081,
    watchOptions: {
        poll: true,
    },
};

module.exports = () => {
    return {pluginOptions, devServer};
};
