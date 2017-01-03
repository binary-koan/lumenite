import { CORE_FOLDERS } from '../paths'

const SCENE_FILE = {
  id: 'scene',
  root: CORE_FOLDERS.scenes,

  create: {
    buildWrapper({ name }) {
      return {}
    }
  }
}

export default [SCENE_FILE]
