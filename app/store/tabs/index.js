import findIndex from 'lodash/findIndex'

import types from './types'
import openFile from './actions/open-file'

// State

const state = {
  tabs: [],
  selected: null
}

// Mutations

function sanityCheckTabId(state, id) {
  if (!state.tabs.filter(tab => tab.id === id).length) {
    throw `Unable to set tab: No tab with ID ${id}`
  }
}

const mutations = {
  [types.ADD_TAB](state, tab) {
    const index = findIndex(state.tabs, tab => tab.id === state.selected)

    state.tabs.splice(index + 1, 0, tab)
    state.selected = tab.id
  },

  [types.SELECT_TAB](state, id) {
    if (!id) {
      state.selected = null
      return
    }

    sanityCheckTabId(state, id)
    state.selected = id
  },

  [types.CLOSE_TAB](state, id) {
    sanityCheckTabId(state, id)
    const index = findIndex(state.tabs, tab => tab.id === id)

    state.tabs.splice(index, 1)

    if (index > 0) {
      state.selected = state.tabs[index - 1].id
    } else if (state.tabs.length > 0) {
      state.selected = state.tabs[0].id
    } else {
      state.selected = null
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
