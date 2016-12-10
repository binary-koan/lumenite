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

      <div :class="{ hidden: recentPageHidden }">
        <recent-projects-page></recent-projects-page>
      </div>

      <div :class="{ hidden: createPageHidden }">
        <h1 class="title">Create Project</h1>
        <create-project-page></create-project-page>
      </div>
    </div>
  </div>
</template>

<script>
  import RecentProjectsPage from './recent-projects-page'
  import CreateProjectPage from './create-project-page'

  import { pages } from 'src/store/landing-pages'

  export default {
    name: 'landing-pages',
    computed: {
      errorMessage() {
        return this.$store.state.landingPages.error
      },
      recentPageHidden() {
        return this.$store.state.landingPages.page !== pages.RECENT_PROJECTS
      },
      createPageHidden() {
        return this.$store.state.landingPages.page !== pages.CREATE_PROJECT
      }
    },
    components: {
      RecentProjectsPage,
      CreateProjectPage
    }
  }
</script>
