<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group input-row">
    <label :for="inputId">{{ label }}</label>
    <input type="checkbox" :id="inputId" v-model="value" />
  </div>
</template>

<script>
  import uniqueId from 'lodash/uniqueId'
  import kebabCase from 'lodash/kebabCase'
  import get from 'lodash/get'

  export default {
    name: 'checkbox-field',
    props: ['label', 'valuePath', 'changedMutator'],
    computed: {
      inputId() {
        return uniqueId(kebabCase(this.label))
      },
      value: {
        get() { return get(this.$store.state, this.valuePath) },
        set(value) { this.$store.commit(this.changedMutator, value) }
      }
    }
  }
</script>
