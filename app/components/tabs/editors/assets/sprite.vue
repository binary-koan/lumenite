<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .image-editor {
    flex-layout: row
    height: 100%
  }

  .image {
    flex: 1
    background: $fill-darken
    background-origin: content-box
    background-size: contain
    background-repeat: no-repeat
    background-position: center
    padding: 5%
  }

  .settings {
    padding-left: $gap-large
    padding-right: $gap-small
    max-width: 25rem
  }

  h2 {
    margin: $gap-xlarge 0 $gap-large 0
    font-size: $font-size-large
    font-weight: $font-weight-medium

    &:first-child {
      margin-top: $gap-small
    }
  }

  hr {
    border: none
    border-bottom: $input-border
    margin: $gap-small 0 $gap-large 0
  }
</style>

<template>
  <div class="image-editor">
    <div class="image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
      <div class="anchor-point-display"></div>
    </div>
    <div class="settings">
      <h2>{{ sprite.source }}</h2>

      <hr />
      <dimension-field label="Scaled size" unit="px" :defaultWidth="100" :defaultHeight="50"></dimension-field>
      <point-field label="Anchor point" unit="%" :defaultX="0.5" :defaultY="0.5"></point-field>

      <hr />
      <number-field label="Opacity" min="0" max="1" step="0.01" :default="100"></number-field>
      <select-field label="Blend mode" :options="blendModes"></select-field>
      <color-field label="Tint"></color-field>
      <span class="TODO filters"></span>
      <span class="TODO mask"></span>
      <rect-field label="Crop"></rect-field>
      <checkbox-field label="Smoothed"></checkbox-field>
    </div>
  </div>
</template>

<script>
  import pathUtils from 'path'

  import DimensionField from 'app/components/forms/dimension-field'
  import PointField from 'app/components/forms/point-field'
  import NumberField from 'app/components/forms/number-field'
  import SelectField from 'app/components/forms/select-field'
  import ColorField from 'app/components/forms/color-field'
  import CheckboxField from 'app/components/forms/checkbox-field'
  import RectField from 'app/components/forms/rect-field'

  export default {
    name: 'sprite-asset-editor',
    props: ['tab'],
    computed: {
      sprite() {
        return this.tab.content
      },

      imageUrl() {
        return pathUtils.resolve(pathUtils.dirname(this.tab.location), this.sprite.source).replace(/\\/g, '/')
      },

      blendModes() {
        return [
          'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN', 'OVERLAY', 'DARKEN', 'LIGHTEN',
          'COLOR_DODGE', 'COLOR_BURN', 'HARD_LIGHT', 'SOFT_LIGHT',
          'DIFFERENCE', 'EXCLUSION', 'HUE', 'SATURATION', 'COLOR', 'LUMINOSITY'
        ]
      }
    },
    components: {
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
