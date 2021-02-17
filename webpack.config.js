const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        // index: './src/index.js',
        // basics: './three/js/basics.js',
        // primitives: './three/js/primitives.js',
        // scenegraph: './three/js/scenegraph.js',
        // textures: './three/js/textures.js',
        // lights: './three/js/lights-SpotLight.js',
        cameras: './three/js/cameras.js',
        // vue: './src/vue.js',
        // login: './src/login.js',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    'corejs': 3,
                                }
                            ]
                        ],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }, 'less-loader' ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets',
                            esModule: false,
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './three/index.html',
            filename: 'index.html',
        }),
        // new HtmlWebpackPlugin({
        //     template: './public/login.html',
        //     filename: 'login.html',
        //     chunks: [
        //         'login'
        //     ],
        // }),
        // new HtmlWebpackPlugin({
        //     template: './public/vue.html',
        //     filename: 'index.html',
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css',
        }),
        new OptimizeCssPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            }
        ], {
            ignore: [
                'ignore.js',
            ],
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js',
        publicPath: '/',
    },
};
