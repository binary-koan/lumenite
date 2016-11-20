import path from 'path'
import os from 'os'

import last from 'lodash/last'
import dropRight from 'lodash/dropRight'

// State

export const pages = Object.freeze({
  LANDING_PAGE: 'LANDING_PAGE',
  CREATE_PROJECT: 'CREATE_PROJECT'
})

const state = {
  error: null,
  page: pages.LANDING_PAGE,
  newProject: {
    name: '',
    path: path.join(os.homedir(), 'Projects') + path.sep,
    template: 'empty'
  },
  recentProjects: [],
  templates: []
}

// Action types

export const actionTypes = Object.freeze({
  SWITCH_PAGE: 'landingPages.SWITCH_PAGE',
  SET_NEW_PROJECT_NAME: 'landingPages.SET_NEW_PROJECT_NAME',
  SET_NEW_PROJECT_PATH: 'landingPages.SET_NEW_PROJECT_PATH',
  SET_NEW_PROJECT_TEMPLATE: 'landingPages.SET_NEW_PROJECT_TEMPLATE',
  SET_ERROR: 'landingPages.SET_ERROR'
})

// Mutations

const mutations = {
  [actionTypes.SWITCH_PAGE](state, page) {
    state.page = page
    state.error = null
  },
  [actionTypes.SET_NEW_PROJECT_NAME](state, name) {
    const pathSegments = state.newProject.path.split(path.sep)

    if (last(pathSegments) === state.newProject.name) {
      state.newProject.path = dropRight(pathSegments).join(path.sep) + path.sep + name
    }

    state.newProject.name = name
  },
  [actionTypes.SET_NEW_PROJECT_PATH](state, path) {
    state.newProject.path = path
  },
  [actionTypes.SET_NEW_PROJECT_TEMPLATE](state, template) {
    state.newProject.template = template
  },
  [actionTypes.SET_ERROR](state, message) {
    state.error = message
  }
}

export default {
  state,
  mutations
}
