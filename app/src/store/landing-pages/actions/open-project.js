import projectInfo from '../helpers/project-info'
import setError from '../helpers/set-error'

import projectTypes from '../../active-project/types'

export default async function openProject({ commit }, dirname) {
  try {
    await projectInfo(dirname)

    commit(projectTypes.LOAD, dirname)
  } catch (err) {
    setError(err, commit)
  }
}
