import './styles/main.styl'

import Vue from 'vue'
import Electron from 'vue-electron'
import ElementUI from 'element-ui'

import setupCustomDirectives from './helpers/directives'
import unsetAnnoyingGlobals from './helpers/unset-annoying-globals'

Vue.use(Electron)
Vue.use(ElementUI)
Vue.config.debug = true

setupCustomDirectives(Vue)
unsetAnnoyingGlobals()

import Main from './element-test'

/* eslint-disable no-new */
new Vue(Main).$mount('#main')
