import createOnDisk from '../../filesystem/projects/create'

import { actionTypes as projectActions } from '../modules/active-project'
import { actionTypes as landingActions } from '../modules/landing-pages'

export default async function createProject({ state, commit }) {
  try {
    await createOnDisk(state.landingPages.newProject)

    commit(projectActions.LOAD, state.landingPages.newProject.path)
  } catch (err) {
    commit(landingActions.SET_ERROR, err.toString())
  }
}
