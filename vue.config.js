const devServer = {
    port: 8081,
    watchOptions: {
        poll: true,
    },
};

module.exports = () => {
    return {devServer};
};
