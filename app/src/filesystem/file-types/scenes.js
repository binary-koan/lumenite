import { CORE_FOLDERS } from '../paths'

import SceneEditor from 'src/components/editors/scenes/scene'

export const SCENE_FILE = {
  id: 'scene',
  root: CORE_FOLDERS.scenes,
  editor: SceneEditor,

  create: {
    buildWrapper({ name }) {
      return {}
    }
  }
}
