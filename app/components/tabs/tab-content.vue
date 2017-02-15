<script>
  import GeneralSettingsEditor from './files/general'
  import MaterialAssetEditor from './files/material'
  import MeshAssetEditor from './files/mesh'
  import ShaderAssetEditor from './files/shader'
  import SpriteAssetEditor from './files/sprite'
  import FontAssetEditor from './files/font'
  import TilesetAssetEditor from './files/tileset'
  import VideoAssetEditor from './files/video'
  import ScriptEditor from './files/script'
  import SceneEditor from './files/scene'

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
