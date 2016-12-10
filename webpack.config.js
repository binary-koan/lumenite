'use strict'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SymlinkPlugin = require('./tasks/webpack/symlink-plugin')

let config = {
  devtool: '#eval-source-map',
  entry: {
    build: path.join(__dirname, 'app/src/main.js')
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          notExtractLoader: 'style-loader', loader: ['css-loader', 'stylus-loader']
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
        loader: 'vue-loader'
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
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.ejs',
      title: settings.name
    }),
    new webpack.NoErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'app/dist')
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app'),
      'node_modules'
    ],
    extensions: ['.js', '.vue', '.json', '.styl', '.css'],
  },
  target: 'electron-renderer'
}

if (process.env.NODE_ENV !== 'production') {
  /**
   * Apply ESLint
   */
  if (settings.eslint) {
    config.module.rules.push(
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    )
  }

  const resourcesDir = process.platform === 'darwin' ?
    './node_modules/electron/dist/Electron.app/Contents/Resources' :
    './node_modules/electron/dist/resources'

  config.plugins.push(new SymlinkPlugin([
    { from: './templates', to: `${resourcesDir}/templates`, type: 'dir' },
    { from: './dependencies/PortableGit', to: `${resourcesDir}/PortableGit`, type: 'dir' },
    {
      from: './dependencies/haxe', to: `${resourcesDir}/haxe`, type: 'dir',
      warnIfEmpty: 'Haxe directory is empty; make sure you run `npm run setup` before starting the app.'
    }
  ]))
}

/**
 * Adjust config for production settings
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = ''

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
