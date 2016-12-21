import find from 'lodash/find'
import { basename } from 'path'
import fs from 'src/filesystem/fs'

window.fs = fs

import types from '../types'

function enterNextLevel(level, fragment) {
  return find(level, entry => Array.isArray(entry.children) && entry.name === fragment)
}

async function buildEntry(basePath, location) {
  const name = basename(location)
  const [displayName, type] = basename(name, '.json').split('.')
  const stats = await fs.statAsync(location)

  if (stats.isDirectory()) {
    return { name, displayName, type, expanded: false, children: [] }
  } else if (type && name.endsWith('.json')) {
    return { name, displayName, type }
  }
}

export default async function toggleFolder({ state, rootState, commit }, path) {
  const folder = path.reduce(enterNextLevel, state.baseFolders)

  if (folder.expanded) {
    commit(types.COLLAPSE_FOLDER, folder)
  } else {
    const baseLocation = rootState.activeProject.path + '/' + path.join('/')

    if (!(await fs.existsSync(baseLocation))) {
      commit(types.SET_CHILDREN, { folder, children: [] })
      return
    }

    const entries = await fs.readdirAsync(baseLocation)
    const children = (await Promise.all(
      entries.map(name => baseLocation + '/' + name).map(location => buildEntry(path, location))
    )).filter(Boolean)

    commit(types.SET_CHILDREN, { folder, children: children })
  }
}
