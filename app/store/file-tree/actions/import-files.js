import find from 'lodash/find'
import pathUtils from 'path'
import minimatch from 'minimatch'
import pluralize from 'pluralize'
import fs from 'app/filesystem/fs'

import { CORE_FOLDERS } from 'app/filesystem/paths'
import fileTypes from 'app/filesystem/file-types'

import types from '../types'

function validTypeIn(root, type) {
  return type.root === root && type.import
}

function allFileMatchers(path) {
  const root = path[0]

  return fileTypes
    .filter(type => validTypeIn(root, type))
    .map(type => type.import.matchers)
    .reduce((all, current) => all.concat(current), [])
}

function findWrapper(location, allFiles) {
  const dir = pathUtils.dirname(location)
  const filename = pathUtils.basename(location)
  const filesInDir = allFiles.filter(location => location.startsWith(dir + pathUtils.sep))

  return find(filesInDir, loc =>
    filename.endsWith('.json') && filename.startsWith(pathUtils.basename(loc))
  )
}

function createDefaultWrapper(filename, matcher, projectPath) {
  const root = projectPath[0]

  // First, check if we're in a subdirectory that looks like a type ID - e.g. if we're in
  // /Assets/Tilesets we should create a tileset. TODO this should be done better / more transparently
  const pathAsIds = projectPath.map(fragment => pluralize.singular(fragment).toLowerCase())
  let importType = find(fileTypes, type =>
    validTypeIn(root, type) && type.import.matchers.includes(matcher) && pathAsIds.includes(type.id)
  )

  // Otherwise, just find the first file type that looks about right
  if (!importType) {
    importType = find(fileTypes, type =>
      validTypeIn(root, type) && type.import.matchers.includes(matcher)
    )
  }

  return {
    filename: `${filename}.${importType.id}.json`,
    content: importType.import.buildWrapper({ filename, projectPath })
  }
}

async function ensureWrapper(existingWrapperLoc, newWrapper, projectLocation) {
  if (existingWrapperLoc) {
    const filename = pathUtils.basename(existingWrapperLoc)
    await fs.copyAsync(existingWrapperLoc, pathUtils.resolve(projectLocation, filename))
  } else {
    await fs.outputJsonAsync(pathUtils.resolve(projectLocation, newWrapper.filename), newWrapper.content)
  }
}

export default async function importFiles({ state, rootState, dispatch }, { files, path }) {
  const matchers = allFileMatchers(path)
  const projectLocation = pathUtils.resolve(rootState.activeProject.path, ...path)

  const operations = []

  files.forEach(location => {
    const name = pathUtils.basename(location)
    const matcher = find(matchers, m => minimatch(name.toLowerCase(), m.toLowerCase()))

    if (!matcher) {
      console.warn(`No import matcher found for: ${location}`)
      return
    }

    operations.push(fs.copyAsync(location, pathUtils.resolve(projectLocation, name)))
    operations.push(
      ensureWrapper(findWrapper(name, files), createDefaultWrapper(name, matcher, path), projectLocation)
    )
  })

  await Promise.all(operations)
  await dispatch(types.REFRESH_FOLDER, path)
}
