const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
},
module: {
  rules: [{
      test: /\.js$/,
      use: { loader: "babel-loader" },
      exclude: /node_modules/
          },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
				test: /\.(woff|woff2|ttf)$/,
				use: 'file-loader?name=./fonts/[name].[ext]'
			},
			{
				test: /\.(jpg|jpeg|png|svg|webp)$/,
				use: 'file-loader?name=./images/[name].[ext]&esModule=false'
			}
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/articles.html',
      filename: 'articles.html'
    }),
    new WebpackMd5Hash()
]
};