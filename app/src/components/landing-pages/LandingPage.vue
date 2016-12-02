<style lang="stylus" scoped>
  @import '../../styles/mixins/all';

  .container {
    spacing-vertical(md)
  }

  .recent-list {
    padding-both(sm)
    radius(sm)
    background-lowlight()
    spacing-vertical(lg)

    a {
      row()
      items-center()
      padding-both(sm)
      spacing-horizontal(sm)
      radius(sm)
      text-default()
      transition: all 0.2s

      &:hover {
        background-highlight()
      }
    }

    .project-icon {
      padding-both(sm)
      font-size(lg)
      radius(sm)
      background-primary()
    }
  }

  .recent-list .title {
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
  }

  .recent-list .info {
    color: #aaa;
  }

  .actions {
    row()
    spacing-horizontal(md)
  }

  .actions button {
    flex()
    padding-both(lg)
    font-size(md)
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
      <button @click="createProject"><span class="icon icon-plus"></span> Create Project</button>
      <button @click="openProject"><span class="icon icon-opened-folder"></span> Open Folder</button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron'
  const dialog = remote.dialog

  import { types, pages } from 'src/store/modules/landing-pages'

  export default {
    name: 'landing-page',
    methods: {
      createProject() {
        this.$store.commit(types.SWITCH_PAGE, pages.CREATE_PROJECT)
      },

      openProject() {
        const dirs = dialog.showOpenDialog({
          properties: ['openDirectory']
        })
        this.$store.dispatch(types.OPEN_PROJECT, dirs[0])
      }
    }
  }
</script>
