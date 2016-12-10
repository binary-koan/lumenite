import landingTypes from '../types'

export default function setError(error, commit) {
  commit(landingActions.SET_ERROR, error.toString())

  if (!error instanceof Rejection) {
    console.error(error.stack)
  }
}
