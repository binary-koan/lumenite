<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .tabs {
    flex: 1
    flex-layout: column
  }
</style>

<template>
  <div class="tabs">
    <tab-bar></tab-bar>
    <tab v-for="(tab, index) in tabs" v-show="isActive(index)" :tab="tab"></tab>
  </div>
</template>

<script>
  import TabBar from './tab-bar'
  import Tab from './tab'

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
      TabBar,
      Tab
    }
  }
</script>
