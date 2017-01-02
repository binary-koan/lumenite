import find from 'lodash/find'
import pathUtils from 'path'
import fs from 'src/filesystem/fs'

import fileTypes from 'src/filesystem/file-types'
import types from '../types'

export default async function openFile({ state, rootState, commit }, { path, type }) {
  const name = path[path.length - 1]
  const location = pathUtils.resolve(rootState.activeProject.path, ...path)
  const content = await fs.readJsonAsync(location)
  const fileType = find(fileTypes, t => t.id === type)

  state.commit(types.ADD_TAB, {
    title: name,
    editor: fileType.editor,
    content
  })
}
