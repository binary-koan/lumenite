const fs = require('fs-extra')
const path = require('path')

module.exports = class SymlinkPlugin {
  constructor(links) {
    if (!Array.isArray(links)) {
      links = [links]
    }

    this.links = links
  }

  isEmpty(dirname) {
    const files = fs.readdirSync(dirname).filter(file => !file.startsWith('.'))

    return files.length === 0
  }

  ensureLink({ from, to, type, warnIfEmpty }) {
    from = path.resolve(from)
    to = path.resolve(to)

    if (warnIfEmpty && this.isEmpty(from)) {
      console.warn(warnIfEmpty)
    }

    if (!fs.existsSync(from)) {
      return
    }

    const stats = fs.existsSync(to) ? fs.lstatSync(to) : {}

    if (fs.existsSync(to) && stats.isDirectory() && process.platform === 'win32') {
      this.copyInsteadOnWindows(from, to)
    } else if (fs.existsSync(to) && !stats.isSymbolicLink()) {
      console.warn(`Expected to make link ${to} => ${from}, but ${to} already exists.`)
    } else {
      this.makeLink(from, to, type)
    }
  }

  makeLink(from, to, type) {
    console.log(`Linking ${to} => ${from}`)

    try {
      fs.symlinkSync(from, to, type)
    } catch (e) {
      this.copyInsteadOnWindows(from, to)
    }
  }

  // Windows doesn't like symlinks; by default it either requires administrator privileges or
  // straight-up refuses to make any. So give up and just copy the files
  copyInsteadOnWindows(from, to) {
    // Copy files if the 'to' directory doesn't exist ...
    let performCopy = !fs.existsSync(to)

    // or if the 'from' directory was modified after the 'to' directory
    if (!performCopy) {
      if (fs.statSync(from).mtime > fs.statSync(to).mtime) {
        performCopy = true
      }
    }

    if (performCopy) {
      console.log('Copying files instead of linking because Windows ...')
      fs.copySync(from, to)
    }
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      this.links.forEach(this.ensureLink.bind(this))
    })
  }
}
