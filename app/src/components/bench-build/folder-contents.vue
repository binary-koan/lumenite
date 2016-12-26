<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .file,
  .folder {
    flex-layout: column
  }

  .file {
    margin-left: $gap-xs
  }

  .folder {
    margin-left: -($gap-lg)
  }

  .title {
    flex-layout: row
    align-items: center
    padding: $gap-sm 0
    background: transparent
    stateful-color: $color-muted
  }

  .title > .icon {
    margin-right: $gap-xs
  }

  .folder-contents {
    padding-left: $folder-contents-gap
  }

  .empty {
    padding-top: $gap-sm
    padding-bottom: $gap-sm
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
        <!-- TODO -->
        <span>
          <button class="title" @click="handleClick(entry)">
            <span :class="iconFor(entry)"></span> {{ entry.displayName }}
          </button>
          <button class="action" @click="handleClick(entry)">
            <span class="icon-add"></span>
          </button>
        </span>

        <folder-contents v-show="entry.expanded" :entries="entry.children" :parent-path="entryPath(entry)"></folder-contents>
      </template>
      <template v-else>
        <button class="title" @click="handleClick(entry)">
          <span :class="iconFor(entry)"></span> {{ entry.displayName }}
        </button>
      </template>
    </li>
  </ul>
</template>

<script>
  import isEqual from 'lodash/isEqual'

  import { modelFromStore } from 'src/helpers/vuex-helpers'
  import types from 'src/store/file-tree/types'

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
      }
    }
  }
</script>
