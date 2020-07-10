//项目生产环境的配置
const {merge} = require("webpack-merge");
const baseWebpackConfig = require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
    mode:"production",
    devtool: 'none',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.join('public'),
                    to: path.join('public')
                }
            ],
        })
    ]
})