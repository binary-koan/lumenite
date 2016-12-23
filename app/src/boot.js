import './styles/main.styl'

import Vue from 'vue'
import Electron from 'vue-electron'

import setupCustomDirectives from './helpers/directives'

Vue.use(Electron)
Vue.config.debug = true
setupCustomDirectives(Vue)

import Main from './main'

/* eslint-disable no-new */
new Vue(Main).$mount('#main')
