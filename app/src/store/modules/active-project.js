// State

const state = {
  path: null
}

// Action types

export const actionTypes = Object.freeze({
  LOAD: 'activeProject.LOAD'
})

// Mutations

const mutations = {
  [actionTypes.LOAD](state, path) {
    state.path = path
  }
}

export default {
  state,
  mutations
}
