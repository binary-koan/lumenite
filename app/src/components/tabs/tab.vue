<style lang="stylus" scoped>
  @import '~src/styles/definitions'
</style>

<template>
  <div>
    {{ tab.title }}
  </div>
</template>

<script>
  export default {
    name: 'tab',
    props: ['tab']
  }
</script>
