const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    CopyPlugin = require('copy-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin'),
    HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin'),
    // CompressionPlugin = require('compression-webpack-plugin'),

    config = require('../config.js'),
    baseWebpackConfig = require('../webpack.config.base.js'),
    utils = require('../utils.js'),
    vendorsAssets = require(utils.assetsVendorsAbsolutePath('vendors-assets.json')),

    env = process.env.NODE_ENV;

module.exports = merge(baseWebpackConfig, {

    mode: 'production',

    devtool: config.build.productionSourceMap ? '#source-map' : false,

    output: {
        publicPath: './',
        path: config.build.assetsRoot,
        filename: utils.assetsSubPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsSubPath('js/[id].[chunkhash].js')
    },

    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${env}'`
            }
        }),

        new CopyPlugin([{
            from: path.resolve(__dirname, '../../static'),
            to: config.assetsSubDirectory,
            ignore: ['.*']
        }]),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('polyfill-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('react-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('brace-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('editor-manifest.json'))
        }),

        new HtmlPlugin({
            filename: config.build.index,
            template: './examples/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new HtmlWebpackTagsPlugin({
            tags: [
                vendorsAssets['polyfill'].js,
                vendorsAssets['react'].js,
                vendorsAssets['brace'].js,
                vendorsAssets['editor'].js
            ],
            append: false
        })

        // new CompressionPlugin({
        //     test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
        //     cache: true,
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     threshold: 1,
        //     minRatio: 0.8
        // })

    ]

});
