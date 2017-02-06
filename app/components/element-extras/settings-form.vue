<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .elx-settings-form {
    spacing-vertical: $gap-large
  }

  .title {
    margin: $gap-small 0 $gap-large 0
    font-size: $font-size-large
    font-weight: $font-weight-medium
  }
</style>

<template>
  <div class="elx-settings-form">
    <h2 class="title" v-if="title">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "elx-settings-form",
    props: ["title"]
  }
</script>
