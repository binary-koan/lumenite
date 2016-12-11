import fs from 'src/filesystem/fs'

import types from '../types'

export default async function pickNewProjectLocation({ state, commit }, location) {
  if (!location) {
    return
  }

  const contents = await fs.readdirAsync(location)

  // Assume that if the chosen directory is empty then project files should be created in it
  // directly, and if it contains anything then a new directory should be created inside it
  if (contents.length === 0) {
    commit(types.SET_NEW_PROJECT_PATH, location)
  } else {
    commit(types.SET_NEW_PROJECT_PATH, location + '/' + state.newProject.name)
  }
}
