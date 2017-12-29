/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
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
  devServer: {
    contentBase: './build',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
	extractSass
  ]
};
