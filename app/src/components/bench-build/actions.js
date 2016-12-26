import electron from 'electron'

import types from 'src/store/file-tree/types'
import { CORE_FOLDERS } from 'src/filesystem/paths'

const { dialog, Menu, MenuItem } = electron.remote

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
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.behaviours) }
]

export const scenesActions = [
  { icon: 'add', run: addFileAction(CORE_FOLDERS.scenes) },
  { icon: 'add-folder', run: addFolderAction(CORE_FOLDERS.scenes) }
]

export function fileContextMenu(path) {
  const menu = new Menu()
  menu.append(new MenuItem({ label: 'New File' }))
  menu.append(new MenuItem({ label: 'New Folder' }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ label: 'Rename' }))
  menu.append(new MenuItem({ label: 'Duplicate' }))
  menu.append(new MenuItem({ label: 'Delete' }))
  return menu
}
