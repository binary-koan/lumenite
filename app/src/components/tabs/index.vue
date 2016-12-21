<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .tabs {
    flex: 1
    flex-layout: column
  }
</style>

<template>
  <div class="tabs">
    <tab-bar></tab-bar>
    <fields :schema="settingsSchema" :layout="settingsLayout"></fields>
  </div>
</template>

<script>
  import TabBar from './tab-bar'
  import Fields from './settings/fields'

  import { default as settingsSchema, layout as settingsLayout } from 'src/filesystem/schemas/settings/general'

  export default {
    name: 'tabs',
    data() {
      return { settingsSchema, settingsLayout }
    },
    components: {
      TabBar,
      Fields
    }
  }
</script>
