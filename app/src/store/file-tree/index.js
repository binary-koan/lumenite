import types from './types'

import toggleFolder from './actions/toggle-folder'
import refreshFolder from './actions/refresh-folder'
import commitRename from './actions/commit-rename'
import importFiles from './actions/import-files'

import findFolder from './helpers/find-folder'

import { ASSET_FILE_TYPES, BEHAVIOUR_FILE_TYPES, SCENE_FILE_TYPES } from 'src/filesystem/schemas'

const SETTINGS_FOLDER_PROPERTIES = {
  importFiles: false,
  createFiles: false,
  createFolders: false,
  fileOperations: false
}

const ASSET_FOLDER_PROPERTIES = {
  importFiles: true,
  createFiles: false,
  createFolders: true,
  fileOperations: true,
  types: ASSET_FILE_TYPES
}

const BEHAVIOURS_FOLDER_PROPERTIES = {
  importFiles: false,
  createFiles: true,
  createFolders: true,
  fileOperations: true,
  types: BEHAVIOUR_FILE_TYPES
}

const SCENES_FOLDER_PROPERTIES = {
  importFiles: false,
  createFiles: true,
  createFolders: true,
  fileOperations: true,
  types: SCENE_FILE_TYPES
}

// State

const state = {
  baseFolders: [
    {
      name: 'Settings', icon: 'settings', displayName: 'Settings',
      properties: SETTINGS_FOLDER_PROPERTIES, expanded: false, children: []
    },
    {
      name: 'Assets', icon: 'assets', displayName: 'Assets',
      properties: ASSET_FOLDER_PROPERTIES, expanded: false, children: []
    },
    {
      name: 'Behaviours', icon: 'behaviours', displayName: 'Behaviours',
      properties: BEHAVIOURS_FOLDER_PROPERTIES, expanded: false, children: []
    },
    {
      name: 'Scenes', icon: 'scenes', displayName: 'Scenes',
      properties: SCENES_FOLDER_PROPERTIES, expanded: false, children: []
    }
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
  [types.SET_CHILDREN](state, { path, children }) {
    const folder = findFolder(state, path)
    folder.children = []

    children.forEach(child => {
      child.properties = folder.properties
      folder.children.push(child)
    })

    folder.expanded = true
  },

  [types.COLLAPSE_FOLDER](state, path) {
    const folder = findFolder(state, path)
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
    [types.COMMIT_RENAME]: commitRename,
    [types.IMPORT_FILES]: importFiles
  }
}
