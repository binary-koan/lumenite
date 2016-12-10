import find from 'lodash/find'
import { basename } from 'path'
import fs from 'src/filesystem/fs'

window.fs = fs

import types from '../types'

function enterNextLevel(level, fragment) {
  return find(level, entry => Array.isArray(entry.children) && entry.name === fragment)
}

async function buildEntry(basePath, location) {
  const fileName = basename(location)
  const path = basePath.concat([fileName])
  const [name, type] = basename(fileName, '.json').split('.')
  const stats = await fs.statAsync(location)

  if (stats.isDirectory()) {
    return { name, type, path, expanded: false, children: [] }
  } else if (type && fileName.endsWith('.json')) {
    return { name, type, path }
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
