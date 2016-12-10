<style lang="stylus" scoped>
  @import '~src/styles/default'

  .landing-pages {
    fixed: top left bottom right
    flex-layout: row
    align-items: center
    justify-content: center

    background-color: $background-default
  }

  .page {
    width-upto: $width-sm
    padding: $gap-lg
    spacing-vertical: $gap-lg
  }

  .error {
    flex-layout: row
    padding: $gap-sm
    spacing-horizontal: $gap-xs
    background: $background-primary
    border-radius: $radius-sm
  }

  .title {
    font-size: $font-size-lg
    font-weight: $font-weight-strong
    margin-bottom: $gap-lg
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
