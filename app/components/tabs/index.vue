<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .tabs {
    flex: 1
    flex-layout: column
  }

  .tab-bar {
    flex-layout: row
    margin-top: $gap-xsmall
    margin-left: $gap-xsmall
  }

  .tab-pane {
    flex: 1
    margin: $gap-xsmall
    margin-top: 0
    padding: $gap-small
    background: $fill-darken
    overflow: auto
  }
</style>

<template>
  <div class="tabs">
    <div class="tab-bar">
      <tab v-for="(tab, index) in tabs" :is-active="isActive(index)" :tab="tab" :index="index"></tab>
    </div>
    <div v-for="(tab, index) in tabs" class="tab-pane" v-show="isActive(index)">
      <tab-pane :tab="tab"></tab-pane>
    </div>
  </div>
</template>

<script>
  import Tab from './tab'
  import TabPane from './tab-pane'

  export default {
    name: 'tabs',
    computed: {
      tabs() {
        return this.$store.state.tabs.tabs
      }
    },
    methods: {
      isActive(index) {
        return this.$store.state.tabs.selectedIndex === index
      }
    },
    components: {
      Tab,
      TabPane
    }
  }
</script>
