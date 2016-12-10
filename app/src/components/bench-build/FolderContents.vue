<style scoped>
  .folder-contents {
    padding-left: 1.25rem;
  }

  .title {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  .title > .icon {
    margin-right: 0.25rem;
  }

  .file {
    margin-left: 0.25rem;
  }

  .folder {
    margin-left: -1rem;
  }
</style>

<template>
  <ul class="folder-contents" v-show="entries && entries.length">
    <li v-for="entry in entries" class="fileOrFolder(entry)">
      <button class="title" @click="handleClick(entry)">
        <span :class="iconFor(entry)"></span> {{ entry.name }}
      </button>

      <folder-contents :entries="entry.children"></folder-contents>
    </li>
  </ul>
</template>

<script>
  import find from 'lodash/find'

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
