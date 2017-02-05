<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="xId">{{ label }}</label>
    <div class="input-row">
      <div class="input">
        <label>X</label>
        <input type="text" :id="xId" v-model="xCoord" />
      </div>
      <div class="input">
        <label>Y</label>
        <input type="text" :id="yId" v-model="yCoord" />
      </div>
      <button @click="showMenu"><span class="icon icon-more"></span></button>
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
    name: 'point-field',
    props: ['label', 'unit', 'valuePath', 'changedMutator', 'defaultX', 'defaultY'],
    computed: {
      xId() {
        return uniqueId(kebabCase(this.label))
      },
      yId() {
        return uniqueId(kebabCase(this.label))
      },
      xCoord: {
        get() { return get(get(this.$store.state, this.valuePath), [0]) || this.defaultX },
        set(value) { this.$store.commit(this.changedMutator, [value, this.yCoord]) }
      },
      yCoord: {
        get() { return get(get(this.$store.state, this.valuePath), [1]) || this.defaultY },
        set(value) { this.$store.commit(this.changedMutator, [this.xCoord, value]) }
      }
    },
    methods: {
      showMenu() {
        throw 'TODO'
      }
    }
  }
</script>
