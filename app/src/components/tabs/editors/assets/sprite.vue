<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  .settings {
    padding: $gap-md
  }

  h2 {
    font-size: $font-size-md
    font-weight: $font-weight-medium
    margin: $gap-md 0
  }
</style>

<template>
  <div class="image-editor">
    <div class="image">
      <div class="anchor-point-display"></div>
    </div>
    <div class="settings">
      <h2>Source</h2>
      <file-field label="Image file"></file-field>
      <dimension-field unit="px"></dimension-field>
      <point-field label="Anchor point" unit="px"></point-field>

      <h2>Display</h2>
      <number-field label="Opacity" min="0" max="1" step="0.01"></number-field>
      <select-field label="Blend mode" :options="blendModes"></select-field>
      <color-field label="Tint"></color-field>
      <span class="TODO placeholder">Filters</span>
      <span class="TODO placeholder">Mask</span>
      <rect-field label="Crop"></rect-field>
      <checkbox-field label="Smoothed"></checkbox-field>
    </div>
  </div>
</template>

<script>
  import FileField from 'src/components/forms/file-field'
  import DimensionField from 'src/components/forms/dimension-field'
  import PointField from 'src/components/forms/point-field'
  import NumberField from 'src/components/forms/number-field'
  import SelectField from 'src/components/forms/select-field'
  import ColorField from 'src/components/forms/color-field'
  import CheckboxField from 'src/components/forms/checkbox-field'
  import RectField from 'src/components/forms/rect-field'

  export default {
    name: 'sprite-asset-editor',
    computed: {
      blendModes() {
        return [
          'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN', 'OVERLAY', 'DARKEN', 'LIGHTEN',
          'COLOR_DODGE', 'COLOR_BURN', 'HARD_LIGHT', 'SOFT_LIGHT',
          'DIFFERENCE', 'EXCLUSION', 'HUE', 'SATURATION', 'COLOR', 'LUMINOSITY'
        ]
      }
    },
    components: {
      FileField,
      DimensionField,
      PointField,
      NumberField,
      SelectField,
      ColorField,
      CheckboxField,
      RectField
    }
  }
</script>
