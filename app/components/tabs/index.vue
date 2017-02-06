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
</style>

<template>
  <el-tabs class="tabs" type="card" :closable="true" :value="selectedIndex.get().toString()" @change="selectedIndex.set">
    <el-tab-pane v-for="(tab, index) in tabs" :name="index.toString()" class="tab-pane">
      <span slot="label">
        <span class="icon tab-icon color-icon" style="background-color: #ff0"></span>
        <span class="title">{{ tab.title }}</span>
      </span>
      <tab-content :tab="tab"></tab-content>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import types from 'app/store/tabs/types'
  import { modelFromStore2 } from 'app/helpers/vuex-helpers'

  import TabContent from './tab-content'

  export default {
    name: 'tabs',
    computed: {
      tabs() {
        return this.$store.state.tabs.tabs
      },
      selectedIndex() {
        return modelFromStore2('tabs.selectedIndex', types.SELECT_TAB, this.$store)
      }
    },
    methods: {
      isActive(index) {
        return this.$store.state.tabs.selectedIndex === index
      }
    },
    components: {
      TabContent
    }
  }
</script>
