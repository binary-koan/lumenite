<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  main {
    height: 100%
    flex-layout: row
  }

  .tabs {
    flex: 1
  }
</style>

<template>
  <main>
    <sidebar></sidebar>
    <bench-build></bench-build>
    <tabs class="tabs"></tabs>
    <landing-pages :class="{ hidden: landingPagesHidden }"></landing-pages>
  </main>
</template>

<script>
  import LandingPages from './landing-pages'
  import Sidebar from './sidebar'
  import BenchBuild from './bench-build'
  import Tabs from './tabs'
  import store from '../store/store'

  export default {
    computed: {
      landingPagesHidden() {
        return Boolean(this.$store.state.activeProject.path)
      }
    },
    components: {
      LandingPages,
      Sidebar,
      BenchBuild,
      Tabs
    },
    store
  }
</script>
