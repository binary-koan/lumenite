<style lang="stylus" scoped>
  @import '~src/components/forms/common'

  .container {
    spacing-vertical: $gap-lg
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

  import TextField from 'src/components/forms/text-field'
  import FileField from 'src/components/forms/file-field'

  import { modelFromStore } from 'src/helpers/vuex-helpers'
  import { pages } from 'src/store/landing-pages'
  import types from 'src/store/landing-pages/types'

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
