<style scoped>
  .tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

<template>
  <div class="tabs">
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from './TabBar'

  export default {
    name: 'tabs',
    components: {
      TabBar
    }
  }
</script>
