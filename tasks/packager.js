const fs = require("fs")
const minimist = require("minimist")
const isObject = require("lodash/isObject")
const map = require("lodash/map")
const mapKeys = require("lodash/mapKeys")
const omit = require("lodash/omit")

function mergeScripts(scripts) {
  const scriptGroups = map(scripts, (value, name) => {
    if (isObject(value)) {
      return mapKeys(mergeScripts(value), (_, subname) => `${name}:${subname}`)
    } else {
      return { [name]: value }
    }
  })

  return Object.assign({}, ...scriptGroups)
}

function mergeDependencies(dependencies) {
  const dependencyGroups = map(dependencies, (value, name) =>
    isObject(value) ? mergeDependencies(value) : { [name]: value }
  )

  return Object.assign({}, ...dependencyGroups)
}

function generatePackageJson(config) {
  const contents = Object.assign(omit(config, "scripts", "dependencies", "devDependencies"), {
    scripts: mergeScripts(config.scripts),
    dependencies: mergeDependencies(config.dependencies),
    devDependencies: mergeDependencies(config.devDependencies)
  })

  fs.writeFileSync("package.json", JSON.stringify(contents, null, 2))
  console.log("Generated package.json")
}

module.exports = function packager(config) {
  generatePackageJson(config)
}
