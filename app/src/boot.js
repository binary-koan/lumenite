import './styles/main.styl'

import Vue from 'vue'
import Electron from 'vue-electron'

Vue.use(Electron)
Vue.config.debug = true

import Main from './main'

/* eslint-disable no-new */
new Vue(Main).$mount('#main')
