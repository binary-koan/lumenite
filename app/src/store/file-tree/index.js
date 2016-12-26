import types from './types'
import toggleFolder from './actions/toggle-folder'
import refreshFolder from './actions/refresh-folder'
import commitRename from './actions/commit-rename'

// State

const state = {
  baseFolders: [
    { name: 'Settings', icon: 'settings', displayName: 'Settings', expanded: false, children: [] },
    { name: 'Assets', icon: 'assets', displayName: 'Assets', expanded: false, children: [] },
    { name: 'Behaviours', icon: 'behaviours', displayName: 'Behaviours', expanded: false, children: [] },
    { name: 'Scenes', icon: 'scenes', displayName: 'Scenes', expanded: false, children: [] }
  ],
  rename: {
    inProgress: false,
    parentPath: null,
    originalName: null,
    newName: null,
    create: null
  }
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
  },

  [types.START_RENAME](state, path) {
    const name = path.pop()

    state.rename = {
      inProgress: true,
      parentPath: path,
      originalName: name,
      newName: name,
      create: null
    }
  },

  [types.START_ADD_FOLDER](state, parentPath) {
    state.rename = {
      inProgress: true,
      parentPath: parentPath,
      originalName: null,
      newName: '',
      create: 'folder'
    }
  },

  [types.START_ADD_FILE](state, parentPath) {
    state.rename = {
      inProgress: true,
      parentPath: parentPath,
      originalName: null,
      newName: '',
      create: 'file'
    }
  },

  [types.CONTINUE_RENAME](state, name) {
    state.rename.newName = name
  },

  [types.STOP_RENAME](state) {
    state.rename.inProgress = false
  }
}

// Actions

export default {
  state,
  mutations,
  actions: {
    [types.TOGGLE_FOLDER]: toggleFolder,
    [types.REFRESH_FOLDER]: refreshFolder,
    [types.COMMIT_RENAME]: commitRename
  }
}
