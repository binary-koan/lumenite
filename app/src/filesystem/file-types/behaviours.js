import { CORE_FOLDERS } from '../paths'

import ScriptEditor from 'src/components/editors/behaviours/script'

export const SCRIPT_FILE = {
  id: 'script',
  root: CORE_FOLDERS.behaviours,
  editor: ScriptEditor,

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
