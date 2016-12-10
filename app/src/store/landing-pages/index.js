import path from 'path'
import os from 'os'
import fs from 'src/filesystem/fs'

import last from 'lodash/last'
import dropRight from 'lodash/dropRight'

import { Rejection } from 'src/helpers/error-helpers'
import createOnDisk from 'src/filesystem/operations/create-project'
import listTemplates from 'src/filesystem/queries/list-templates'
import projectInfo from 'src/filesystem/queries/project-info'

import { types as projectActions } from '../active-project'
import { types as landingActions } from '../landing-pages'

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
  templates: [],
  pendingAction: null,
  pendingActionBlocks: false
}

// Types

export const types = Object.freeze({
  SWITCH_PAGE: 'landingPages.SWITCH_PAGE',
  SET_TEMPLATES: 'landingPages.SET_TEMPLATES',
  SET_NEW_PROJECT_NAME: 'landingPages.SET_NEW_PROJECT_NAME',
  SET_NEW_PROJECT_PATH: 'landingPages.SET_NEW_PROJECT_PATH',
  SET_NEW_PROJECT_TEMPLATE: 'landingPages.SET_NEW_PROJECT_TEMPLATE',
  SET_ERROR: 'landingPages.SET_ERROR',

  FIND_TEMPLATES: 'landingPages.FIND_TEMPLATES',
  PICK_DIRECTORY: 'landingPages.PICK_DIRECTORY',
  CREATE_PROJECT: 'landingPages.CREATE_PROJECT',
  OPEN_PROJECT: 'landingPages.OPEN_PROJECT'
})

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

function setError(error, commit) {
  commit(landingActions.SET_ERROR, error.toString())

  if (!error instanceof Rejection) {
    console.error(error.stack)
  }
}

const actions = {
  async [types.FIND_TEMPLATES]({ commit }) {
    try {
      const templates = await listTemplates()

      commit(types.SET_TEMPLATES, templates)
      commit(types.SET_NEW_PROJECT_TEMPLATE, templates[0].id)
    } catch (err) {
      setError(err, commit)
    }
  },

  async [types.PICK_DIRECTORY]({ state, commit }, dirname) {
    if (!dirname) {
      return
    }

    const contents = await fs.readdirAsync(dirname)

    // Assume that if the chosen directory is empty then project files should be created in it
    // directly, and if it contains anything then a new directory should be created inside it
    if (contents.length === 0) {
      commit(types.SET_NEW_PROJECT_PATH, dirname)
    } else {
      commit(types.SET_NEW_PROJECT_PATH, dirname + path.sep + state.newProject.name)
    }
  },

  async [types.CREATE_PROJECT]({ state, commit }) {
    try {
      await createOnDisk(state.newProject)

      commit(projectActions.LOAD, state.newProject.path)
    } catch (err) {
      setError(err, commit)
    }
  },

  async [types.OPEN_PROJECT]({ commit }, dirname) {
    try {
      await projectInfo(dirname)

      commit(projectActions.LOAD, dirname)
    } catch (err) {
      setError(err, commit)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
