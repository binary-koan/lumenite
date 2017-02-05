#!/usr/bin/env node

require("./tasks/packager")({
  name: "sanction",
  version: "0.0.0",
  description: "An electron-vue project",
  author: "Jono Mingard <reason.koan@gmail.com>",
  license: "MIT",

  scripts: {
    postinstall: "node tasks/element-theme-to-stylus.js",
    setup: "node tasks/dependencies/setup.js",

    dev: "node tasks/runner.js",

    test: {
      default: ["unit", "e2e"],
      unit: "webpack --config test/boilerplate/unit/webpack.config.js && electron test/boilerplate/unit/runner.js | faucet",
      e2e: "npm run pack && node test/e2e"
    },

    build: {
      default: "node tasks/release.js",
      clean: "cross-env PLATFORM_TARGET=clean node tasks/release.js",
      darwin: "cross-env PLATFORM_TARGET=darwin node tasks/release.js",
      linux: "cross-env PLATFORM_TARGET=linux node tasks/release.js",
      win32: "cross-env PLATFORM_TARGET=win32 node tasks/release.js",
      pack: "cross-env NODE_ENV=production webpack --progress --colors"
    },

    lint: {
      default: "eslint --ext .js,.vue -f ./node_modules/eslint-friendly-formatter app test",
      fix: "eslint --ext .js,.vue -f ./node_modules/eslint-friendly-formatter --fix app test"
    }
  },

  devDependencies: {
    "electron": "^1.4.12",
    "lodash": "^4.17.2",
    "fs-extra": "^1.0.0",

    pack: {
      "copy-webpack-plugin": "^4.0.1",
      "css-loader": "^0.26.1",
      "extract-text-webpack-plugin": "^2.0.0-beta.4",
      "file-loader": "^0.9.0",
      "html-webpack-plugin": "^2.24.1",
      "json-loader": "^0.5.4",
      "strict-loader": "^1.1.0",
      "style-loader": "^0.13.1",
      "stylus": "^0.54.5",
      "stylus-loader": "^2.4.0",
      "url-loader": "^0.5.7",
      "vue-hot-reload-api": "^2.0.6",
      "vue-html-loader": "^1.2.3",
      "vue-loader": "^10.0.2",
      "vue-style-loader": "^1.0.0",
      "vue-template-compiler": "^2.1.4",
      "webpack": "^2.1.0-beta.27",
      "webpack-dev-server": "^2.1.0-beta.12",

      client: {
        "babylonjs": "^2.5.0",
        "element-theme-default": "^1.1.6",
        "element-ui": "^1.1.6",
        "minimatch": "^3.0.3",
        "pluralize": "^3.1.0",
        "vue": "^2.0.1",
        "vue-electron": "^1.0.0",
        "vuex": "^2.0.0"
      }
    },

    localDev: {
      "download": "^5.0.2",
      "devtron": "^1.4.0",
      "electron-devtools-installer": "^2.0.1",
      "glob": "^7.1.1",
      "tree-kill": "^1.1.0",
    },

    test: {
      "faucet": "0.0.1",
      "karma": "^1.3.0",
      "karma-coverage": "^1.1.1",
      "karma-electron": "^5.1.1",
      "karma-sourcemap-loader": "^0.3.7",
      "karma-tap": "^3.1.1",
      "karma-webpack": "^1.8.0",
      "require-dir": "^0.3.1",
      "spectron": "^3.4.0",
      "tape": "^4.6.3",
      "tape-catch": "^1.0.6",
      "through": "^2.3.8",
    },

    lint: {
      "eslint": "^3.12.0",
      "eslint-config-standard": "^6.2.1",
      "eslint-friendly-formatter": "^2.0.6",
      "eslint-loader": "^1.6.1",
      "eslint-plugin-html": "^1.7.0",
      "eslint-plugin-promise": "^3.4.0",
      "eslint-plugin-standard": "^2.0.1",
    },

    build: {
      "cross-env": "^3.1.3",
      "electron-packager": "^8.4.0",
      "electron-rebuild": "^1.4.0",
    }
  }
})
