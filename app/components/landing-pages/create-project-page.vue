<style lang="stylus" scoped>
  @import '~app/components/forms/common'

  .container {
    spacing-vertical: $gap-large
  }

  .template {
    flex-layout: row
    align-items: center
    spacing-horizontal: $gap-small

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
  }
</style>

<template>
  <div class="container">
    <div>
      <elx-label>Name</elx-label>
      <el-input :value="newProjectName.get()" @change="newProjectName.set"></el-input>
    </div>

    <div>
      <elx-label>Location</elx-label>
      <el-input
        :value="newProjectPath.get()" @change="newProjectPath.set"
        icon="opened-folder" :on-icon-click="pickNewProjectPath"></el-input>
    </div>

    <div>
      <elx-label>Template</elx-label>
      <elx-list-box>
        <elx-list-box-item v-for="t in templates" :selected="template.get() === t.id" @click="template.set(t.id)">
          <div class="template">
            <div class="image"><span class="icon icon-circle"></span></div>
            <div class="description">
              <h3 class="name">{{ t.name }}</h3>
              <p class="info">{{ t.description }}</p>
            </div>
          </div>
        </elx-list-box-item>
      </elx-list-box>
    </div>

    <div class="actions">
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="create">Create</el-button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron'
  const dialog = remote.dialog

  import TextField from 'app/components/forms/text-field'
  import FileField from 'app/components/forms/file-field'

  import { modelFromStore, modelFromStore2 } from 'app/helpers/vuex-helpers'
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
      newProjectName() {
        return modelFromStore2('landingPages.newProject.name', types.SET_NEW_PROJECT_NAME, this.$store)
      },
      newProjectPath() {
        return modelFromStore2('landingPages.newProject.path', types.SET_NEW_PROJECT_PATH, this.$store)
      },
      template() {
        return modelFromStore2('landingPages.newProject.template', types.SET_NEW_PROJECT_TEMPLATE, this.$store)
      },
    },
    methods: {
      pickNewProjectPath() {
        const files = dialog.showOpenDialog({ defaultPath: this.newProjectPath.get(), properties: ['openDirectory', 'createDirectory'] })

        if (!files || !files.length) return

        this.newProjectPath.set(files[0])
      },

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
