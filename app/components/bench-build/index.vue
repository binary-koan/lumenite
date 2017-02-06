<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .bench-build {
    width: $bench-width-default
    margin: $gap-xsmall
    margin-left: 0
    padding: $gap-xsmall $gap-small
    border-radius: $border-radius-base
    background: $fill-darken
  }
</style>

<template>
  <div class="bench-build">
    <el-tree
      :data="treeData"
      :props="{ label: 'displayName', children: 'children' }"
      :render-content="renderNode"
      @node-click="expandFolder"></el-tree>
  </div>
</template>

<script>
  import find from 'lodash/find'
  import constant from 'lodash/constant'

  import types from 'app/store/file-tree/types'
  import TreeNode from './tree-node'
  import { settingsActions, assetsActions, behavioursActions, scenesActions } from './actions'

  export default {
    name: 'bench-build',
    computed: {
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

      expandFolder(data, node) {
        let path = [node.data.name]
        while (node.parent) {
          node = node.parent
          path.unshift(node.data.name)
        }

        this.$store.dispatch(types.TOGGLE_FOLDER, { path: path.filter(Boolean) })
      }
    }
  }
</script>
