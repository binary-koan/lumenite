<style lang="stylus" scoped>
  @import '~src/styles/definitions'

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
    <div v-for="(tab, index) in tabs" class="tab" :class="activeClass(index)">
      <span class="icon tab-icon color-icon" style="background-color: #ff0"></span>
      <span class="title">{{ tab.title }}</span>
      <button class="close"><span class="icon"></span></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab-bar',
    props: ['tabs'],
    computed: {
      tabs() {
        return this.$store.state.tabs.tabs
      }
    },
    methods: {
      activeClass(index) {
        return { active: this.$store.state.tabs.selectedIndex === index }
      }
    }
  }
</script>
