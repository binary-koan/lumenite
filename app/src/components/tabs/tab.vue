<script>
  import GeneralSettingsEditor from './editors/settings/general'
  import SpriteAssetEditor from './editors/assets/sprite'
  import FontAssetEditor from './editors/assets/font'
  import TilesetAssetEditor from './editors/assets/tileset'
  import VideoAssetEditor from './editors/assets/video'
  import ScriptEditor from './editors/behaviours/script'
  import SceneEditor from './editors/scenes/scene'

  const FILE_EDITORS = {
    'general-settings': GeneralSettingsEditor,
    'sprite': SpriteAssetEditor,
    'font': FontAssetEditor,
    'tileset': TilesetAssetEditor,
    'video': VideoAssetEditor,
    'script': ScriptEditor,
    'scene': SceneEditor
  }

  export default {
    name: 'tab',
    props: ['tab'],

    render(createElement) {
      if (this.tab.tabType === 'file') {
        return createElement(FILE_EDITORS[this.tab.fileType], {
          props: { tab: this.tab }
        })
      }
    }
  }
</script>
