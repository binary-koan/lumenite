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
  </div>
</template>

<script>
  import TabBar from './tab-bar'

  export default {
    name: 'tabs',
    components: {
      TabBar
    }
  }
</script>
