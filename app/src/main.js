import Vue from 'vue'
import Electron from 'vue-electron'

Vue.use(Electron)
Vue.config.debug = true

import App from './app'

/* eslint-disable no-new */
new Vue(App).$mount('#app')
