const webpack = require('webpack');
const path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: {
        "index": [
            'babel-regenerator-runtime',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', //note that it reloads the page if hot module reloading fails.
            './src/main'
        ]
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets",
        filename: "[name].bundle.js"
    },
    devServer: {
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                loader: "babel-loader",
                exclude: [
                    /(node_modules)/,
                ],
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};