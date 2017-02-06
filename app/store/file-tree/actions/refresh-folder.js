import types from '../types'
import findFolder from '../helpers/find-folder'

export default async function refreshFolder({ state, dispatch, commit }, path) {
  await dispatch(types.TOGGLE_FOLDER, { path, expand: true }).then(() => {
    const folder = findFolder(state, path)

    folder.children.forEach(child => {
      if (child.children.length) {
        dispatch(types.REFRESH_FOLDER, path.concat([child.name]))
      }
    })
  })
}
