var webpack = require('webpack');
var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin"); 

const HtmlWebpackPlugin = require("html-webpack-plugin"); 
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");

var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //用法进一步研究


module.exports = {
    mode: "development", 
    devtool: 'cheap-module-eval-source-map',
    entry:      
    {
        'index':['./client/index.js','./client/styles/index.scss'],  //.js扩展名可以不加,scss可以一起打包到index文档。加上scss，ExtractTextPlugin才能生效
        'signup':['./client/scripts/signup.js'],
        // 'css':['./client/styles/index.scss'] 不能单独写scss文件
    
    },
    output: {
        path: path.resolve(__dirname, 'build/'),  //这儿好像没起作用
        filename: '[name].js', //输出文件名，[name].js默认是main.js。如果指定则是指定名
        publicPath: '', //publicPath: '/build/', 这个一定得注意，不加此句，加上html找不到。publicPath是配置webpack.dev.server的时候用的。如果没有publicPath，那这个路径就直接写成filename.js。热更新引入./build/signup.js就对了，这个build跟此有关
        chunkFilename: "[chunkhash].js"   //这个好像没起作用，应该研究用处和区别
    },
    module: {
        rules:[
             {
                test: /\.js|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                // loader: "babel-loader",
                // options: {
                //     presets: ['react','es2015']
                // },
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','es2015','env'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]  //关键假如此才能支持扩展运算符
                    }
                }
             },
             {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'style-loader!css-loader?modules&importLoaders&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader?sourceMap=true&sourceMapContents=true',
                // use: ExtractTextPlugin.extract({
				// 	fallback: "style-loader",
				// 	use: "css-loader",
				// 	publicPath: "../" // css中的基础路径
				// })
             },
               
             {
                test: /\.json?$/,
                loader: 'json'
             },
            //  {
			// 	test: /\.(png|jpg|gif)$/,
			// 	use: [{
			// 			// 需要下载file-loader和url-loader
			// 			loader: "url-loader",
			// 			options: {
			// 				limit: 50,
			// 				outputPath: "images" // 图片文件输出的文件夹
			// 			}
			// 		}
			// 	]
			// },
             {
                test: /\.html$/,
                use: [
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                        }
                    }
                ]
            },
            {
                test:  /\.scss$/, 
                // include: [
                //     path.join(__dirname, 'client','styles')
                // ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                // use: [
                //     {  
                //         loader: 'style-loader'   // 将 JS 字符串生成为 style 节点
                //     },
                //     {
                //         loader: 'css-loader',  // 将 CSS 转化成 CommonJS 模块
                //     },
                //     {
                //         loader: 'sass-loader',  // 将 Sass 编译成 CSS
                //         options: { 
                //             sourceMap:true  ,
                //             sourceMapContents:true
                //         }
                //     },
                    
                // ]
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]  //end rules    
    },
     resolve: {
        alias: {
            'react': path.join(__dirname,'node_modules','react'),
        },
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    },
     performance: {
        hints:  false, // enum
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
    },

    plugins: [
    //   new webpack.HotModuleReplacementPlugin(),  //产生hot-update.js文件
        // 调用之前先清除
	//   new cleanWebpackPlugin(["build"]),
      new ExtractTextPlugin('client/styles/index.css'),  // 分离css插件参数为提取出去的路径
    //   new MiniCssExtractPlugin({
    //     filename:'[name].css'
    //    }),
       		// 全局暴露统一入口
		// new webpack.ProvidePlugin({
		// 	$: "jquery"
		// }),
       new HtmlWebpackPlugin({
           template:'./views/index.html',
           filename:'index.html',
           title:'测试',
           chunks:['index'],
           inject: 'body',
       }),
       new webpack.HotModuleReplacementPlugin(),
       new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ],
    // watch: true ,//这意味着在初始构建之后，webpack将继续监视任何已解析文件的更改。手表模式默认关闭
    

     devServer: {
        host:'localhost',
        port:3001,
        contentBase: path.resolve(__dirname, ''), // 设置服务器访问的基本目录，跟publicPath一样（为什么还得查找）
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload   
    },
    // 提取js，lib1名字可改
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			lib1: {
	// 				chunks: "initial",
	// 				name: "jquery",
	// 				enforce: true
	// 			}
	// 		}
	// 	}
	// }
};
