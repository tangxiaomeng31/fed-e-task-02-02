# fed-e-task-02-02
模块2-2作业

## 简答题一
### 第一题
webpack支持零配置打包，按照约定就是将src/index.js打包至dist/main.js中

## webpack常用配置：

1. entry: 入口文件
2. output
```javascript
output: {
	filename: '',//输出文件名
	path: '',//输出文件的目录(绝对路径) 所以可以用path.join(__dirname, 'dist')
	publicPath: 'dist/', webpack打包默认所有的文件都在网站根目录下，publicPath可以告诉webpack打包后的文件在网站的哪个文件下
}
```
3. loader加载器，用来转换其他文件编译打包，webpack内置默认的加载器是处理js的，如果要处理其他类型的文件则需要引入不同的加载器  ↓例子：css-loader

```javascript
//module(模块)这些选项决定了如何处理项目中的不同类型的模块
module: {
	//创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
	rules: [
		{
			test: /.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'] //@babel/preset-env已经包含了es6的全部最新特性
				}
			}
		},
		{
			test: /.css$/, //test为正则表达式，用来匹配打包时所遇到的文件路径
			use: [
				'style-loader',
				'css-loader'
			],//用来指定匹配到的文件所用到的loader，注意如果是多个loader那么执行顺序是从后往前执行
		},
		{
			test: /.png$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 10 * 1024 //10kb
				}
			}
		}
	]
}
```

> 光有css-loader还不够，需要通过style-loader将css-loader转化之后的样式通过style标签加载到元素上。
> url-loader是将文件转化成data-url的形式，类似于图片转化成base64，但是只适合于小文件转化，因为减少了url的请求次数，大文件单独提取存放，提高加载速度。
> 关于babel-loader，由于babel只是一个平台，如果要对js文件进行转换的话，需要配置一些babel的插件

常用的loader加载器有三种

 - 编译转换类
 - 文件操作类
 - 代码检查类

4. **Plugin**解决其他自动化工作
常见的plugin插件有：
`clean-webpack-plugin`：清除dist包下的内容
`html-webpack-plugin`：将html打包生成到dist文件下
`copy-webpack-plugin`: 拷贝文件和文件夹
`webpack-dev-server`: 启动时会自动打包webpack，并且起一个http server，启动过后，会自动监听文件变化，文件有了变化之后会自动打包更新，但是打包过后的文件并不会存放在磁盘当中，而是存放在内存当中，这样就减少了磁盘读写提高了效率
5. **devServer**
只要被webpack打包正常输出的文件都可以被访问，但是如果其他静态资源也需要被开发服务器访问的话，就需要额外的去告诉webpack的devServer。
还有一点就是，一般开发的时候地址都是localhost，请求api的时候容易跨域，所以需要一个代理服务器转发一下
```javascript
// 开发环境本地启动的服务配置
devServer: {
     historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
     hot: true,
     contentBase: false, // 告诉服务器从哪里提供内容，指定额外的静态资源路径。只有在你想要提供静态文件时才需要
     compress: true, // 一切服务都启用gzip 压缩：
     port: "8080", // 指定端口号
     publicPath: "/", // 访问资源加前缀
     proxy: {
         // 接口请求代理
     },
 }
```
6. devtool
用来配置开发过程中的辅助工具，与sourceMap配置相关的功能属性。
sourceMap解决了源代码与编译后代码格式不一样的调试问题，可以在开发者工具里的source调试查看
7. devServer
可以配置热更新HMR。
> webpack中的HMR需要手动处理热替换的逻辑

```javascript
const webpack = require('webpack')
derServer: {
	//hot: true,
	hotOnly: true, // 如果使用hot:true，那么热替换的过程中如果热替换的函数有错误，那么会导致页面重新刷新，这样热替换中的错误控制台就看不见了，所以使用hotOnly让报错不会自动刷新页面，就能看见报错了
},
plugins: [
	new webpack.HotModuleReplacementPlugin()
]
```
对于某个文件的热替换可以使用`module.hot.accept(文件路径，热处理函数)`

8. optimization集中去配置webpack的一些优化功能
例如：Tree-shaking，它的前提是使用了ESMudles
```javascript
optimization: {
        usedExports: true,//只导出那些外部使用了的成员,相当于标记了枯树叶
        minimize: true, //负责摇掉那些枯树叶，即没用到的代码
        concatenateModules: true,//尽可能将所有模块合并都输出到一个函数中去，提升运行效率减少代码体积
        sideEffects: true,//开启sideEffects功能，但是这里要确保代码中能识别有用的副作用
    }
//注意sideEffects开启之后需要在package.json中配置“sideEffects： fasle”表示没有副作用
```

### 第二题
1. loader加载器，用来转换其他文件编译打包，webpack内置默认的加载器是处理js的，如果要处理其他类型的文件则需要引入不同的加载器。比如jsx、ts、less、css等等，这些非js的文件就需要特定的加载器去处理转换
2. plugin解决其他自动化工作，是一个插件的集合。