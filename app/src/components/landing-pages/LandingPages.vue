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
    <div class="page" :class="{ hidden: landingPageHidden }">
      <landing-page></landing-page>
    </div>

    <div class="page" :class="{ hidden: createPageHidden }">
      <h1 class="title">Create Project</h1>
      <create-project-page></create-project-page>
    </div>
  </div>
</template>

<script>
  import LandingPage from './LandingPage'
  import CreateProjectPage from './CreateProjectPage'

  import { pages } from 'src/store/modules/landing-pages'

  export default {
    name: 'landing-pages',
    computed: {
      landingPageHidden() {
        return this.$store.state.landingPages.page !== pages.LANDING_PAGE
      },
      createPageHidden() {
        return this.$store.state.landingPages.page !== pages.CREATE_PROJECT
      }
    },
    components: {
      LandingPage,
      CreateProjectPage
    }
  }
</script>
