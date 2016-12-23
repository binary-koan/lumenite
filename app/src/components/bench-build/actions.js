import electron from 'electron'

import types from 'src/store/file-tree/types'
import { CORE_FOLDERS } from 'src/filesystem/paths'

const { dialog } = electron.remote

function importFiles(component) {
  const files = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })

  if (files && files.length) {
    component.$store.dispatch(types.IMPORT_FILES, { files, root: CORE_FOLDERS.assets })
  }
}

function addFolderAction(root) {
  return (component) => {
    component.$store.commit(types.START_ADD_FOLDER, [root])
  }
}

function addFileAction(root) {
  return (component) => {
    component.$store.commit(types.START_ADD_FILE, [root])
  }
}

export const settingsActions = []

export const assetsActions = [
  { icon: 'import', run: importFiles },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.assets) }
]

export const behavioursActions = [
  { icon: 'add', run: addFileAction(CORE_FOLDERS.behaviours) },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.assets) }
]

export const scenesActions = [
  { icon: 'add', run: addFileAction(CORE_FOLDERS.behaviours) },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.assets) }
]