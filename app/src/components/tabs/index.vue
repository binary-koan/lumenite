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
    <sprite-asset-editor></sprite-asset-editor>
  </div>
</template>

<script>
  import TabBar from './tab-bar'
  import SpriteAssetEditor from '../editors/assets/sprite'

  export default {
    name: 'tabs',
    components: {
      TabBar,
      SpriteAssetEditor
    }
  }
</script>
