const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = (options = {}) => ({
    mode: 'development',
    entry: {index: './src/main.js'},
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].js?[chunkhash]',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: [{
                    'loader': 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(woff|ttf)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.html'),
            favicon: resolve(__dirname, 'src/assets/images/palworld-title.jpg')
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json', '.css']
    },
    devServer: {
        host: '127.0.0.1',
        port: 8010,
        open: true,
        proxy: {
            '/api/': {
                target: 'http://120.78.196.38:8888/',
                changeOrigin: true,
            }
        },
        historyApiFallback: true,
    },
    devtool: 'source-map',
})
