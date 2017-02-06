<script>
  import GeneralSettingsEditor from './editors/settings/general'
  import MaterialAssetEditor from './editors/assets/material'
  import MeshAssetEditor from './editors/assets/mesh'
  import ShaderAssetEditor from './editors/assets/shader'
  import SpriteAssetEditor from './editors/assets/sprite'
  import FontAssetEditor from './editors/assets/font'
  import TilesetAssetEditor from './editors/assets/tileset'
  import VideoAssetEditor from './editors/assets/video'
  import ScriptEditor from './editors/behaviours/script'
  import SceneEditor from './editors/scenes/scene'

  const FILE_EDITORS = {
    'general-settings': GeneralSettingsEditor,
    'material': MaterialAssetEditor,
    'mesh': MeshAssetEditor,
    'shader': ShaderAssetEditor,
    'sprite': SpriteAssetEditor,
    'font': FontAssetEditor,
    'tileset': TilesetAssetEditor,
    'video': VideoAssetEditor,
    'script': ScriptEditor,
    'scene': SceneEditor
  }

  export default {
    name: 'tab-content',
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
