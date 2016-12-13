import tape from 'tape'
import through from 'through'
import electron from 'electron'

const ipc = electron.ipcRenderer

// Write console output back to the server via its ipc connection.
const nativeConsole = {}

const consoleMethods = ['error', 'info', 'log', 'debug', 'warn']
consoleMethods.forEach(method => {
  const nativeMethod = console[method]
  nativeConsole[method] = nativeMethod.bind(console)

  console[method] = (...args) => {
    ipc.send('console', JSON.stringify([method].concat(args)))
    return nativeMethod(...args)
  }
})

// Notify the server if an unhandled exception occurs so that the exit code is correct
window.onerror = (message, file, line, column) => {
  ipc.send('error', `${message} (from ${file}:${line}:${column})`)
}

// Force output to console (the tape default is to use fs.writeSync on Windows, whcih doesn't work
// with electron). Based on https://github.com/substack/tape/blob/995ddb/lib/default_stream.js
function consoleStream() {
  let line = ''
  const stream = through(write, flush)

  function write(buf) {
    for (let i = 0; i < buf.length; i++) {
      const c = typeof buf === 'string'
          ? buf.charAt(i)
          : String.fromCharCode(buf[i])
      if (c === '\n') flush()
      else line += c
    }
  }

  function flush() {
    console.log(line)
    line = ''
  }

  return stream
}

// And another annoying workaround - unless autoclose is explicitly set, Tape assumes it can listen
// for process.on('exit') to write the test summary. In the renderer, it doesn't work that way
const harness = tape.createHarness({ autoclose: true })
harness.createStream().pipe(consoleStream())

// Notify the server when tests finish to signal that the browser should be closed
harness.onFinish(() => ipc.send('tests-finished'))

// Now load all the tests in the 'unit' folder
const req = require.context('../../unit', true, /\.js$/)
req.keys().forEach(key => req(key).default(harness))
