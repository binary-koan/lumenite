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

  .error {
    row()
    padding-both(sm)
    spacing-horizontal(xs)
    background-primary()
    radius(sm)
  }

  .title {
    font-size(lg)
    font-weight-strong()
  }
</style>

<template>
  <div class="landing-pages">
    <div class="page">
      <div class="error" v-show="errorMessage">
        <span class="icon icon-cancel-2"></span>
        <span>{{ errorMessage }}</span>
      </div>

      <div :class="{ hidden: landingPageHidden }">
        <landing-page></landing-page>
      </div>

      <div :class="{ hidden: createPageHidden }">
        <h1 class="title">Create Project</h1>
        <create-project-page></create-project-page>
      </div>
    </div>
  </div>
</template>

<script>
  import LandingPage from './LandingPage'
  import CreateProjectPage from './CreateProjectPage'

  import { pages } from 'src/store/landing-pages'

  export default {
    name: 'landing-pages',
    computed: {
      errorMessage() {
        return this.$store.state.landingPages.error
      },
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
