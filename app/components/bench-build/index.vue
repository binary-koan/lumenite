<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .bench-build {
    width: $bench-width-default
    margin: $gap-xsmall
    padding-top: $gap-xsmall
    border-radius: $border-radius-base
    background: $fill-darken
  }
</style>

<template>
  <div class="bench-build">
    <top-level-item :base-folder="settingsFolder"></top-level-item>
    <top-level-item :base-folder="assetsFolder"></top-level-item>
    <top-level-item :base-folder="behavioursFolder"></top-level-item>
    <top-level-item :base-folder="scenesFolder"></top-level-item>
  </div>
</template>

<script>
  import find from 'lodash/find'
  import constant from 'lodash/constant'

  import TopLevelItem from './top-level-item'
  import { settingsActions, assetsActions, behavioursActions, scenesActions } from './actions'

  export default {
    name: 'bench-build',
    computed: {
      settingsFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Settings')
      },

      assetsFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Assets')
      },

      behavioursFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Behaviours')
      },

      scenesFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Scenes')
      }
    },
    components: {
      TopLevelItem
    }
  }
</script>
