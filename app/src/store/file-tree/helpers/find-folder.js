import find from 'lodash/find'

function enterNextLevel(level, fragment) {
  return find(level, entry => Array.isArray(entry.children) && entry.name === fragment)
}

export default function findFolder(state, path) {
  return path.reduce(enterNextLevel, state.baseFolders)
}
