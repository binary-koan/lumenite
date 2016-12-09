const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const childProcess = require('child_process')

const paths = require('./paths')
const expectedVersions = require('./versions')

const currentVersions = fs.existsSync(paths.versions) ? fs.readJsonSync(paths.versions) : {}

function gitExists() {
  const result = childProcess.spawnSync('git --version')
  return result.status === 0 || currentVersions.git === expectedVersions.git
}

function gitDownloadUrl() {
  if (process.platform === 'win32') {
    const baseUrl = `https://github.com/git-for-windows/git/releases/download/v${expectedVersions.git}.windows.1/PortableGit-${expectedVersions.git}`

    if (process.arch === 'x64') {
      return `${baseUrl}-64-bit.7z.exe`
    } else {
      return `${baseUrl}-32-bit.7z.exe`
    }
  }
}

function gitDownloadConfig() {
  if (!gitExists()) {
    if (process.platform === 'win32') {
      return {
        id: 'git',
        name: 'Git',
        url: gitDownloadUrl(),
        destination: paths.dependencies,
        extract: false,
        afterDownload(dl) {
          const filePath = path.resolve(dl.destination, path.basename(dl.url))
          childProcess.execFileSync(filePath, ['-y', '-gm2'])
        }
      }
    } else {
      throw 'Git is required. Please install it using your app store or package manager.'
    }
  }
}

// NOTE to run haxelib with local config file, maybe just run it with USERPROFILE and HOME env vars set?

function haxeExists() {
  return currentVersions.haxe === expectedVersions.haxe
}

function haxeDownloadUrl() {
  const baseUrl = `https://github.com/HaxeFoundation/haxe/releases/download/${expectedVersions.haxe}/haxe-${expectedVersions.haxe}`

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

function haxeDownloadConfig() {
  if (!haxeExists()) {
    return {
      id: 'haxe',
      name: 'Haxe',
      url: haxeDownloadUrl(),
      destination: paths.temp,
      extract: true,
      afterDownload(dl) {
        const copyFrom = glob.sync(path.resolve(dl.destination, 'haxe-*/*'))
        copyFrom.forEach(file => {
          fs.copySync(file, path.resolve(paths.haxe, path.basename(file)), { clobber: true })
        })
      }
    }
  }
}

function nekoExists() {
  return currentVersions.neko === expectedVersions.neko
}

function isNekoRequired() {
  return process.platform === 'win32'
}

function nekoDownloadConfig() {
  if (isNekoRequired() && !nekoExists()) {
    return {
      id: 'neko',
      name: 'Neko',
      url: `http://nekovm.org/media/neko-${expectedVersions.neko}-win.zip`,
      destination: paths.temp,
      extract: true,
      afterDownload(dl) {
        const copyFrom = glob.sync(path.resolve(dl.destination, 'neko-*/neko.dll'))
        fs.copySync(copyFrom[0], path.resolve(paths.haxe, 'neko.dll'), { clobber: true })
      }
    }
  }
}

module.exports = {
  currentVersions,
  gitDownloadConfig,
  haxeDownloadConfig,
  nekoDownloadConfig
}
