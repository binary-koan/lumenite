<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="xId">{{ label }}</label>
    <point-field></point-field>
    <dimension-field></dimension-field>
  </div>
</template>

<script>
  import uniqueId from 'lodash/uniqueId'
  import kebabCase from 'lodash/kebabCase'
  import get from 'lodash/get'

  import { remote } from 'electron'
  const dialog = remote.dialog

  import PointField from './point-field'
  import DimensionField from './dimension-field'

  export default {
    name: 'rect-field',
    props: ['label', 'unit', 'valuePath', 'changedMutator'],
    computed: {
      xId() {
        return uniqueId(kebabCase(this.label))
      },
      yId() {
        return uniqueId(kebabCase(this.label))
      },
      xCoord: {
        get() { return get(get(this.$store.state, this.valuePath), [0]) },
        set(value) { this.$store.commit(this.changedMutator, [value, this.yCoord]) }
      },
      yCoord: {
        get() { return get(get(this.$store.state, this.valuePath), [1]) },
        set(value) { this.$store.commit(this.changedMutator, [this.xCoord, value]) }
      }
    },
    components: {
      PointField,
      DimensionField
    }
  }
</script>
