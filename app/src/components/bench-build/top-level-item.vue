<style scoped>
  .top-level-item {
    display: flex;
    margin: 0.75rem;
    border-radius: 3px;
    background: #333;
  }

  .top-level-item.expanded {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  .top-level-item > *:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .top-level-item > *:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .top-level-item > button {
    padding: 0.5rem;
    background-color: #333;
    color: white;
    transition: background-color 0.2s;
  }

  .top-level-item > button:hover {
    background-color: #444;
  }

  .top-level-item > button:active {
    background-color: #111;
  }

  .top-level-item > .title {
    flex: 1;
    padding: 0.5rem;
    text-align: left;
  }

  .top-level-item + .folder-contents {
    padding-left: 2.25rem;
  }

  .empty {
    padding-left: 2.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-style: italic;
    opacity: 0.6;
  }
</style>

<template>
  <div>
    <div class="top-level-item" :class="{ expanded: baseFolder.expanded }">
      <button class="title" @click="toggleFolder(baseFolder)">
        <span :class="'icon top-level-icon-' + baseFolder.icon"></span> {{ baseFolder.name }}
      </button>
      <button v-show="baseFolder.expanded" v-for="action in actions" class="action">
        <span :class="'icon action-icon-' + action.icon"></span>
      </button>
    </div>

    <folder-contents :entries="baseFolder.children"></folder-contents>
    <div v-show="baseFolder.expanded && !baseFolder.children.length" class="empty">
      (Empty)
    </div>
  </div>
</template>

<script>
  import find from 'lodash/find'

  import FolderContents from './folder-contents'

  import types from 'src/store/file-tree/types'

  export default {
    name: 'top-level-item',
    props: ['baseFolder', 'actions'],
    methods: {
      toggleFolder(folder) {
        this.$store.dispatch(types.TOGGLE_FOLDER, folder.path)
      }
    },
    components: {
      FolderContents
    }
  }
</script>
