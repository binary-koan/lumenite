import types from './types'

// State

const state = {
  path: null
}

// Mutations

const mutations = {
  [types.LOAD](state, path) {
    state.path = path
  }
}

export default {
  state,
  mutations
}
