<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="inputId">{{ label }}</label>
    <input type="number" class="input"
      :id="inputId" :min="min" :max="max" :step="step" v-model="value" />
  </div>
</template>

<script>
  import uniqueId from 'lodash/uniqueId'
  import kebabCase from 'lodash/kebabCase'
  import get from 'lodash/get'

  export default {
    name: 'text-field',
    props: ['label', 'valuePath', 'changedMutator', 'min', 'max', 'step'],
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
