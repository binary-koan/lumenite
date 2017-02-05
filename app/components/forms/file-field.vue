<style lang="stylus" scoped>
  @import 'common'
</style>

<template>
  <div class="input-group">
    <label :for="inputId">{{ label }}</label>
    <div class="input-row input">
      <input type="text" :id="inputId" v-model="value" />
      <button @click="pickFile"><span class="icon icon-opened-folder"></span></button>
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
    name: 'file-field2',
    props: ['label', 'valuePath', 'changedMutator', 'pickedAction', 'properties', 'multiple'],
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
      pickFile() {
        const files = dialog.showOpenDialog({
          defaultPath: this.value,
          properties: this.properties
        })

        if (!files || !files.length) {
          return
        }

        const value = this.multiple ? files : files[0]

        if (this.pickedAction) {
          this.$store.dispatch(this.pickedAction, value)
        } else {
          this.$store.commit(this.changedMutator, value)
        }
      }
    }
  }
</script>
