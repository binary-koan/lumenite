import Vue from 'vue'
import Vuex from 'vuex'

import landingPages from './landing-pages/index'
import activeProject from './active-project/index'
import fileTree from './file-tree/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    landingPages,
    activeProject,
    fileTree
  },
  strict: true
})
