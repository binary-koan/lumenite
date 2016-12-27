import electron from 'electron'

import types from 'src/store/file-tree/types'
import { CORE_FOLDERS } from 'src/filesystem/paths'

const { dialog, Menu, MenuItem } = electron.remote

function importFilesAction(path) {
  return (component) => {
    const files = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })

    if (files && files.length) {
      component.$store.dispatch(types.IMPORT_FILES, { files, path })
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

function fileManagerName() {
  if (process.platform === 'win32') {
    return 'Explorer'
  } else if (process.platform === 'darwin') {
    return 'Finder'
  } else {
    return 'File Browser'
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

export function fileContextMenu(enclosingFolder, path) {
  const menu = new Menu()

  if (enclosingFolder.properties.importFiles) {
    menu.append(new MenuItem({ label: 'Import Files' }))
  }

  if (enclosingFolder.properties.createFiles) {
    menu.append(new MenuItem({ label: 'New File' }))
  }

  if (enclosingFolder.properties.createFolders) {
    menu.append(new MenuItem({ label: 'New Folder' }))
  }

  if (enclosingFolder.properties.fileOperations) {
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'Rename' }))
    menu.append(new MenuItem({ label: 'Duplicate' }))
    menu.append(new MenuItem({ label: 'Delete' }))
  }

  if (menu.items.length) {
    menu.append(new MenuItem({ type: 'separator' }))
  }

  menu.append(new MenuItem({ label: `Show in ${fileManagerName()}` }))
  return menu
}
