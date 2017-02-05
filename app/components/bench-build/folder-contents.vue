<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .file,
  .folder {
    flex-layout: column
  }

  .title {
    padding: $gap-sm $gap-xs
    background: transparent
    stateful-color: $color-muted
    text-align: left
    user-select: none
  }

  .folder-contents {
    padding-left: $folder-contents-gap
  }

  .empty {
    padding-top: $gap-sm
    padding-bottom: $gap-sm
    padding-left: $folder-contents-gap
    font-style: italic
    color: $color-muted
    opacity: 0.7
    user-select: none
  }

  .editor {
    display: flex
    border: 1px solid $color-muted
    border-radius: $radius-sm
    margin: $gap-sm 0

    > input {
      flex: 1
      min-width: 0
    }

    > button {
      padding-left: $gap-sm
      padding-right: $gap-sm
      background: transparent
      opacity: 0.5

      &:hover {
        opacity: 1
      }
    }
  }
</style>

<template>
  <ul class="folder-contents">
    <li v-show="isEmpty()" class="empty" @contextmenu="showFolderContextMenu">
      (Empty)
    </li>

    <li v-if="isCreatingEntryHere()">
      <div class="editor">
        <input type="text" v-focus-on-create v-model="newEntryName" @keyup="commitOrCancelRename" />
        <button @click="commitRename"><span class="icon icon-checkmark"></span></button>
        <button @click="cancelRename"><span class="icon icon-cancel-2"></span></button>
      </div>
    </li>

    <li v-for="child in folder.children" :class="isFolder(child) ? 'folder' : 'file'">
      <template v-if="isFolder(child)">
        <button class="title" @click="toggleFolder(child)" @contextmenu="showFileContextMenu(child)">
          <span :class="iconFor(child)"></span> {{ child.displayName }}
        </button>

        <folder-contents v-show="child.expanded" :folder="child" :folder-path="entryPath(child)"></folder-contents>
      </template>
      <template v-else>
        <button class="title" @click="openFile(child)" @contextmenu="showFileContextMenu(child)">
          <span :class="iconFor(child)"></span> {{ child.displayName }}
        </button>
      </template>
    </li>
  </ul>
</template>

<script>
  import electron from 'electron'
  import isEqual from 'lodash/isEqual'

  import { keyCodes } from 'app/helpers/event-helpers'
  import { modelFromStore } from 'app/helpers/vuex-helpers'
  import types from 'app/store/file-tree/types'
  import tabTypes from 'app/store/tabs/types'

  import { fileContextMenu } from './actions'

  export default {
    name: 'folder-contents',
    props: ['folder', 'folderPath'],
    computed: {
      newEntryName: modelFromStore('fileTree.rename.newName', types.CONTINUE_RENAME),
    },
    methods: {
      isEmpty() {
        return !this.isCreatingEntryHere() && !this.folder.children.length
      },

      isCreatingEntryHere() {
        return this.$store.state.fileTree.rename.inProgress &&
          !this.$store.state.fileTree.rename.originalName &&
          isEqual(this.folderPath, this.$store.state.fileTree.rename.parentPath)
      },

      isFolder(entry) {
        return Array.isArray(entry.children)
      },

      iconFor(entry) {
        if (entry.type) {
          return `icon file-icon-${entry.type}`
        } else if (this.isFolder(entry)) {
          return entry.expanded ? 'icon icon-sort-down' : 'icon icon-sort-right'
        }
      },

      entryPath(entry) {
        return this.folderPath.concat(entry.name)
      },

      toggleFolder(folder) {
        this.$store.dispatch(types.TOGGLE_FOLDER, { path: this.entryPath(folder) })
      },

      openFile(file) {
        this.$store.dispatch(tabTypes.OPEN_FILE, { path: this.entryPath(file), file })
      },

      commitOrCancelRename(e) {
        if (e.keyCode === keyCodes.ENTER) {
          this.commitRename()
        } else if (e.keyCode === keyCodes.ESC) {
          this.cancelRename()
        }
      },

      commitRename() {
        this.$store.dispatch(types.COMMIT_RENAME)
      },

      cancelRename() {
        this.$store.commit(types.STOP_RENAME)
      },

      showFileContextMenu(entry) {
        fileContextMenu(this.folder, this.folderPath.concat([entry.name]))
          .popup(electron.remote.getCurrentWindow())
      },

      showFolderContextMenu() {
        fileContextMenu(this.folder, this.folderPath)
          .popup(electron.remote.getCurrentWindow())
      }
    }
  }
</script>
