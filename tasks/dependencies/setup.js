const fs = require('fs-extra')
const path = require('path')
const download = require('download')
const readline = require('readline')
const throttle = require('lodash/throttle')

const check = require('./check')
const paths = require('./paths')
const expectedVersions = require('./versions')

function downloads() {
  return [check.gitDownloadConfig(), check.haxeDownloadConfig(), check.nekoDownloadConfig()]
    .filter(Boolean)
    .map(dl => Object.assign(dl, {
      download: download(dl.url, dl.destination, { extract: dl.extract })
    }))
}

function displayDownloadProgress(dls) {
  const progress = dls.map(({ name }) => ({ name, received: 0 }))

  function displayBytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + 'MB'
  }

  function write() {
    const progressDisplay = progress.map(prog => `${prog.name}: ${displayBytes(prog.received)}`).join(', ')

    readline.clearLine()
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(`Downloading and extracting (${progressDisplay}) ...`)
  }

  const logger = throttle(write, 500)

  dls.forEach((dl, index) => {
    dl.download.on('data', data => {
      progress[index].received += data.length
      logger()
    })
  })
}

function fetchDependencies() {
  const dls = downloads()
  displayDownloadProgress(dls)

  const waitForDownloads = Promise.all(dls.map(dl => dl.download))

  return waitForDownloads.then(() => dls)
}

function runAfterDownloadTasks(dls) {
  console.log('\nFixing directory structure ...')

  return dls.map(dl => {
    if (dl.afterDownload) {
      dl.afterDownload(dl)
    }

    return dl
  })
}

function writeVersions(dls) {
  const versions = check.currentVersions
  dls.forEach(dl => versions[dl.id] = expectedVersions[dl.id])

  fs.writeJsonSync(paths.versions, versions)
}

fetchDependencies()
  .then(runAfterDownloadTasks)
  .then(writeVersions)
  .then(() => console.log('Done.'))
  .catch(e => {
    console.log(e.message)
    console.log(e.stack)
  })
