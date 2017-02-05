<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .sidebar {
    width: $sidebar-width
  }

  .link {
    position: relative
    display: block
    width: $sidebar-width
    height: @width

    background-position: center
    background-repeat: no-repeat
    background-size: 32px
    opacity: 0.75
    transition: opacity $default-transition
  }

  .link:hover,
  .link.active {
    opacity: 1
  }

  .link.menu {
    background-image: url(./assets/menu.svg)
  }

  .link.build {
    background-image: url(./assets/build.svg)
  }

  .link.run {
    background-image: url(./assets/run.svg)
  }

  .link.test {
    background-image: url(./assets/test.svg)
  }

  .link.publish {
    background-image: url(./assets/publish.svg)
  }

  .link > .tooltip {
    position: absolute
    visibility: hidden
    left: 100%
    top: 50%
    margin-top: -($sidebar-width / 4)
    padding: ($sidebar-width / 8)
    line-height: ($sidebar-width / 4)

    border-radius: $radius-sm
    background: $background-default
    color: $color-default
    opacity: 0
    transition: opacity $transition-default
  }

  .link:hover > .tooltip {
    visibility: visible
    opacity: 1
  }
</style>

<template>
  <div class="sidebar">
    <a class="link menu" href="#">
      <span class="tooltip">Menu</span>
    </a>
    <a class="link build active" href="#">
      <span class="tooltip">Build</span>
    </a>
    <a class="link run" href="#">
      <span class="tooltip">Run</span>
    </a>
    <a class="link test" href="#">
      <span class="tooltip">Test</span>
    </a>
    <a class="link publish" href="#">
      <span class="tooltip">Publish</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'sidebar'
  }
</script>
