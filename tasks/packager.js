const fs = require("fs")
const minimist = require("minimist")
const difference = require("lodash/difference")
const isObject = require("lodash/isObject")
const keys = require("lodash/keys")
const map = require("lodash/map")
const mapKeys = require("lodash/mapKeys")
const omit = require("lodash/omit")

function injectPackageScripts(scripts) {
  keys(scripts).forEach(script => {
    scripts[script] = `node package.js && ${scripts[script]}`
  })

  for (script of ["postinstall", "postuninstall", "postupdate"]) {
    scripts[script] = scripts[script] || "node package.js"
  }

  return scripts
}

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
    scripts: injectPackageScripts(mergeScripts(config.scripts)),
    dependencies: mergeDependencies(config.dependencies),
    devDependencies: mergeDependencies(config.devDependencies)
  })

  fs.writeFileSync("package.json", JSON.stringify(contents, null, 2))
  console.log("Synced package.json with package.js.")
}

function formatDependencies(toFormat, all) {
  return keys(all)
    .filter(key => toFormat.includes(key))
    .map(key => `"${key}": "${all[key]}"`)
}

function formatChangedDependencies(toFormat, previous, current) {
  return keys(previous)
    .filter(key => toFormat.includes(key))
    .map(key => `"${key}": "${current[key]}" (was "${previous[key]}")`)
}

function checkDependencies(config, key) {
  if (!fs.existsSync("package.json")) {
    return true
  }

  const packageJson = JSON.parse(fs.readFileSync("package.json"))

  const npmDependencies = packageJson[key]
  const savedDependencies = mergeDependencies(config[key])

  let messages = []

  const added = difference(keys(npmDependencies), keys(savedDependencies))
  if (added.length) {
    messages = [...messages, "", "Added:", ...formatDependencies(added, npmDependencies)]
  }

  const removed = difference(keys(savedDependencies), keys(npmDependencies))
  if (removed.length) {
    messages = [...messages, "", "Removed:", ...formatDependencies(removed, savedDependencies)]
  }

  const changed = keys(savedDependencies).filter(name => npmDependencies[name] && savedDependencies[name] !== npmDependencies[name])
  if (changed.length) {
    messages = [...messages, "", "Changed:", ...formatChangedDependencies(changed, savedDependencies, npmDependencies)]
  }

  if (messages.length) {
    console.log("Your package.js does not match your package.json")
    messages.forEach(message => console.log(message))
    console.log("\nPlease update your package.js to reflect these changes.")
    console.log("Your package.json was not changed.")
  }

  return !messages.length
}

module.exports = function packager(config) {
  if (checkDependencies(config, "dependencies") && checkDependencies(config, "devDependencies")) {
    generatePackageJson(config)
  }
}
