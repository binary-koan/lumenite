<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .container {
    spacing-vertical: $gap-medium
  }

  .recent-list {
    padding: $gap-small
    border-radius: $border-radius-base
    background-color: $fill-darken
    spacing-vertical: $gap-large

    a {
      flex-layout: row
      align-items: center
      padding: $gap-small
      spacing-horizontal: $gap-small
      border-radius: $border-radius-base
      color: $font-color-base
      transition: $all-transition
      stateful-background: $fill-darken
    }
  }

  .recent-project {
    flex-layout: row
    align-items: center
    spacing-horizontal: $gap-small

    .project-icon {
      padding: $gap-small
      font-size: $font-size-large
      border-radius: $border-radius-base
      background-color: $color-primary
    }

    .title {
      margin-bottom: $gap-xsmall
      font-size: $font-size-medium
    }

    .info {
      color: $color-muted
    }
  }

  .actions {
    flex-layout: row
  }

  .actions .el-button {
    flex: 1
  }
</style>

<template>
  <div class="container">
    <elx-list-box>
      <elx-list-box-item>
        <div class="recent-project">
          <div class="project-icon"><span class="icon icon-folder"></span></div>
          <div class="description">
            <h3 class="title">Pacman</h3>
            <p class="info">~/Projects/Pacman</p>
          </div>
        </div>
      </elx-list-box-item>
    </elx-list-box>

    <div class="actions">
      <el-button @click="createProject" size="large">
        <span class="icon icon-plus"></span> Create Project
      </el-button>
      <el-button @click="openProject" size="large">
        <span class="icon icon-opened-folder"></span> Open Folder
      </el-button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron'
  const dialog = remote.dialog

  import { pages } from 'app/store/landing-pages'
  import types from 'app/store/landing-pages/types'

  export default {
    name: 'recent-projects-page',
    methods: {
      createProject() {
        this.$store.commit(types.SWITCH_PAGE, pages.CREATE_PROJECT)
      },

      openProject() {
        const dirs = dialog.showOpenDialog({ properties: ['openDirectory'] })
        if (dirs && dirs.length) {
          this.$store.dispatch(types.OPEN_PROJECT, dirs[0])
        }
      }
    }
  }
</script>
