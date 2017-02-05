import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import pathUtils from 'path'
import fs from 'app/filesystem/fs'

import fileTypes from 'app/filesystem/file-types'
import types from '../types'

export default async function openFile({ state, rootState, commit }, { path, file }) {
  const location = pathUtils.resolve(rootState.activeProject.path, ...path)
  const existingTabIndex = findIndex(state.tabs, tab => tab.tabType === 'file' && tab.location === location)

  if (existingTabIndex >= 0) {
    commit(types.SELECT_TAB, existingTabIndex)
    return
  }

  const content = await fs.readJsonAsync(location)
  const fileType = find(fileTypes, t => t.id === file.type)

  commit(types.ADD_TAB, {
    location,
    title: file.displayName,
    tabType: 'file',
    fileType: file.type,
    editor: fileType.editor,
    content
  })
}
