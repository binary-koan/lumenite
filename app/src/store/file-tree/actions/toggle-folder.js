import find from 'lodash/find'
import { basename } from 'path'
import fs from 'src/filesystem/fs'

import types from '../types'
import findFolder from '../helpers/find-folder'

function directoriesFirst(entry1, entry2) {
  const entry1IsFolder = Array.isArray(entry1.children)
  const entry2IsFolder = Array.isArray(entry2.children)

  if (entry1IsFolder && !entry2IsFolder) {
    return -1
  } else if (!entry1IsFolder && entry2IsFolder) {
    return 1
  } else {
    return entry1.name.localeCompare(entry2.name)
  }
}

async function buildEntry(basePath, location) {
  const name = basename(location)
  const fragments = basename(name, '.json').split('.')
  const displayName = fragments[0]
  const type = fragments[fragments.length - 1]
  const stats = await fs.statAsync(location)

  if (stats.isDirectory()) {
    return { name, displayName, expanded: false, children: [] }
  } else if (type && name.endsWith('.json')) {
    return { name, displayName, type }
  }
}

export default async function toggleFolder({ state, rootState, commit }, { path, expand }) {
  const folder = findFolder(state, path)

  if (expand === undefined) {
    expand = !folder.expanded
  }

  if (expand) {
    const baseLocation = rootState.activeProject.path + '/' + path.join('/')

    if (!(await fs.existsSync(baseLocation))) {
      commit(types.SET_CHILDREN, { path, children: [] })
      return
    }

    const entries = await fs.readdirAsync(baseLocation)
    const children = (await Promise.all(
      entries.map(name => baseLocation + '/' + name).map(location => buildEntry(path, location))
    )).filter(Boolean).sort(directoriesFirst)

    commit(types.SET_CHILDREN, { path, children: children })
  } else {
    commit(types.COLLAPSE_FOLDER, path)
  }
}
