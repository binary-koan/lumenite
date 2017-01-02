import find from 'lodash/find'
import pathUtils from 'path'
import fs from 'src/filesystem/fs'

import fileTypes from 'src/filesystem/file-types'
import types from '../types'

export default async function openFile({ state, rootState, commit }, { path, file }) {
  const location = pathUtils.resolve(rootState.activeProject.path, ...path)
  const content = await fs.readJsonAsync(location)
  const fileType = find(fileTypes, t => t.id === file.type)

  commit(types.ADD_TAB, {
    title: file.displayName,
    tabType: 'file',
    fileType: file.type,
    editor: fileType.editor,
    content
  })
}
