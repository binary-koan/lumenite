<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .bench-build {
    width: $bench-width-default
    margin: $gap-xsmall $gap-xsmall 0 0
    padding: $gap-xsmall $gap-small
    border-radius: $border-radius-base $border-radius-base 0 0
    background: $fill-darken
  }

  .title {
    padding: $gap-large $gap-small $gap-medium $gap-small
    text-transform: uppercase
    color: $color-muted
  }
</style>

<template>
  <div class="bench-build">
    <h2 class="title">{{ projectName }}</h2>

    <el-tree
      :data="treeData"
      :props="{ label: 'displayName', children: 'children' }"
      :render-content="renderNode"
      @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  import find from 'lodash/find'
  import constant from 'lodash/constant'

  import types from 'app/store/file-tree/types'
  import tabTypes from 'app/store/tabs/types'

  import TreeNode from './tree-node'
  import { settingsActions, assetsActions, behavioursActions, scenesActions } from './actions'

  export default {
    name: 'bench-build',
    computed: {
      projectName() {
        return this.$store.state.activeProject.name
      },

      treeData() {
        return this.$store.state.fileTree.baseFolders
      }
    },
    methods: {
      renderNode(h, { node }) {
        return h(TreeNode, {
          props: { data: node.data, isTopLevel: !node.parent.parent, expanded: node.expanded }
        })
      },

      handleNodeClick(data, node) {
        let path = [node.data.name]
        while (node.parent) {
          node = node.parent
          if (node.data.name) path.unshift(node.data.name)
        }

        if (Array.isArray(data.children)) {
          this.expandFolder(path)
        } else {
          this.openFile(data, path)
        }
      },

      expandFolder(path) {
        this.$store.dispatch(types.TOGGLE_FOLDER, { path })
      },

      openFile(data, path) {
        this.$store.dispatch(tabTypes.OPEN_FILE, { path, file: data })
      }
    }
  }
</script>
