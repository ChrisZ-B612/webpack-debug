const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js'
        // index: {
        //     import: './src/index.js', dependOn: 'shared'
        // },
        // another: {
        //     import: './src/another-module.js', dependOn: 'shared',
        // },
        // shared: 'lodash',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/
                ,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
};
