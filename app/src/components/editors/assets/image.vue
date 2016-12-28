<style lang="stylus" scoped>
  @import '~src/styles/definitions'
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
  export default {
    name: 'image-asset-editor',
    computed: {
      blendModes() {
        return [
          'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN', 'OVERLAY', 'DARKEN', 'LIGHTEN',
          'COLOR_DODGE', 'COLOR_BURN', 'HARD_LIGHT', 'SOFT_LIGHT',
          'DIFFERENCE', 'EXCLUSION', 'HUE', 'SATURATION', 'COLOR', 'LUMINOSITY'
        ]
      }
    }
  }
</script>
