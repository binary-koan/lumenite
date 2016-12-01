<style lang="stylus" scoped>
  @import '../../styles/mixins/all';

  .container {
    spacing-vertical(lg)
  }

  .error {
    padding-both(sm)
    background-primary()
    radius(sm)
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
    <div class="error" v-show="errorMessage">
      <span class="icon icon-cancel-2"></span> {{ errorMessage }}
    </div>

    <div class="input-group">
      <label for="projectName">Name</label>
      <input id="projectName" class="input" type="text" v-model="name" />
    </div>

    <div class="input-group">
      <label for="projectLocation">Location</label>
      <div class="input-row input">
        <input id="projectLocation" type="text" v-model="path" />
        <button><span class="icon icon-opened-folder"></span></button>
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
  import { modelProperty } from 'src/helpers/vuex-helpers'
  import { types, pages } from 'src/store/modules/landing-pages'

  export default {
    name: 'create-project-page',
    computed: {
      errorMessage() {
        return this.$store.state.landingPages.error
      },
      templates() {
        return this.$store.state.landingPages.templates
      },
      name: modelProperty("landingPages.newProject.name", types.SET_NEW_PROJECT_NAME),
      path: modelProperty("landingPages.newProject.path", types.SET_NEW_PROJECT_PATH),
      template: modelProperty("landingPages.newProject.template", types.SET_NEW_PROJECT_TEMPLATE)
    },
    methods: {
      create() {
        this.$store.dispatch(types.CREATE_PROJECT)
      },

      cancel() {
        this.$store.commit(types.SWITCH_PAGE, pages.LANDING_PAGE)
      }
    },
    created() {
      this.$store.dispatch(types.FIND_TEMPLATES)
    }
  }
</script>
