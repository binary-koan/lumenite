import find from 'lodash/find'

// State

const state = {
  baseFolders: [
    { name: 'Settings', expanded: false, children: [] },
    { name: 'Assets', expanded: false, children: [] },
    { name: 'Behaviours', expanded: false, children: [] },
    { name: 'Scenes', expanded: false, children: [] }
  ]
}

// Types

export const types = Object.freeze({
  SET_CHILDREN: 'fileTree.SET_CHILDREN',
  COLLAPSE_FOLDER: 'fileTree.COLLAPSE_FOLDER'
})

// Mutations

const mutations = {
  [types.SET_CHILDREN](state, { path, children }) {
    let affected = state.baseFolders

    path.forEach(fragment => {
      affected = find(affected, entry => Array.isArray(entry.children) && entry.name === fragment)
    })

    children.forEach(child => {
      if (child.isFolder) {
        affected.children.push({ ...child, expanded: false, children: [] })
      } else {
        affected.children.push(child)
      }
    })

    console.log(affected)

    affected.expanded = true
  },

  [types.COLLAPSE_FOLDER](state, path) {
    let affected = state.baseFolders

    path.forEach(fragment => {
      affected = find(affected, entry => Array.isArray(entry.children) && entry.name === fragment)
    })

    affected.expanded = false
  }
}

// Actions

async function toggleFolder({ state, commit }, path) {
  commit(types.SET_CHILDREN, { path, children: [] })
}

export default {
  state,
  mutations,
  actions: { toggleFolder }
}