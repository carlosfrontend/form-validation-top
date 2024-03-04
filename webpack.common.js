const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Starter Template',
      favicon: '',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: true,
    }),
  ], module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
};