// State

const state = {
  path: null
}

// Types

export const types = Object.freeze({
  LOAD: 'activeProject.LOAD'
})

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
