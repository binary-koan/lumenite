'use strict'

const path = require('path')

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
  }
}

config.building.name = config.name

module.exports = config
