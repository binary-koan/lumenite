import path from 'path'
import fs from 'app/filesystem/fs'

import { Rejection } from 'app/helpers/error-helpers'
import types from '../types'

function findNewFileSchema(path) {
  return Promise.resolve({
    defaultContent: { test: 1 }
  })
}

export default async function commitRename({ state, rootState, commit, dispatch }) {
  const name = state.rename.newName
  const basePath = path.resolve(rootState.activeProject.path, ...state.rename.parentPath)
  const newPath = path.resolve(basePath, name)

  if (!name) {
    throw new Rejection('You must enter a name.')
  }

  if (state.rename.create && fs.existsSync(newPath)) {
    throw new Rejection('That path already exists.')
  }

  if (state.rename.create === 'file') {
    const fileType = await findNewFileSchema(state.rename.parentPath)
    await fs.outputJson(newPath, fileType.defaultContent)
  } else if (state.rename.create === 'folder') {
    await fs.mkdirs(newPath)
  } else {
    const originalPath = path.resolve(
      rootState.activeProject.path, ...state.rename.parentPath, state.rename.originalName
    )
    await fs.moveAsync(originalPath, newPath)
  }

  await dispatch(types.REFRESH_FOLDER, state.rename.parentPath)
  commit(types.STOP_RENAME)
}
