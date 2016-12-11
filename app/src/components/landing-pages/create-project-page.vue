<style lang="stylus" scoped>
  @import '~src/styles/default';

  .container {
    spacing-vertical: $gap-lg
  }

  .input-group {
    flex-layout: column
    spacing-vertical: $gap-sm
  }

  .input-group .input {
    border: 1px solid $color-muted
    border-radius: $radius-sm
  }

  .input-row {
    flex-layout: row
    child-radius-horizontal: $radius-sm
  }

  .input-row input {
    flex: 1
  }

  .input-row button {
    stateful-background: $background-darken
    stateful-color: $color-muted
  }

  .template-label {
    color: $color-muted
  }

  .templates {
    padding: $gap-sm
    border-radius: $radius-sm
    background-color: $background-darken
  }

  .template {
    flex-layout: row
    align-items: center
    padding: $gap-sm
    spacing-horizontal: $gap-sm
    border-radius: $radius-sm
    color: $color-default

    input:checked + & {
      background: $background-lighten
    }

    .image {
      padding: $gap-sm
      font-size: $font-size-lg
      border-radius: $radius-sm
      background-color: $background-inverse
      color: $color-inverse
    }

    .description {
      spacing-vertical: $gap-xs
    }

    .name {
      font-size: $font-size-md
    }

    .info {
      color: $color-muted
    }
  }

  .actions {
    text-align: right
    spacing-horizontal: $gap-sm

    .submit {
      stateful-background: $background-primary
    }
  }
</style>

<template>
  <div class="container">
    <div class="input-group">
      <label for="projectName">Name</label>
      <input id="projectName" class="input" type="text" v-model="name" />
    </div>

    <div class="input-group">
      <label for="projectLocation">Location</label>
      <div class="input-row input">
        <input id="projectLocation" type="text" v-model="path" />
        <button @click="pickDirectory"><span class="icon icon-opened-folder"></span></button>
      </div>
    </div>

    <div class="input-group">
      <h2 class="template-label">Template</h2>
      <div class="templates">
        <ul>
          <li v-for="t in templates">
            <input
              :id="t.id + 'Template'" :value="t.id"
              type="radio" name="template" class="hidden" v-model="template" />
            <label :for="t.id + 'Template'" :class="{ active: template === t.id }" class="template">
              <div class="image"><span class="icon icon-circle"></span></div>
              <div class="description">
                <h3 class="name">{{ t.name }}</h3>
                <p class="info">{{ t.description }}</p>
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
  import { remote } from 'electron'
  const dialog = remote.dialog

  import { modelFromStore } from 'src/helpers/vuex-helpers'
  import { pages } from 'src/store/landing-pages'
  import types from 'src/store/landing-pages/types'

  export default {
    name: 'create-project-page',
    computed: {
      templates() {
        return this.$store.state.landingPages.templates
      },
      name: modelFromStore('landingPages.newProject.name', types.SET_NEW_PROJECT_NAME),
      path: modelFromStore('landingPages.newProject.path', types.SET_NEW_PROJECT_PATH),
      template: modelFromStore('landingPages.newProject.template', types.SET_NEW_PROJECT_TEMPLATE)
    },
    methods: {
      pickDirectory() {
        const dirs = dialog.showOpenDialog({
          defaultPath: this.$store.state.landingPages.newProject.path,
          properties: ['openDirectory', 'createDirectory']
        })
        this.$store.dispatch(types.PICK_NEW_PROJECT_LOCATION, dirs[0])
      },

      create() {
        this.$store.dispatch(types.CREATE_PROJECT)
      },

      cancel() {
        this.$store.commit(types.SWITCH_PAGE, pages.RECENT_PROJECTS)
      }
    },
    created() {
      this.$store.dispatch(types.FIND_TEMPLATES)
    }
  }
</script>
