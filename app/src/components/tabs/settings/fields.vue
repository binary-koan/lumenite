<style lang="stylus" scoped>
</style>

<template>
  <div class="fields">
    <div class="group" v-for="group in layout.groups">
      <h3 v-if="group.title">{{ group.title }}</h3>
      <div v-for="row in group.fields">
        <span v-for="field in row">
          {{ schema[field] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fields',
    props: ['schema', 'layout']
  }
</script>
