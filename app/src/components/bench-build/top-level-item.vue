<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .top-level-item {
    flex-layout: row
    margin: $gap-md
    background: $background-default
    border-radius: $radius-sm
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
    padding-right: $gap-md
  }
</style>

<template>
  <div>
    <div class="top-level-item" :class="{ expanded: baseFolder.expanded }">
      <button class="title" @click="toggleFolder">
        <span :class="'icon top-level-icon-' + baseFolder.icon"></span> {{ baseFolder.displayName }}
      </button>
      <button v-for="action in actions" @click="runAction(action)" class="action">
        <span :class="'icon action-icon-' + action.icon"></span>
      </button>
    </div>

    <folder-contents v-show="baseFolder.expanded" :folder="baseFolder" :folder-path="[baseFolder.name]"></folder-contents>
  </div>
</template>

<script>
  import FolderContents from './folder-contents'

  import types from 'src/store/file-tree/types'
  import { basicActionsForFolder } from './actions'

  export default {
    name: 'top-level-item',
    props: ['baseFolder'],
    computed: {
      actions() {
        return basicActionsForFolder(this.baseFolder, [this.baseFolder.name])
      }
    },
    methods: {
      toggleFolder() {
        this.$store.dispatch(types.TOGGLE_FOLDER, { path: [this.baseFolder.name] })
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
