/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  context: path.join(__dirname, '.'),
  entry: './index.js',
  output: {
		path: path.join(__dirname, 'dist'),
		filename: '[chunkhash].js',
	},
	module: {
		rules: [{
			test: /\.scss$/,
			include: [
			  path.resolve(__dirname, './styles'),
			],
			use: extractSass.extract({
				use: [{
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}],
				// use style-loader in development 
				fallback: "style-loader"
			})
		}, {
			test: /\.jsx?$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}]
	},
	plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new CleanPlugin(['dist'], { verbose: false }),
	new HtmlWebpackPlugin({
		template: './index.html',
	}),
	extractSass
	]
};
