<style scoped>
  .bench-build {
    width: 20rem;
    padding-top: 0.25rem;
    background: #222;
  }

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

  .folder-contents {
    padding-left: 1.25rem;
  }

  .file,
  .folder-title {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  .file > .icon,
  .folder-title > .icon {
    margin-right: 0.25rem;
  }

  .file {
    margin-left: 0.25rem;
  }

  .folder-title {
    margin-left: -1rem;
  }
</style>

<template>
  <div class="bench-build">
    <top-level-item :base-folder="settingsFolder" :actions="settingsActions"></top-level-item>
    <top-level-item :base-folder="assetsFolder" :actions="assetsActions"></top-level-item>
    <top-level-item :base-folder="behavioursFolder" :actions="behavioursActions"></top-level-item>
    <top-level-item :base-folder="scenesFolder" :actions="scenesActions"></top-level-item>
  </div>
</template>

<script>
  import find from 'lodash/find'

  import TopLevelItem from './top-level-item'

  import types from 'src/store/file-tree/types'

  export default {
    name: 'bench-build',
    computed: {
      settingsFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Settings')
      },

      settingsActions() {
        return [{ icon: 'more' }]
      },

      assetsFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Assets')
      },

      assetsActions() {
        return [{ icon: 'import' }, { icon: 'more' }]
      },

      behavioursFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Behaviours')
      },

      behavioursActions() {
        return [{ icon: 'add' }, { icon: 'add-folder'}, { icon: 'more' }]
      },

      scenesFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Scenes')
      },

      scenesActions() {
        return [{ icon: 'add' }, { icon: 'add-folder'}, { icon: 'more' }]
      }
    },
    components: {
      TopLevelItem
    }
  }
</script>
