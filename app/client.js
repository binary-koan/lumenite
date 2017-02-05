import './styles/main.styl'

import Vue from 'vue'
import Electron from 'vue-electron'
import ElementUI from 'element-ui'

import ElementExtras from './components/element-extras'
import CustomDirectives from './helpers/directives'
import unsetAnnoyingGlobals from './helpers/unset-annoying-globals'

import Main from './components/main'

Vue.use(Electron)
Vue.use(ElementUI)
Vue.use(ElementExtras)
Vue.use(CustomDirectives)

Vue.config.debug = true

unsetAnnoyingGlobals()

/* eslint-disable no-new */
new Vue(Main).$mount('#main')
