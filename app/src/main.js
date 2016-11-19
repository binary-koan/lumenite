import './styles/reset.styl'
import './styles/icons.styl'
import './styles/defaults.styl'

// window.Promise = require('bluebird')

import Vue from 'vue'
import Electron from 'vue-electron'

Vue.use(Electron)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
