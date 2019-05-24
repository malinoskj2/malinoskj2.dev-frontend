const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {
    const devServer = {
        port: 8081,
        watchOptions: {
            poll: true,
        },
    };

    let configureWebpack = {};

    switch (process.env.NODE_ENV) {
        case 'development':
            break;
        case 'production': {
            configureWebpack = {
                plugins: [new BundleAnalyzerPlugin({
                    generateStatsFile: true,
                    openAnalyzer: false,
                    analyzerMode: 'disabled'
                })],
                optimization: {
                    splitChunks: {
                        chunks: 'all'
                    }
                },
            }
        }
        break;
        default:
            console.log('unknown NODE_ENV');
    }

    return  {
        configureWebpack,
        devServer
    }
};
