// State

export const pages = Object.freeze({
  LANDING_PAGE: 'LANDING_PAGE',
  CREATE_PROJECT: 'CREATE_PROJECT'
})

const state = {
  page: pages.LANDING_PAGE,
  newProject: {},
  recentProjects: [],
  templates: []
}

// Action types

export const actionTypes = Object.freeze({
  SWITCH_PAGE: 'SWITCH_PAGE',
  SET_NEW_PROJECT_NAME: 'SET_NEW_PROJECT_NAME',
  SET_NEW_PROJECT_PATH: 'SET_NEW_PROJECT_PATH'
})

// Mutations

const mutations = {
  [actionTypes.SWITCH_PAGE](state, page) {
    state.page = page
  },
  [actionTypes.SET_NEW_PROJECT_NAME](state, name) {
    state.newProject.name = name
  },
  [actionTypes.SET_NEW_PROJECT_PATH](state, path) {
    state.newProject.path = path
  }
}

export default {
  state,
  mutations
}
