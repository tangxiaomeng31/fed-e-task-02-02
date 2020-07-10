//项目开发环境的配置
const baseWebpackConfig = require('./webpack.common')
const {merge} = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Vue demo',
            template: './public/index.html'
        })
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