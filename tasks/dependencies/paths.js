const path = require('path')

const dependenciesPath = path.resolve(__dirname, '../../dependencies')

module.exports = {
  dependencies: dependenciesPath,
  versions: path.resolve(dependenciesPath, 'versions.json'),
  temp: path.resolve(dependenciesPath, 'temp')
}
