import { CORE_FOLDERS } from '../paths'

const SCRIPT_FILE = {
  id: 'script',
  root: CORE_FOLDERS.behaviours,

  import: {
    matchers: ['*.ts', '*.js'],
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  },

  create: {
    buildWrapper({ name }) {
      return {
        source: `${name}.ts`
      }
    },
    buildExtraFiles({ name }) {
      return [
        { filename: `${name}.ts`, content: '' }
      ]
    }
  }
}

export default [SCRIPT_FILE]
