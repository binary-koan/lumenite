<style lang="stylus">
  @import '~src/styles/definitions'

  main {
    height: 100%
    flex-layout: row
  }
</style>

<template>
  <main>
    <sidebar></sidebar>
    <bench-build></bench-build>
    <tabs></tabs>
    <landing-pages :class="{ hidden: landingPagesHidden }"></landing-pages>
  </main>
</template>

<script>
  import LandingPages from './components/landing-pages'
  import Sidebar from './components/sidebar'
  import BenchBuild from './components/bench-build'
  import Tabs from './components/tabs'
  import store from './store/store'

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
