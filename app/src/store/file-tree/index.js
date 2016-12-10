import types from './types'
import toggleFolder from './actions/toggle-folder'

// State

const state = {
  baseFolders: [
    { name: 'Settings', icon: 'settings', path: ['Settings'], expanded: false, children: [] },
    { name: 'Assets', icon: 'assets', path: ['Assets'], expanded: false, children: [] },
    { name: 'Behaviours', icon: 'behaviours', path: ['Behaviours'], expanded: false, children: [] },
    { name: 'Scenes', icon: 'scenes', path: ['Scenes'], expanded: false, children: [] }
  ]
}

// Mutations

const mutations = {
  // These are a bit hacky since they rely on `folder` being part of the state tree, so they should
  // only be called by actions in this module
  [types.SET_CHILDREN](_, { folder, children }) {
    children.forEach(child => folder.children.push(child))

    folder.expanded = true
  },

  [types.COLLAPSE_FOLDER](_, folder) {
    folder.children = []
    folder.expanded = false
  }
}

// Actions

export default {
  state,
  mutations,
  actions: {
    [types.TOGGLE_FOLDER]: toggleFolder
  }
}