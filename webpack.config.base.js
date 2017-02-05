'use strict'

const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'stylus-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        loader: 'strict-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              loader: ['css-loader', 'stylus-loader'],
              fallbackLoader: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'imgs/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ],
    extensions: ['.js', '.vue', '.json', '.styl', '.css'],
  },
  target: 'electron-renderer'
}
