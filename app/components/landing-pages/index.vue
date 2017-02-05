<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .landing-pages {
    fixed: top left bottom right
    flex-layout: row
    align-items: center
    justify-content: center

    background-color: $fill-base
  }

  .page {
    width-upto: $landing-page-width
    padding: $gap-large
    spacing-vertical: $gap-large
  }

  .error {
    flex-layout: row
    padding: $gap-small
    spacing-horizontal: $gap-xsmall
    background: $color-primary
    border-radius: $border-radius-base
  }

  .title {
    font-size: $font-size-large
    font-weight: $font-weight-strong
    margin-bottom: $gap-large
  }
</style>

<template>
  <div class="landing-pages">
    <div class="page">
      <el-alert type="error" show-icon :title="errorMessage || ''" v-show="errorMessage"></el-alert>

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

  import { pages } from 'app/store/landing-pages'

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
