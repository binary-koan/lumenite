<style>
  main {
    height: 100%;
  }

  main {
    display: flex;
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
  import LandingPages from './components/landing-pages/LandingPages'
  import Sidebar from './components/sidebar/Sidebar'
  import BenchBuild from './components/bench-build/BenchBuild'
  import Tabs from './components/tabs/Tabs'
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
