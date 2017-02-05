<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .tab {
    flex-layout: row
    align-items: center
    width: $tab-width
    padding: $gap-small $gap-small $gap-small $gap-large
    border-radius: 0
    stateful-background: $fill-darken
    text-align: left
    cursor: default
  }

  .tab.active {
    background: $fill-darken
    border-top-left-radius: $border-radius-base
    border-top-right-radius: $border-radius-base
  }

  .tab-icon {
    margin-right: $gap-small
  }

  .title {
    flex: 1
    min-width: 0
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  }

  .close {
    padding: $gap-small
    background: transparent
    stateful-color: $color-muted
  }

  .close .icon:before {
    content: '×'
    font-size: $font-size-large
  }
</style>

<template>
  <button class="tab" :class="{ active: isActive }" @click="activate">
    <span class="icon tab-icon color-icon" style="background-color: #ff0"></span>
    <span class="title">{{ tab.title }}</span>
    <button class="close" @click="close"><span class="icon"></span></button>
  </button>
</template>

<script>
  import types from 'app/store/tabs/types'

  export default {
    name: 'tab',
    props: ['isActive', 'tab', 'index'],
    methods: {
      activate(e) {
        // Don't run the action if the close button is clicked ... eww
        if (!e.target.closest('button.close')) {
          this.$store.commit(types.SELECT_TAB, this.index)
        }
      },

      close() {
        this.$store.commit(types.CLOSE_TAB, this.index)
      }
    }
  }
</script>
