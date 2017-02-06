<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .tabs {
    margin: $gap-xsmall
    margin-left: 0
  }

  .tab-pane {
    width: 100%
    height: 100%
  }

  .tab-label {
    flex-layout: row
    align-items: center
    height: 100%
    line-height: normal

    .tab-icon {
      margin-right: $gap-small
    }
  }

  .close {
    padding: $gap-small
    border: none
    background: transparent
    stateful-color: $color-muted
    cursor: pointer
  }

  .close .icon:before {
    content: '×'
    font-size: $font-size-large
  }
</style>

<template>
  <el-tabs class="tabs" type="card"
    :value="selected" @input="selected = $event">
    <el-tab-pane v-for="tab in tabs" :name="tab.id" class="tab-pane">
      <span slot="label" class="tab-label">
        <span class="icon tab-icon color-icon" style="background-color: #ff0"></span>
        <span class="title">{{ tab.title }}</span>
        <button class="close" @click="removeTab(tab.id, $event)"><span class="icon"></span></button>
      </span>
      <tab-content :tab="tab"></tab-content>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import types from 'app/store/tabs/types'
  import { modelFromStore, modelFromStore2 } from 'app/helpers/vuex-helpers'

  import TabContent from './tab-content'

  export default {
    name: 'tabs',
    computed: {
      tabs() {
        return this.$store.state.tabs.tabs
      },
      selected: modelFromStore('tabs.selected', types.SELECT_TAB)
    },
    methods: {
      removeTab(id, e) {
        e.stopPropagation()
        this.$store.commit(types.CLOSE_TAB, id)
      }
    },
    components: {
      TabContent
    }
  }
</script>
