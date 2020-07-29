const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    main: './src/index.js',
    content: './src/content.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[ext]',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      excludeChunks: ['background', 'content']
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: ''
    }),
    new CopyWebpackPlugin({ patterns: [ { from: './public', to: './' } ] })
  ]
}
