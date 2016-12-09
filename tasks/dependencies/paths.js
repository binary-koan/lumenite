const path = require('path')

const dependenciesPath = path.resolve(__dirname, '../../dependencies')

module.exports = {
  dependencies: dependenciesPath,
  versions: path.resolve(dependenciesPath, 'versions.json'),
  git: path.resolve(dependenciesPath, 'git'),
  haxe: path.resolve(dependenciesPath, 'haxe'),
  temp: path.resolve(dependenciesPath, 'temp')
}
