const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
     main: './src/index.js',
     articles: './src/saved-articles/articles.js'
    },
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
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      // },
      {
        test: /\.css$/,
        use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            {loader: 'css-loader',
            options: {
                importLoaders: 2}
            },
            'postcss-loader']
    },
      {
				test: /\.(woff|woff2|ttf)$/,
				use: 'file-loader?name=./fonts/[name].[ext]&esModule=false'
			},
			{
				test: /\.(jpg|jpeg|png|svg|webp)$/,
				use: 'file-loader?name=./images/[name].[ext]&esModule=false'
			}
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      //inject: false,
      inject: true,
      template: './src/index.html',
      filename: 'index.html',

      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      //inject: false,
      inject: true,
      template: './src/articles.html',
      filename: 'articles.html',

      chunks: ['articles'],
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
      preset: ['default'],
      },
      canPrint: true
  }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]
};