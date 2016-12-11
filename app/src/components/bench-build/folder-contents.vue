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
</style>

<template>
  <ul class="folder-contents" v-show="entries && entries.length">
    <li v-for="entry in entries" :class="fileOrFolder(entry)">
      <button class="title" @click="handleClick(entry)">
        <span :class="iconFor(entry)"></span> {{ entry.name }}
      </button>

      <folder-contents :entries="entry.children"></folder-contents>
    </li>
  </ul>
</template>

<script>
  import types from 'src/store/file-tree/types'

  export default {
    name: 'folder-contents',
    props: ['entries'],
    methods: {
      fileOrFolder(entry) {
        return Array.isArray(entry.children) ? 'folder' : 'file'
      },

      iconFor(entry) {
        if (entry.type) {
          return `icon file-icon-${entry.type}`
        } else if (Array.isArray(entry.children)) {
          return entry.expanded ? 'icon icon-sort-down' : 'icon icon-sort-right'
        }
      },

      toggleFolder(folder) {
        this.$store.dispatch(types.TOGGLE_FOLDER, folder.path)
      }
    }
  }
</script>
