import { Rejection } from 'src/helpers/error-helpers'
import createOnDisk from 'src/filesystem/projects/create'

import { actionTypes as projectActions } from '../modules/active-project'
import { actionTypes as landingActions } from '../modules/landing-pages'

export default async function createProject({ state, commit }) {
  try {
    await createOnDisk(state.landingPages.newProject)

    commit(projectActions.LOAD, state.landingPages.newProject.path)
  } catch (err) {
    if (err instanceof Rejection) {
      commit(landingActions.SET_ERROR, err.toString())
    } else {
      commit(landingActions.SET_ERROR, err.toString())
      console.error(err.stack)
    }
  }
}
