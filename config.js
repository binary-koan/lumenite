'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let config = {
  // Name of electron app
  // Will be used in production builds
  name: 'sanction',

  // Use ESLint (extends `none`)
  // Further changes can be made in `.eslintrc.js`
  eslint: false, //TODO enable when things can be parsed properly

  // webpack-dev-server port
  port: 9080,

  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
  building: {
    arch: 'x64',
    asar: true,
    dir: __dirname,
    icon: path.join(__dirname, 'icons/icon'),
    ignore: /\b(node_modules|app|icons|builds)\b/,
    out: path.join(__dirname, 'builds'),
    overwrite: true,
    platform: process.env.PLATFORM_TARGET || 'all'
  },

  webpack: {
    module: {
      rules: [
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract({
            use: ['css-loader', 'stylus-loader'],
            fallback: 'style-loader'
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
                use: ['css-loader', 'stylus-loader'],
                fallback: 'vue-style-loader'
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
}

config.building.name = config.name

module.exports = config
