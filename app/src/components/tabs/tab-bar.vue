<style lang="stylus" scoped>
  @import '~src/styles/default'

  .tab-bar {
    flex-layout: row
    background-color: $background-darken
  }

  .tab {
    flex-layout: row
    align-items: center
    width: $tab-width
    padding: $gap-sm $gap-sm $gap-sm $gap-lg
  }

  .tab.active {
    background: $background-default
  }

  .tab-icon {
    margin-right: $gap-sm
  }

  .title {
    flex: 1
    overflow: ellipsis
  }

  .close {
    padding: $gap-sm
    background: transparent
    stateful-color: $color-muted
  }

  .close .icon:before {
    content: '×'
    font-size: $font-size-lg
  }
</style>

<template>
  <div class="tab-bar">
    <div class="tab active">
      <span class="icon tab-icon color-icon" style="background-color: #ff0"></span>
      <span class="title">Pacman</span>
      <button class="close"><span class="icon"></span></button>
    </div>
    <div class="tab">
      <span class="icon tab-icon color-icon" style="background-color: #0ff"></span>
      <span class="title">Inky</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab-bar'
  }
</script>
