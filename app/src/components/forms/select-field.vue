<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="inputId">{{ label }}</label>
    <select :id="inputId" v-model="value">
      <option v-for="option in options" :value="option">{{ displayOption(option) }}</option>
    </select>
  </div>
</template>

<script>
  import uniqueId from 'lodash/uniqueId'
  import kebabCase from 'lodash/kebabCase'
  import startCase from 'lodash/startCase'
  import get from 'lodash/get'

  export default {
    name: 'text-field',
    props: ['label', 'valuePath', 'changedMutator'],
    computed: {
      inputId() {
        return uniqueId(kebabCase(this.label))
      },
      value: {
        get() { return get(this.$store.state, this.valuePath) },
        set(value) { this.$store.commit(this.changedMutator, value) }
      }
    },
    methods: {
      displayOption(option) {
        return startCase(option)
      }
    }
  }
</script>
