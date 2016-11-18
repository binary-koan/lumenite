<style lang="stylus" scoped>
  @import '../../styles/mixins/all';

  .container {
    spacing-vertical(lg)
  }

  .input-group {
    column()
    spacing-vertical(xs)
  }

  .input-group .input {
    border-muted()
    radius(sm)
  }

  .input-row {
    row()
    child-radius-horizontal(sm)
  }

  .input-row input {
    flex()
  }

  .input-row button {
    background-lowlight()
    text-muted(stateful: true)
  }

  .template-label {
    text-muted()
  }

  .templates {
    padding-both(sm)
    radius(sm)
    background-lowlight()
  }

  .template {
    row()
    items-center()
    padding-both(sm)
    spacing-horizontal(sm)
    radius(sm)
    text-default()

    input:checked + & {
      background-highlight()
    }

    .image {
      padding-both(sm)
      font-size(lg)
      radius(sm)
      background-inverse()
      text-inverse()
    }

    .description {
      spacing-vertical(xs)
    }

    .name {
      font-size(md)
    }

    .info {
      text-muted()
    }
  }

  .actions {
    text-align: right
    spacing-horizontal(sm)

    .submit {
      background-primary(stateful: true)
    }
  }
</style>

<template>
  <div class="container">
    <div class="error" v-show="errorMessage">{{ errorMessage }}</div>

    <div class="input-group">
      <label for="projectName">Name</label>
      <input id="projectName" class="input" type="text" value="Pacman" />
    </div>

    <div class="input-group">
      <label for="projectLocation">Location</label>
      <div class="input-row input">
        <input id="projectLocation" type="text" value="/home/jono/Projects/Pacman" />
        <button><span class="icon icon-opened-folder"></button>
      </div>
    </div>

    <div class="input-group">
      <h2 class="template-label">Template</h2>
      <div class="templates">
        <ul>
          <li>
            <input id="emptyTemplate" class="hidden" type="radio" checked="checked" name="template" value="empty" />
            <label for="emptyTemplate" class="template active">
              <div class="image"><span class="icon icon-circle"></span></div>
              <div class="description">
                <h3 class="name">Empty</h3>
                <p class="info">Start from scratch.</p>
              </div>
            </label>
          </li>
          <li>
            <input id="platformerTemplate" class="hidden" type="radio" name="template" value="platformer" />
            <label for="platformerTemplate" class="template">
              <div class="image"><span class="icon icon-babys-room"></span></div>
              <div class="description">
                <h3 class="name">Platformer</h3>
                <p class="info">Allow the player to run and jump in a side-on world.</p>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </div>

    <div class="actions">
      <button @click="cancel">Cancel</button>
      <button @click="create" class="submit">Create</button>
    </div>
  </div>
</template>

<script>
  import { actionTypes, pages } from 'src/store/modules/landing-pages'

  export default {
    name: 'create-project-page',
    computed: {
      errorMessage() {
        return this.$store.state.landingPages.error
      }
    },
    methods: {
      create() {
        this.$store.dispatch('createProject')
      },

      cancel() {
        this.$store.commit(actionTypes.SWITCH_PAGE, pages.LANDING_PAGE)
      }
    }
  }
</script>
