import get from 'lodash/get'

export function modelProperty(pathInState, updateMutatorType) {
  return {
    get() { return get(this.$store.state, pathInState) },
    set(value) { this.$store.commit(updateMutatorType, value) }
  }
}
