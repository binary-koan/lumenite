import './styles/main.styl'

import Vue from 'vue'
import Electron from 'vue-electron'

import setupCustomDirectives from './helpers/directives'
import unsetAnnoyingGlobals from './helpers/unset-annoying-globals'

Vue.use(Electron)
Vue.config.debug = true

setupCustomDirectives(Vue)
unsetAnnoyingGlobals()

import Main from './main'

/* eslint-disable no-new */
new Vue(Main).$mount('#main')
