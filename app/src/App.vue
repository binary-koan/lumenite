<style>
  html,
  body,
  main {
    height: 100%;
  }

  html {
    font-family: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 300;
  }

  body {
    background: #333;
    color: #eee;
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
    <landing-page></landing-page>
  </main>
</template>

<script>
  import LandingPage from './components/landing-page/LandingPage'
  import Sidebar from './components/sidebar/Sidebar'
  import BenchBuild from './components/bench-build/BenchBuild'
  import Tabs from './components/tabs/Tabs'
  import store from './store/store'

  export default {
    components: {
      LandingPage,
      Sidebar,
      BenchBuild,
      Tabs
    },
    store
  }
</script>
