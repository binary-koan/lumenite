import pathUtils from 'path'

import types from './types'

// State

const state = {
  path: null,
  name: null
}

// Mutations

const mutations = {
  [types.LOAD](state, path) {
    state.path = path
    state.name = pathUtils.basename(path)
  }
}

export default {
  state,
  mutations
}
