// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
    ],
  },
});