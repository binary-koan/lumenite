'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('../../../webpack.config.base')

config.devtool = '#inline-source-map'

config.entry = {
  build: path.join(__dirname, 'tests.js')
}

config.plugins = config.plugins.concat([
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'runner.html'),
    title: 'Unit Tests'
  })
])

config.output = {
  filename: '[name].js',
  path: path.join(__dirname, 'dist')
}

module.exports = config
