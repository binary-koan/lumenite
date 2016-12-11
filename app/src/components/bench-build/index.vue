<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .bench-build {
    width: $bench-width-default
    padding-top: $gap-xs
    background: $background-darken
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
        return [{ icon: 'add' }, { icon: 'add-folder' }, { icon: 'more' }]
      },

      scenesFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Scenes')
      },

      scenesActions() {
        return [{ icon: 'add' }, { icon: 'add-folder' }, { icon: 'more' }]
      }
    },
    components: {
      TopLevelItem
    }
  }
</script>
