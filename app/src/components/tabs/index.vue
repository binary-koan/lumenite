<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .tabs {
    flex: 1
    flex-layout: column
  }

  .tab-bar {
    flex-layout: row
    background-color: $background-darken
  }
</style>

<template>
  <div class="tabs">
    <div class="tab-bar">
      <tab v-for="(tab, index) in tabs" :is-active="isActive(index)" :tab="tab" :index="index"></tab>
    </div>
    <tab-pane v-for="(tab, index) in tabs" v-show="isActive(index)" :tab="tab"></tab-pane>
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
