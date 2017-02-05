const fs = require('fs-extra')

function asPromise(fn, ...args) {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

Object.keys(fs).forEach(name => {
  if (!name.endsWith('Sync')) {
    fs[name + 'Async'] = asPromise.bind(null, fs[name])
  }
})

module.exports = fs
