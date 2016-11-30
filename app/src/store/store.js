import Vue from 'vue'
import Vuex from 'vuex'

import landingPages from './modules/landing-pages'
import activeProject from './modules/active-project'
import fileTree from './modules/file-tree'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    landingPages,
    activeProject,
    fileTree
  },
  strict: true
})
