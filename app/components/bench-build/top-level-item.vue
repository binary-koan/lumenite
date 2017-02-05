<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .top-level-item {
    flex-layout: row
    margin: $gap-medium
    background: $fill-base
    border-radius: $border-radius-base
    child-radius-horizontal: $border-radius-base
  }

  .top-level-item.expanded {
    margin-bottom: $gap-xsmall
    font-weight: $font-weight-medium
  }

  .top-level-item > button {
    padding: $gap-small
    stateful-background: $fill-base
    color: $font-color-base
  }

  .top-level-item > .title {
    flex: 1
    padding: $gap-small
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
    padding-right: $gap-medium
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

  import types from 'app/store/file-tree/types'
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
