/**
 * This file is only used for webpack-dev-server. 
 */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './'),
    entry: {
        js: './client/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader'
                ]
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
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: true
        }),
    ],
    devTool: 'source-map',
    devServer: {
        contentBase: './lib',
        hot: true
    }
};
