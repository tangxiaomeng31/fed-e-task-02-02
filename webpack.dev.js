//项目开发环境的配置
const baseWebpackConfig = require('./webpack.common')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: path.join(__dirname, 'dist'),
        //     template: 'index.html',//html模板
        // }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { 
        //             from: path.join(__dirname, './src/assets'),
        //             to: path.join(__dirname, 'dist')
        //         }
        //     ],
        // })
    ],
    devServer: {
        contentBase: false,
        hot: true,
        port: "8000", // 指定端口号
        publicPath: "/", // 访问资源加前缀
        proxy: {
            '/api': {
                target: 'http://your_api_server.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})