'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SymlinkPlugin = require('./tasks/webpack/symlink-plugin')

const settings = require('./config.js')
const config = settings.webpack

config.entry = {
  build: path.join(__dirname, 'app/client.js')
}

config.plugins = config.plugins.concat([
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: `${__dirname}/app/index.ejs`,
    title: settings.name
  }),
  new CopyWebpackPlugin([
    { from: 'app/electron.js', to: 'electron.js' }
  ]),
  new webpack.NoEmitOnErrorsPlugin()
])

config.output = {
  filename: '[name].js',
  path: path.join(__dirname, 'dist')
}

if (process.env.NODE_ENV !== 'production') {
  config.devtool = '#inline-source-map'

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
    `${__dirname}/node_modules/electron/dist/Electron.app/Contents/Resources` :
    `${__dirname}/node_modules/electron/dist/resources`

  config.plugins.push(new SymlinkPlugin([
    { from: `${__dirname}/templates`, to: `${resourcesDir}/templates`, type: 'dir' },
    { from: `${__dirname}/dependencies/PortableGit`, to: `${resourcesDir}/PortableGit`, type: 'dir' }
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
    })
  )
}

module.exports = config
