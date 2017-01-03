<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .tab {
    flex-layout: row
    align-items: center
    width: $tab-width
    padding: $gap-sm $gap-sm $gap-sm $gap-lg
    border-radius: 0
    stateful-background: $background-darken
    text-align: left
    cursor: default
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
  <button class="tab" :class="{ active: isActive }" @click="activate">
    <span class="icon tab-icon color-icon" style="background-color: #ff0"></span>
    <span class="title">{{ tab.title }}</span>
    <button class="close" @click="close"><span class="icon"></span></button>
  </button>
</template>

<script>
  import types from 'src/store/tabs/types'

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
