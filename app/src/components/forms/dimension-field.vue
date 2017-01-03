<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="widthId">{{ label }}</label>
    <div class="input-row">
      <div class="input">
        <label>Width</label>
        <input type="text" :id="widthId" v-model="width" />
      </div>
      <div class="input">
        <label>Height</label>
        <input type="text" :id="heightId" v-model="height" />
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
    name: 'dimension-field',
    props: ['label', 'unit', 'valuePath', 'changedMutator', 'defaultWidth', 'defaultHeight'],
    computed: {
      widthId() {
        return uniqueId(kebabCase(this.label))
      },
      heightId() {
        return uniqueId(kebabCase(this.label))
      },
      width: {
        get() {
          return get(get(this.$store.state, this.valuePath), [0]) || this.defaultWidth
        },
        set(value) {
          const actualValue = value.replace(this.unit, '')
          this.$store.commit(this.changedMutator, [parseFloat(actualValue), this.height])
        }
      },
      height: {
        get() {
          return get(get(this.$store.state, this.valuePath), [1]) || this.defaultHeight
        },
        set(value) {
          const actualValue = value.replace(this.unit, '')
          this.$store.commit(this.changedMutator, [this.width, parseFloat(actualValue)])
        }
      }
    },
    methods: {
      showMenu() {
        throw 'TODO'
      }
    }
  }
</script>
