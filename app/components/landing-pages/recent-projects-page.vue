<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .container {
    spacing-vertical: $gap-md
  }

  .recent-list {
    padding: $gap-sm
    border-radius: $radius-sm
    background-color: $background-darken
    spacing-vertical: $gap-lg

    a {
      flex-layout: row
      align-items: center
      padding: $gap-sm
      spacing-horizontal: $gap-sm
      border-radius: $radius-sm
      color: $color-default
      transition: all $transition-default
      stateful-background: $background-darken
    }

    .project-icon {
      padding: $gap-sm
      font-size: $font-size-lg
      border-radius: $radius-sm
      background-color: $background-primary
    }
  }

  .recent-list .title {
    margin-bottom: $gap-xs
    font-size: $font-size-md
  }

  .recent-list .info {
    color: $color-muted
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
    <ul class="recent-list">
      <li>
        <a href="#">
          <div class="project-icon"><span class="icon icon-folder"></span></div>
          <div class="description">
            <h3 class="title">Pacman</h3>
            <p class="info">~/Projects/Pacman</p>
          </div>
        </a>
      </li>
    </ul>

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
