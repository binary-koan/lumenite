<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .file,
  .folder {
    flex-layout: column
  }

  .title {
    flex-layout: row
    align-items: center
  }

  .title > button {
    padding: $gap-sm $gap-xs
    background: transparent
    stateful-color: $color-muted
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
    <li v-show="isEmpty()" class="empty">
      (Empty)
    </li>

    <li v-if="isCreatingEntryHere()">
      <div class="editor">
        <input type="text" v-focus-on-create v-model="newEntryName" />
        <button @click="commitRename"><span class="icon icon-checkmark"></span></button>
        <button @click="cancelRename"><span class="icon icon-cancel-2"></span></button>
      </div>
    </li>

    <li v-for="entry in entries" :class="isFolder(entry) ? 'folder' : 'file'">
      <template v-if="isFolder(entry)">
        <span class="title">
          <button @click="handleClick(entry)">
            <span :class="iconFor(entry)"></span> {{ entry.displayName }}
          </button>
          <button class="action" @click="handleClick(entry)">
            <span class="icon-add"></span>
          </button>
        </span>

        <folder-contents v-show="entry.expanded" :entries="entry.children" :parent-path="entryPath(entry)"></folder-contents>
      </template>
      <template v-else>
        <span class="title">
          <button @click="handleClick(entry)" @contextmenu="showFileContextMenu">
            <span :class="iconFor(entry)"></span> {{ entry.displayName }}
          </button>
        </span>
      </template>
    </li>
  </ul>
</template>

<script>
  import electron from 'electron'
  import isEqual from 'lodash/isEqual'

  import { modelFromStore } from 'src/helpers/vuex-helpers'
  import types from 'src/store/file-tree/types'
  import { fileContextMenu } from './actions'

  export default {
    name: 'folder-contents',
    props: ['entries', 'parentPath'],
    computed: {
      newEntryName: modelFromStore('fileTree.rename.newName', types.CONTINUE_RENAME),
    },
    methods: {
      isEmpty() {
        return !this.isCreatingEntryHere() && !this.entries.length
      },

      isCreatingEntryHere() {
        return this.$store.state.fileTree.rename.inProgress &&
          !this.$store.state.fileTree.rename.originalName &&
          isEqual(this.parentPath, this.$store.state.fileTree.rename.parentPath)
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
        return this.parentPath.concat(entry.name)
      },

      toggleFolder(folder) {
        this.$store.dispatch(types.TOGGLE_FOLDER, { path: this.entryPath(entry) })
      },

      commitRename() {
        this.$store.dispatch(types.COMMIT_RENAME)
      },

      cancelRename() {
        this.$store.commit(types.STOP_RENAME)
      },

      showFileContextMenu() {
        fileContextMenu([]).popup(electron.remote.getCurrentWindow())
      }
    }
  }
</script>
