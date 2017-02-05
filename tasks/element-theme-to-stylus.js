const fs = require("fs-extra")
const path = require("path")
const glob = require("glob")
const flow = require("lodash/flow")
const escapeRegExp = require("lodash/escapeRegExp")

const SKIP = Symbol("skip")

// We use custom versions of these
const ignoreIfIncludes = ["/var.css", "/reset.css", "/icon.css"]

// Some variables are just ... unnecessary
const variableReplacements = {
  "color-extra-light-black": "fill-lighten"
}

function shorthandPosition(values) {
  return Object.keys(values).map(key =>
    values[key] === "*" ? "" : `${key} ${values[key]}`
  ).filter(Boolean).join(" ")
}

function bemRule(atRules, cssBuilder) {
  atRules = atRules.map(escapeRegExp).join("|")

  const regex = new RegExp("(\\s*)(?:" + atRules + ") (.+) \\{")

  return line => line.replace(regex, (_, whitespace, descriptor) => {
    const parts = descriptor.split(/,?\s+/)
    const isTopLevel = !whitespace

    if (parts.length > 1 && parts[1].startsWith(".")) {
      // Handle annoying cases like "@modifier selection .cell"
      return whitespace + cssBuilder(parts[0], isTopLevel) + " " + parts[1] + " {"
    } else {
      // Handle normal cases like "@modifier primary, success"
      return whitespace + parts.map(part => cssBuilder(part, isTopLevel)).join(", ") + " {"
    }
  })
}

const lineConverter = flow(
  // Hacky specific workarounds
  line => line.replace("position: absolute 0 calc(var(--badge-size) / 2 + 1) * *", "absolute: top 0 left ($badge-size / 2 + 1)"),

  // Imports
  line => line.replace(/(@import.+)\.css(.+)/, "$1$2"),
  // Mixin definition
  line => line.replace(/@define-mixin\s+([a-zA-Z0-9_\-]+)\s+((?:[\$a-zA-Z0-9_\-]+(?:,\s*)?)+)/, "$1($2)"),
  line => line.replace(/@define-extend ([a-zA-Z0-9_\-]+)/, "$1()"),
  // Mixin usage
  line => line.replace(/@mixin\s+([a-zA-Z0-9_\-]+)\s+((?:[\$a-zA-Z0-9_\-]+(?:,\s*)?)+)/, "$1: $2"),
  line => line.replace(/@extend ([a-zA-Z0-9_\-]+)/, "$1()"),
  // Iteration
  line => line.replace(/@each ([\$a-zA-Z0-9_\-]+) in \((.+)\) {/, (_, ivar, list) =>
    `for ${ivar} in ${list.replace(/,/g, "")} {`
  ),
  line => line.replace(/@for ([\$a-zA-Z0-9_\-]+) from (\d+) to (\d+)/, "for $1 in $2..$3"),
  // BEM
  bemRule(["@component-namespace", "@component"], name => `.${name}-`),
  bemRule(["@block", "@b"], (name, isTopLevel) => isTopLevel ? `.${name}` : `&${name}`),
  bemRule(["@element", "@e"], name => `&__${name}`),
  bemRule(["@modifier", "@m"], name => `&--${name}`),
  bemRule(["@when"], name => `&.is-${name}`),
  // Variables
  line => line.replace(/\bvar\(--([a-zA-Z0-9\-_]+)\)/g, "$$$1"),
  line => line.replace(/\$\(([a-zA-Z0-9\-_]+)\)/, "$$$1"),
  line => line.replace(/(^\s*\.[a-zA-Z0-9\-_]+)(\$[a-zA-Z0-9\-_]+)/, "$1{$2}"),
  line => line.replace(/-(\$[a-zA-Z0-9\-_]+)/, "-($1)"),
  // Semicolons
  line => line.replace(/;$/, ""),
  // CSS functions
  line => line.replace(/\bcalc(?=\()/, ""),
  line => line.replace(/color\((\S+) s\((\d+)%\) l\((\d+)%\)\)/, "saturation(lightness($1, $3%), $2%)"),
  line => line.replace(/color\((\S+) tint\((\d+)%\)\)/, "tint($1, $2%)"),
  // postcss-utils
  line => line.replace(/@utils-user-select (.+)/, "user-select: $1"),
  line => line.replace(/@utils-vertical-center/, "vertical-center()"),
  line => line.replace(/@utils-clearfix/, "clearfix()"),
  // postcss-short
  line => line.replace(/position: (absolute|relative|fixed) (\S+) (\S+) (\S+) (\S+)/, (_, type, top, left, bottom, right) =>
    `${type}: ${shorthandPosition({ top, left, bottom, right })}`
  ),
  line => line.replace(/(padding|margin): \* (.+)/, "$1-left: $2; $1-right: $2"),

  ...Object.keys(variableReplacements).map(original =>
    line => line.replace(new RegExp("\\$" + original), "$$" + variableReplacements[original])
  )
)

function ignoreLine(line) {
  return /^@charset/.test(line) ||
    /^@import/.test(line) && ignoreIfIncludes.filter(i => line.includes(i)).length ||
    /filter: alpha\(opacity=/.test(line)
}

function convertLine(line) {
  if (ignoreLine(line)) {
    return SKIP
  } else {
    return lineConverter(line)
  }
}

function convertFile(filename) {
  return fs.readFileSync(filename, "utf-8")
    .split("\n")
    .map(convertLine)
    .filter(line => line !== SKIP)
    .join("\n")
}

console.log("--- Converting Element default theme from PostCSS to Stylus ---")

const sourceDir = path.resolve(__dirname, "../node_modules/element-theme-default/src")
const targetDir = path.resolve(__dirname, "../app/styles/element-theme-default")

glob.sync(`${sourceDir}/**/*.css`).forEach(filename => {
  if (ignoreIfIncludes.filter(i => filename.includes(i)).length) {
    return
  }

  const newDir = path.join(targetDir, path.dirname(filename).replace(sourceDir, ""))
  const newFilename = path.join(newDir, path.basename(filename).replace(/^_/, "").replace(/\.css/, ".styl"))

  fs.mkdirsSync(path.dirname(newFilename))
  fs.writeFileSync(newFilename, convertFile(filename))
  console.log(`${path.basename(filename)} => ${path.basename(newFilename)}`)
})
