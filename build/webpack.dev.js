const path = require('path');
const webpack = require("webpack");
//合并公用配置
const { merge } = require('webpack-merge')
// 使用 HardSourceWebpackPlugin 时，不要使用 speed-measure-webpack-plugin 会报错
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
const webpackCommon = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(webpackCommon, {
	mode: "development",
	devtool: "cheap-module-eval-source-map",
	// webpack-dev-server 配置选项
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		compress: true,// 启用 gzip 压缩
		open: true, //自动打开浏览器
		quiet: false, // 初始启动信息之外的任何内容都不会被打印到控制台
		hot: true, //开启热更新
		port: 3000, //配置端口
		clientLogLevel: 'none',  //关闭浏览器控制台输出的热更新信息
	},
	module: {
		rules: [
			{
				test: /\.(css)$/,
				include: path.join(__dirname, "../src"),
				use: [
					"style-loader",
					// "thread-loader", // 项目大，loader 花费时间长时用
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.(less)$/,
				include: path.join(__dirname, "../src"),
				use: [
					"style-loader",
					// "thread-loader", // 项目大，loader 花费时间长时用
					"css-loader",
					"postcss-loader",
					"less-loader",
				]
			},
		]
	},
	plugins: [
		// 生成 HTML 并自动引入 bundle
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/index.html'),
			env: "development"
		}),
		// 热更新
		new webpack.HotModuleReplacementPlugin(),
		// 根据不同环境设置，全局变量
		new webpack.DefinePlugin({
			'process.env': {
				//开发环境，设置全局变量可以在整个项目中调用
				BASE_URL: JSON.stringify('http://localhost:3000/dev')
			}
		})
	]
});