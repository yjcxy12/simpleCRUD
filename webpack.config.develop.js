var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './'),
    entry: {
        js: './client/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'public/bundle.min.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }
        ],
    },
    resolve: {
        alias: {
            components: path.resolve('./client/components'),
            utils: path.resolve('./client/utils'),
            hocs: path.resolve('./client/hocs')
        },
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html', // Move the index.html file...
            inject: false
        }),
        new ExtractTextPlugin("public/style.css")
    ],
    devtool: 'source-map'
};
