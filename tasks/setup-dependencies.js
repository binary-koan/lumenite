'use strict'

const VERSIONS = {
  git: '2.11.0',
  haxe: '3.2.1',
  neko: '2.1.0'
}

const download = require('download')
const readline = require('readline')
const throttle = require('lodash/throttle')

function gitDownloadUrl() {
  const baseUrl = `https://github.com/git-for-windows/git/releases/download/v${VERSIONS.git}.windows.1/Git-${VERSIONS.git}`

  if (process.platform === 'win32') {
    if (process.arch === 'x64') {
      return `${baseUrl}-64-bit.tar.bz2`
    } else {
      return `${baseUrl}-32-bit.tar.bz2`
    }
  }
}

function haxeDownloadUrl() {
  const baseUrl = `https://github.com/HaxeFoundation/haxe/releases/download/${VERSIONS.haxe}/haxe-${VERSIONS.haxe}`

  if (process.platform === 'darwin') {
    return `${baseUrl}-osx.tar.gz`
  } else if (process.platform === 'win32') {
    return `${baseUrl}-win.zip`
  } else if (process.platform === 'linux' && process.arch === 'x64') {
    return `${baseUrl}-linux64.tar.gz`
  } else if (process.platform === 'linux') {
    return `${baseUrl}-linux32.tar.gz`
  } else {
    throw `Error: Unknown or unsupported platform: ${process.platform} ${process.arch}`
  }
}

function nekoDownloadUrl() {
  if (process.platform === 'win32') {
    return `http://nekovm.org/media/neko-${VERSIONS.neko}-win.zip`
  }
}

function downloadDependencies() {
  const files = [
    { name: 'Git', dest: 'git/git', url: gitDownloadUrl() },
    { name: 'Haxe', dest: 'haxe/haxe', url: haxeDownloadUrl() },
    { name: 'Neko', dest: 'haxe/neko', url: nekoDownloadUrl() }
  ].filter(dl => dl.url)

  const downloads = files.map(file => download(file.url, `${__dirname}/../dependencies/${file.dest}`))
  displayDownloadProgress(files, downloads)

  return Promise.all(downloads)
}

function displayDownloadProgress(files, downloads) {
  const progress = files.map(({ name }) => ({ name, received: 0 }))

  function displayBytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + 'MB'
  }

  function write() {
    const progressDisplay = progress.map(prog => `${prog.name}: ${displayBytes(prog.received)}`).join(', ')

    readline.clearLine()
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(`Downloading (${progressDisplay}) ...`)
  }

  const logger = throttle(write, 500)

  downloads.forEach((dl, index) => {
    dl.on('data', data => {
      progress[index].received += data.length
      logger()
    })
  })
}

downloadDependencies()
