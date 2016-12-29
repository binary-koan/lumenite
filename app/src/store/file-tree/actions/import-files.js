import find from 'lodash/find'
import pathUtils from 'path'
import fs from 'src/filesystem/fs'

import { CORE_FOLDERS } from 'src/filesystem/paths'
import * as fileTypes from 'src/filesystem/file-types'

import types from '../types'

function allowedFileTypes(path) {
  const root = path[0]

  switch (root) {
  case CORE_FOLDERS.assets:
    return ASSET_FILE_TYPES
  case CORE_FOLDERS.behaviours:
    return BEHAVIOUR_FILE_TYPES
  case CORE_FOLDERS.scenes:
    return SCENE_FILE_TYPES
  }
}

function findWrapper(location, allFiles) {
  const dir = pathUtils.dirname(location)
  const filename = pathUtils.basename(location)
  const filesInDir = allFiles.filter(location => location.startsWith(dir + pathUtils.sep))

  return find(filesInDir, loc =>
    filename.endsWith('.json') && filename.startsWith(pathUtils.basename(loc))
  )
}

function createDefaultWrapper(filename, projectLocation) {
  const content = { test: 1 }
  return fs.outputJsonAsync(pathUtils.resolve(projectLocation, filename + '.test.json'), content)
}

export default async function importFiles({ state, rootState, dispatch }, { files, path }) {
  const allowedTypes = allowedFileTypes(path)
  const projectLocation = pathUtils.resolve(rootState.activeProject.path, ...path)

  const operations = []

  files.forEach(location => {
    const name = pathUtils.basename(location)
    operations.push(fs.copyAsync(location, pathUtils.resolve(projectLocation, name)))

    if (!findWrapper(name, files)) {
      operations.push(createDefaultWrapper(name, projectLocation))
    }
  })

  await Promise.all(operations)
  await dispatch(types.REFRESH_FOLDER, path)
}
