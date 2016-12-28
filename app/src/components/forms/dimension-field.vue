<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="widthId">{{ label }}</label>
    <div class="input">
      <input type="text" :id="widthId" v-model="width" />
      <span>×</span>
      <input type="text" :id="heightId" v-model="height" />
      <span>{{ unit }}</span>
      <button @click="toggleLocked"><span class="icon icon-checked"></span></button>
    </div>
  </div>
</template>

<script>
  import uniqueId from 'lodash/uniqueId'
  import kebabCase from 'lodash/kebabCase'
  import get from 'lodash/get'

  import { remote } from 'electron'
  const dialog = remote.dialog

  export default {
    name: 'dimension-field',
    props: ['label', 'unit', 'valuePath', 'changedMutator'],
    computed: {
      widthId() {
        return uniqueId(kebabCase(this.label))
      },
      heightId() {
        return uniqueId(kebabCase(this.label))
      },
      width: {
        get() { return get(get(this.$store.state, this.valuePath), [0]) },
        set(value) { this.$store.commit(this.changedMutator, [value, this.height]) }
      },
      height: {
        get() { return get(get(this.$store.state, this.valuePath), [1]) },
        set(value) { this.$store.commit(this.changedMutator, [this.width, value]) }
      }
    },
    methods: {
      toggleLocked: {
        throw 'TODO'
      }
    }
  }
</script>
