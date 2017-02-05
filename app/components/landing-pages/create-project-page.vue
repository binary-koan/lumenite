<style lang="stylus" scoped>
  @import '~app/components/forms/common'

  .container {
    spacing-vertical: $gap-large
  }

  .template-label {
    color: $color-muted
  }

  .templates {
    padding: $gap-small
    border-radius: $border-radius-base
    background-color: $fill-darken
  }

  .template {
    flex-layout: row
    align-items: center
    padding: $gap-small
    spacing-horizontal: $gap-small
    border-radius: $border-radius-base
    color: $font-color-base

    input:checked + & {
      background: $fill-lighten
    }

    .image {
      padding: $gap-small
      font-size: $font-size-large
      border-radius: $border-radius-base
      background-color: $fill-inverse
      color: $color-inverse
    }

    .description {
      spacing-vertical: $gap-xsmall
    }

    .name {
      font-size: $font-size-medium
    }

    .info {
      color: $color-muted
    }
  }

  .actions {
    text-align: right
    spacing-horizontal: $gap-small

    .submit {
      stateful-background: $color-primary
    }
  }
</style>

<template>
  <div class="container">
    <text-field
      label="Name"
      valuePath="landingPages.newProject.name"
      :changedMutator="types.SET_NEW_PROJECT_NAME"></text-field>

    <file-field
      label="Location"
      valuePath="landingPages.newProject.path"
      :changedMutator="types.SET_NEW_PROJECT_PATH"
      :pickedAction="types.PICK_NEW_PROJECT_LOCATION"
      :properties="['openDirectory', 'createDirectory']"
      ></file-field>

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

  import TextField from 'app/components/forms/text-field'
  import FileField from 'app/components/forms/file-field'

  import { modelFromStore } from 'app/helpers/vuex-helpers'
  import { pages } from 'app/store/landing-pages'
  import types from 'app/store/landing-pages/types'

  export default {
    name: 'create-project-page',
    computed: {
      templates() {
        return this.$store.state.landingPages.templates
      },
      types() {
        return types
      },
      template: modelFromStore('landingPages.newProject.template', types.SET_NEW_PROJECT_TEMPLATE),
    },
    methods: {
      create() {
        this.$store.dispatch(types.CREATE_PROJECT)
      },

      cancel() {
        this.$store.commit(types.SWITCH_PAGE, pages.RECENT_PROJECTS)
      }
    },
    components: {
      TextField,
      FileField
    },
    created() {
      this.$store.dispatch(types.FIND_TEMPLATES)
    }
  }
</script>
