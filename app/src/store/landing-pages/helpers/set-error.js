import { Rejection } from 'src/helpers/error-helpers'

import landingTypes from '../types'

export default function setError(error, commit) {
  commit(landingTypes.SET_ERROR, error.toString())

  if (!(error instanceof Rejection)) {
    console.error(error)
  }
}
