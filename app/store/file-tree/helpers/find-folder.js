import find from 'lodash/find'

function enterNextLevel(level, fragment) {
  const children = Array.isArray(level) ? level : level.children
  return find(children, entry => Array.isArray(entry.children) && entry.name === fragment)
}

export default function findFolder(state, path) {
  return path.reduce(enterNextLevel, state.baseFolders)
}
