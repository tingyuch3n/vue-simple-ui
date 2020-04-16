module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                externals: {
                    jquery: 'jQuery',
                    'VueFroala': 'vue-froala-wysiwyg'
                }
            }
        } else {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            return {
                externals: {
                    jquery: 'jQuery',
                    'VueFroala': 'vue-froala-wysiwyg'
                },
                plugins: [
                    new BundleAnalyzerPlugin({
                        analyzerPort: 2800,
                        openAnalyzer: true,
                        statsOptions: {
                            excludeModules: ['vue/dist', 'sockjs-client/dist', 'core-js'],
                            source: false
                        }
                    })
                ]
            }
        }
    },
    outputDir: process.env.VUE_APP_OUTPUTDIR,
    productionSourceMap: false
}
