import noop from 'lodash/noop'
import electron from 'electron'

import types from 'src/store/file-tree/types'
import { CORE_FOLDERS } from 'src/filesystem/paths'
import { BEHAVIOURS_SCHEMAS, SCENES_SCHEMAS } from 'src/filesystem/schemas'

const { dialog } = electron.remote

function importFiles(component) {
  const files = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })

  if (files && files.length) {
    component.$store.dispatch(types.IMPORT_FILES, { files, root: CORE_FOLDERS.assets })
  }
}

function addFolderAction(root) {
  return (component) => {
    component.$store.commit(types.START_ADD_FOLDER, { root })
  }
}

function addFileAction(root, fileType) {
  return (component) => {
    component.$store.commit(types.START_ADD_FILE, { root, fileType })
  }
}

export const settingsActions = [
  { icon: 'more', run: noop }
]

export const assetsActions = [
  { icon: 'import', run: importFiles },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.assets) },
  { icon: 'more', run: noop }
]

export const behavioursActions = [
  { icon: 'add', run: addFileAction(CORE_FOLDERS.behaviours, BEHAVIOURS_SCHEMAS.default) },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.assets) },
  { icon: 'more', run: noop }
]

export const scenesActions = [
  { icon: 'add', run: addFileAction(CORE_FOLDERS.behaviours, SCENES_SCHEMAS.default) },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.assets) },
  { icon: 'more', run: noop }
]
