const fs = require('fs')
const path = require('path')

module.exports = class SymlinkPlugin {
  constructor(options) {
    if (!Array.isArray(options)) {
      options = [options]
    }

    this.options = options
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      this.options.forEach(({ from, to, type }) => {
        from = path.resolve(from)
        to = path.resolve(to)

        const isLink = fs.existsSync(to) && fs.lstatSync(to).isSymbolicLink()

        if (!isLink || fs.readlinkSync(to) !== from) {
          console.log(`Linking ${to} => ${from}`)
          fs.symlinkSync(from, to, type)
        }
      })
    })
  }
}
