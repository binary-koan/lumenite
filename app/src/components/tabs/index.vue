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
    <image-asset-editor></image-asset-editor>
  </div>
</template>

<script>
  import TabBar from './tab-bar'
  import ImageAssetEditor from '../editors/assets/image'

  export default {
    name: 'tabs',
    components: {
      TabBar,
      ImageAssetEditor
    }
  }
</script>
