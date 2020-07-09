//项目生产环境的配置
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require('./webpack.common')

module.exports = webpackMerge(baseWebpackConfig, {
    
})