const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const childProcess = require('child_process')

const paths = require('./paths')
const expectedVersions = require('./versions')

const currentVersions = fs.existsSync(paths.versions) ? fs.readJsonSync(paths.versions) : {}

function gitExists() {
  try {
    childProcess.execSync('git --version');
    return true;
  } catch (e) {
    if (e.includes("command not found")) {
      return false;
    } else {
      throw e;
    }
  }
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

module.exports = {
  currentVersions,
  gitDownloadConfig
}
