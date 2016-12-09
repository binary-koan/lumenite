'use strict'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SymlinkPlugin = require('./tasks/webpack/symlink')

let config = {
  devtool: '#eval-source-map',
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  entry: {
    build: path.join(__dirname, 'app/src/main.js')
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'stylus-loader'])
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
        query: {
          limit: 10000,
          name: 'imgs/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
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
    alias: {
      'components': path.join(__dirname, 'app/src/components'),
      'src': path.join(__dirname, 'app/src')
    },
    extensions: ['', '.js', '.vue', '.json', '.css'],
    fallback: [path.join(__dirname, 'app/node_modules')]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  target: 'electron-renderer',
  vue: {
    loaders: {
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
      scss: 'vue-style-loader!css-loader!sass-loader'
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  /**
   * Apply ESLint
   */
  if (settings.eslint) {
    config.module.preLoaders.push(
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'eslint-loader'
      }
    )
  }

  const resourcesDir = process.platform === 'darwin' ?
    './node_modules/electron-prebuilt/dist/Electron.app/Contents/Resources' :
    './node_modules/electron-prebuilt/dist/resources'

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
