<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .top-level-item {
    flex-layout: row
    margin: $gap-md
    stateful-background: $background-default
    child-radius-horizontal: $radius-sm
  }

  .top-level-item.expanded {
    margin-bottom: $gap-xs
    font-weight: $font-weight-medium
  }

  .top-level-item > button {
    padding: $gap-sm
    stateful-background: $background-default
    color: $color-default
  }

  .top-level-item > .title {
    flex: 1
    padding: $gap-sm
    text-align: left
  }

  .top-level-item > .action {
    display: block
    visibility: hidden
    opacity: 0
    transition: all 0.2s
  }

  .top-level-item:hover > .action {
    visibility: visible
    opacity: 1
  }

  .top-level-item + .folder-contents {
    padding-left: ($folder-contents-gap + $gap-md)
    padding-right: $gap-md
  }
</style>

<template>
  <div>
    <div class="top-level-item" :class="{ expanded: baseFolder.expanded }">
      <button class="title" @click="toggleFolder(baseFolder)">
        <span :class="'icon top-level-icon-' + baseFolder.icon"></span> {{ baseFolder.displayName }}
      </button>
      <button v-for="action in actions" @click="runAction(action)" class="action">
        <span :class="'icon action-icon-' + action.icon"></span>
      </button>
    </div>

    <folder-contents v-show="baseFolder.expanded" :entries="baseFolder.children" :parent-path="[baseFolder.name]"></folder-contents>
  </div>
</template>

<script>
  import FolderContents from './folder-contents'

  import types from 'src/store/file-tree/types'

  export default {
    name: 'top-level-item',
    props: ['baseFolder', 'actions'],
    methods: {
      toggleFolder(folder) {
        this.$store.dispatch(types.TOGGLE_FOLDER, { path: [folder.name] })
      },

      runAction(action) {
        action.run(this)
      }
    },
    components: {
      FolderContents
    }
  }
</script>
