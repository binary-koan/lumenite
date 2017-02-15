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
    max-width: 25rem
  }
</style>

<template>
  <div class="image-editor">
    <div class="image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
      <div class="anchor-point-display"></div>
    </div>
    <elx-settings-form class="settings" :title="sprite.source">
      <div>
        <elx-label>Scaled size</elx-label>
        <elx-multi-input :parts="['x', 'y']"></elx-multi-input>
      </div>

      <div>
        <elx-label>Anchor point</elx-label>
        <elx-multi-input :parts="['width', 'height']"></elx-multi-input>
      </div>

      <div>
        <elx-label>Opacity</elx-label>
        <el-input-number :min="0" :max="100"></el-input-number>
      </div>

      <div>
        <elx-label>Blend mode</elx-label>
        <el-select>
          <el-option v-for="mode in blendModes" :label="mode" :value="mode"></el-option>
        </el-select>
      </div>

      <div>
        <elx-label>Tint</elx-label>
        <el-input></el-input>
      </div>

      <span class="TODO filters, mask, crop"></span>
    </div>
  </div>
</template>

<script>
  import pathUtils from 'path'

  export default {
    name: 'sprite-asset-editor',
    props: ['tab'],
    computed: {
      sprite() {
        return this.tab.content
      },

      imageUrl() {
        return 'file://' + pathUtils.resolve(pathUtils.dirname(this.tab.location), this.sprite.source).replace(/\\/g, '/')
      },

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
