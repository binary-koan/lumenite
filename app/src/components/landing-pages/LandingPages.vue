<style lang="stylus" scoped>
  @import '../../styles/mixins/all';

  .landing-pages {
    fixed-fill()
    row()
    content-center()
    items-center()
    background-default()
  }

  .page {
    width-upto(sm)
    padding-both(lg)
    spacing-vertical(lg)
  }

  .title {
    font-size(lg)
    font-weight-strong()
  }
</style>

<template>
  <div class="landing-pages">
    <div class="page">
      <landing-page></landing-page>
    </div>

    <div class="page hidden">
      <h1 class="title">Create Project</h1>
      <create-project-page></create-project-page>
    </div>
  </div>
</template>

<script>
  import LandingPage from './LandingPage'
  import CreateProjectPage from './CreateProjectPage'

  export default {
    name: 'landing-pages',
    components: {
      LandingPage,
      CreateProjectPage
    }
  }
</script>
