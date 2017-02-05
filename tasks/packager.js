const fs = require("fs")
const minimist = require("minimist")
const isObject = require("lodash/isObject")
const map = require("lodash/map")
const mapKeys = require("lodash/mapKeys")
const omit = require("lodash/omit")
const escapeRegExp = require("lodash/escapeRegExp")
const execSync = require("child_process").execSync

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

function dependencyPath(dependencies, name) {
  if (dependencies[name]) {
    return []
  } else if (isObject(dependencies)) {
    for (let key of Object.keys(dependencies)) {
      const path = dependencyPath(dependencies[key], name)

      if (path) return [key].concat(path)
    }
  }
}

function replaceDependency(lines, { name, path, oldVersion, newVersion }) {
  let replaced = false
  let lastWhitespace = ""

  const regexFor = fragment => new RegExp(`^(${lastWhitespace}\\s+)['"]?${escapeRegExp(fragment)}['"]?\\s*:`)

  const regex = new RegExp(`\s+`)
  const result = lines.map(line => {
    if (path.length === 0 && regexFor(name).test(line) && line.includes(oldVersion)) {
      replaced = true

      return line.replace(oldVersion, newVersion)
    } else {
      const match = regexFor(path[0]).exec(line)

      if (match) {
        path.shift()
        lastWhitespace = match[1]
      }
    }

    return line
  })

  if (replaced) {
    console.log(`Updated "${name}": "${oldVersion}" => "${newVersion}"`)
  } else {
    console.warn(`Dependency not autosaved. Please add "${name}": "${newVersion}" by hand.`)
  }

  return result
}

function fixDependencies(config, key) {
  const dependencies = JSON.parse(fs.readFileSync("package.json"))[key]
  const oldDependencies = mergeDependencies(config[key])

  const toUpdate = []

  Object.keys(dependencies).forEach(name => {
    if (oldDependencies[name] !== dependencies[name]) {
      const path = [key].concat(dependencyPath(config[key], name) || [])

      toUpdate.push({
        name,
        path,
        oldVersion: oldDependencies[name],
        newVersion: dependencies[name]
      })
    }
  })

  const lines = fs.readFileSync(process.argv[1], "utf-8").split("\n")
  const updated = toUpdate.reduce(replaceDependency, lines).join("\n")

  fs.writeFileSync(process.argv[1], updated)
}

function runNpm(args) {
  const argList = []

  const formatArg = name => name.length === 1 ? `-${name}` : `--${name}`
  const formatValue = value => /\s/.test(value) ? `"${value.replace(/"/g, '\\"')}"` : value

  Object.keys(omit(args, "_")).forEach(name => {
    if (args[name] === true) {
      argList.push(formatArg(name))
    } else {
      argList.push(formatArg(name) + " " + formatValue(args[name]))
    }
  })

  const command = "npm " + (args._[0] || "") + " " + argList.concat(args._.slice(1)).join(" ")

  console.log(command)
  execSync(command)
}

module.exports = function packager(config) {
  generatePackageJson(config)

  const args = minimist(process.argv.slice(2))

  if (args.save || args["save-dev"]) {
    runNpm(args)
    fixDependencies(config, "dependencies")
    fixDependencies(config, "devDependencies")
  } else {
    runNpm(args)
  }
}
