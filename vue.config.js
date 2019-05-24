const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	configureWebpack: { plugins: [ new BundleAnalyzerPlugin({generateStatsFile: true, openAnalyzer: false, analyzerMode: 'disabled' }) ],
 optimization: {
  splitChunks: {
    chunks: 'all'
  }
},
  },
 devServer: {
    port: 8081,
    watchOptions: {
      poll: true,
    },
  },
};
