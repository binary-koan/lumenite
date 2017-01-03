import types from './types'
import openFile from './actions/open-file'

// State

const state = {
  tabs: [],
  selectedIndex: 0
}

// Mutations

const mutations = {
  [types.ADD_TAB](state, tab) {
    state.tabs.splice(state.selectedIndex + 1, 0, tab)

    if (state.selectedIndex < 0) {
      state.selectedIndex = 0
    }
  },

  [types.SELECT_TAB](state, index) {
    state.selectedIndex = index
  },

  [types.CLOSE_TAB](state, index) {
    state.tabs.splice(index, 1)

    if (state.selectedIndex >= state.tabs.length) {
      state.selectedIndex = state.tabs.length - 1
    }
  }
}

// Actions

const actions = {
  [types.OPEN_FILE]: openFile
}

export default {
  state,
  mutations,
  actions
}
