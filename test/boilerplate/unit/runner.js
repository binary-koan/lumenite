'use strict'

const electron = require('electron')
const path = require('path')
const glob = require('glob')
const tape = require('tape')
const execSync = require('child_process').execSync

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const remote = electron.remote

//TODO remove when electron upgrades to Chrome >= 55
app.commandLine.appendSwitch('js-flags', '--harmony_async_await')

function done(error) {
  if (error) {
    app.exit(1)
  } else {
    app.quit()
  }
}

app.on('ready', () => {
  const win = new BrowserWindow({ width: 800, height: 600 })
  const html = 'file://' + path.resolve(__dirname, 'dist/index.html')

  ipc.on('error', (_, error) => {
    console.error('Browser error: ', error)

    setTimeout(() => {
      win.destroy()
      done(error)
    }, 500)
  })

  ipc.on('tests-finished', () => {
    setTimeout(() => {
      win.destroy()
      done()
    }, 1000)
  })

  ipc.on('console', (_, args) => {
    let [method, message] = JSON.parse(args)
    console[method](message)
  })

  win.loadURL(html)
})
