<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .top-level {
    flex-layout: row
    border-radius: $border-radius-base
    child-radius-horizontal: $border-radius-base
    background-color: $fill-base
    color: $font-color-base

    > * {
      padding: $gap-small
      stateful-background: $fill-base
      margin-left: 0
    }

    > .title {
      flex: 1
    }

    &:not(:hover) > .action {
      opacity: 0
    }
  }

  .icon {
    margin-right: $gap-xsmall
  }
</style>

<template>
  <span :class="{ 'top-level': isTopLevel }">
    <span class="title"><span :class="icon"></span>{{ data.displayName }}</span>
    <el-button v-for="action in actions" class="action" @click="action.run">
      <span :class="'icon action-icon-' + action.icon"></span>
    </el-button>
  </span>
</template>

<script>
  import { basicActionsForFolder } from './actions'

  export default {
    name: 'tree-node',
    props: ['data', 'isTopLevel', 'expanded'],
    computed: {
      isFolder() {
        return Array.isArray(this.data.children)
      },

      icon() {
        if (this.data.type) {
          return `icon file-icon-${this.data.type}`
        } else if (this.isTopLevel) {
          return `icon top-level-icon-${this.data.icon}`
        } else if (this.isFolder) {
          return this.expanded ? 'icon icon-sort-down' : 'icon icon-sort-right'
        }
      },

      actions() {
        return this.isTopLevel ? basicActionsForFolder(this.data, [this.data.name]) : []
      }
    }
  }
</script>
