import electron from 'electron'

import types from 'src/store/file-tree/types'
import { CORE_FOLDERS } from 'src/filesystem/paths'

const { dialog, Menu, MenuItem } = electron.remote

function importFilesAction(path) {
  return (component) => {
    const files = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })

    if (files && files.length) {
      component.$store.dispatch(types.IMPORT_FILES, { files, root: path })
    }
  }
}

function addFolderAction(path) {
  return (component) => {
    component.$store.commit(types.START_ADD_FOLDER, path)
  }
}

function addFileAction(path) {
  return (component) => {
    component.$store.commit(types.START_ADD_FILE, path)
  }
}

export function basicActionsForFolder(folder, path) {
  const actions = []

  if (folder.properties.importFiles) {
    actions.push({ icon: 'import', run: importFilesAction(path) })
  }

  if (folder.properties.createFiles) {
    actions.push({ icon: 'add', run: addFileAction(path) })
  }

  if (folder.properties.createFolders) {
    actions.push({ icon: 'add-folder', run: addFolderAction(path) })
  }

  return actions
}

export const settingsActions = []

export const assetsActions = [
  // { icon: 'import', run: importFiles },
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
