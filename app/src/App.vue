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
    background: #222;
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
    <landing-page></landing-page>
  </main>
</template>

<script>
  import LandingPage from './components/LandingPageView'
  import Sidebar from './components/sidebar/Sidebar'
  import BenchBuild from './components/bench-build/BenchBuild'
  import store from './store/store'

  export default {
    components: {
      Sidebar,
      BenchBuild,
      LandingPage
    },
    store
  }
</script>
