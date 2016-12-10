import path from 'path'
import os from 'os'
import fs from 'src/filesystem/fs'

import last from 'lodash/last'
import dropRight from 'lodash/dropRight'

import createProject from './actions/create-project'
import findTemplates from './actions/find-templates'
import openProject from './actions/open-project'
import pickNewProjectLocation from './actions/pick-new-project-location'

import types from './types'

// State

export const pages = Object.freeze({
  RECENT_PROJECTS: 'RECENT_PROJECTS',
  CREATE_PROJECT: 'CREATE_PROJECT'
})

const state = {
  error: null,
  page: pages.RECENT_PROJECTS,
  newProject: {
    name: '',
    path: path.join(os.homedir(), 'Projects') + path.sep,
    template: 'empty'
  },
  recentProjects: [],
  templates: [],
  pendingAction: null,
  pendingActionBlocks: false
}

// Mutations

const mutations = {
  [types.SWITCH_PAGE](state, page) {
    state.page = page
    state.error = null
  },
  [types.SET_TEMPLATES](state, templates) {
    state.templates = templates
  },
  [types.SET_NEW_PROJECT_NAME](state, name) {
    const pathSegments = state.newProject.path.split(path.sep)

    if (last(pathSegments) === state.newProject.name) {
      state.newProject.path = dropRight(pathSegments).join(path.sep) + path.sep + name
    }

    state.newProject.name = name
  },
  [types.SET_NEW_PROJECT_PATH](state, path) {
    state.newProject.path = path
  },
  [types.SET_NEW_PROJECT_TEMPLATE](state, template) {
    state.newProject.template = template
  },
  [types.SET_ERROR](state, message) {
    state.error = message
  }
}

// Actions

const actions = {
  [types.FIND_TEMPLATES]: findTemplates,
  [types.PICK_NEW_PROJECT_LOCATION]: pickNewProjectLocation,
  [types.CREATE_PROJECT]: createProject,
  [types.OPEN_PROJECT]: openProject
}

export default {
  state,
  mutations,
  actions
}
